"""
MedGuard RAG Agent v2
======================
Upgraded pipeline:
  1. KiomiSimulator  →  reads/simulates patient vitals
  2. LSTM Classifier →  computes Crisis Risk Category (LOW / MEDIUM / HIGH)
  3. Real RAG        →  semantic retrieval from ChromaDB vector store
  4. Gemini Flash    →  generates bystander first-aid instructions

Requirements:
    pip install google-generativeai tensorflow scikit-learn chromadb sentence-transformers

Setup (run once):
    python generate_training_data.py
    python train_lstm.py
    python build_rag.py

Usage:
    python medguard_rag_agent.py
"""

import os
import json
import time
import pickle
import random
import numpy as np
from datetime import datetime
from pathlib import Path

# ── Gemini ─────────────────────────────────────────────────
try:
    import google.generativeai as genai
except ImportError:
    raise ImportError("Run: pip install google-generativeai")

# ── TensorFlow / Keras ─────────────────────────────────────
try:
    import tensorflow as tf
except ImportError:
    raise ImportError("Run: pip install tensorflow")

# ── ChromaDB ───────────────────────────────────────────────
try:
    import chromadb
    from chromadb.utils import embedding_functions
except ImportError:
    raise ImportError("Run: pip install chromadb sentence-transformers")

# ──────────────────────────────────────────────────────────
# CONFIGURATION
# ──────────────────────────────────────────────────────────
GEMINI_MODEL  = "gemini-2.5-flash"
POLL_INTERVAL = 10

MODEL_PATH    = Path("medguard_lstm.keras")
SCALER_PATH   = Path("medguard_scaler.pkl")
CHROMA_DIR    = Path("medguard_chroma_db")
KB_PATH       = Path("medical_knowledge_base.json")
COLLECTION    = "medguard_knowledge"

FEATURES = [
    "heart_rate", "spo2", "systolic_bp", "diastolic_bp",
    "temperature", "respiratory_rate", "blood_glucose"
]

RISK_LABELS = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}
EMBED_FN = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)


# ──────────────────────────────────────────────────────────
# KIOMI SIMULATOR
# ──────────────────────────────────────────────────────────
class KiomiSimulator:
    SCENARIOS = {
        "normal":           {"hr": 75,  "spo2": 98, "sbp": 118, "dbp": 76,  "temp": 36.7, "rr": 15, "glucose": 95},
        "low_oxygen":       {"hr": 95,  "spo2": 91, "sbp": 115, "dbp": 74,  "temp": 36.9, "rr": 23, "glucose": 90},
        "heart_attack":     {"hr": 118, "spo2": 93, "sbp": 155, "dbp": 98,  "temp": 37.1, "rr": 26, "glucose": 105},
        "cardiac_arrest":   {"hr": 22,  "spo2": 78, "sbp": 55,  "dbp": 30,  "temp": 36.5, "rr": 5,  "glucose": 88},
        "hypoglycemia":     {"hr": 105, "spo2": 97, "sbp": 110, "dbp": 70,  "temp": 36.8, "rr": 18, "glucose": 44},
        "hypertension":     {"hr": 88,  "spo2": 96, "sbp": 185, "dbp": 118, "temp": 36.9, "rr": 19, "glucose": 130},
        "fever_sepsis":     {"hr": 122, "spo2": 94, "sbp": 98,  "dbp": 58,  "temp": 39.8, "rr": 28, "glucose": 160},
    }

    def __init__(self, scenario="normal", noise=True):
        self.scenario = scenario
        self.noise    = noise

    def _jitter(self, v, s=0.02):
        return round(v + random.uniform(-v * s, v * s), 1) if self.noise else v

    def read_vitals(self) -> dict:
        b = self.SCENARIOS.get(self.scenario, self.SCENARIOS["normal"])
        return {
            "heart_rate":       self._jitter(b["hr"],      0.03),
            "spo2":             min(100, self._jitter(b["spo2"],  0.005)),
            "systolic_bp":      self._jitter(b["sbp"],     0.02),
            "diastolic_bp":     self._jitter(b["dbp"],     0.02),
            "temperature":      self._jitter(b["temp"],    0.005),
            "respiratory_rate": self._jitter(b["rr"],      0.05),
            "blood_glucose":    self._jitter(b["glucose"], 0.03),
            "timestamp":        datetime.now().isoformat(),
        }


# ──────────────────────────────────────────────────────────
# LSTM RISK CLASSIFIER
# ──────────────────────────────────────────────────────────
class LSTMRiskClassifier:
    """
    Loads the trained LSTM model and scaler.
    Predicts risk category (LOW / MEDIUM / HIGH) from a single vitals reading.
    """
    def __init__(self, model_path=MODEL_PATH, scaler_path=SCALER_PATH):
        if not model_path.exists():
            raise FileNotFoundError(
                f"LSTM model not found at '{model_path}'.\n"
                "Run: python generate_training_data.py && python train_lstm.py"
            )
        if not scaler_path.exists():
            raise FileNotFoundError(
                f"Scaler not found at '{scaler_path}'.\n"
                "Run: python generate_training_data.py && python train_lstm.py"
            )
        self.model  = tf.keras.models.load_model(model_path)
        with open(scaler_path, "rb") as f:
            self.scaler = pickle.load(f)
        print("[LSTM] Model and scaler loaded.")

    def predict(self, vitals: dict) -> dict:
        """
        Returns {label: str, category: int, confidence: float, probabilities: dict}
        """
        features = np.array([[vitals[f] for f in FEATURES]], dtype=np.float32)
        scaled   = self.scaler.transform(features)
        lstm_in  = scaled.reshape(1, 1, len(FEATURES))          # (1, timestep=1, features)

        probs    = self.model.predict(lstm_in, verbose=0)[0]     # shape (3,)
        category = int(np.argmax(probs))
        label    = RISK_LABELS[category]

        return {
            "label":         label,
            "category":      category,
            "confidence":    round(float(probs[category]) * 100, 1),
            "probabilities": {
                "LOW":    round(float(probs[0]) * 100, 1),
                "MEDIUM": round(float(probs[1]) * 100, 1),
                "HIGH":   round(float(probs[2]) * 100, 1),
            },
        }


# ──────────────────────────────────────────────────────────
# RAG RETRIEVER
# ──────────────────────────────────────────────────────────
class MedGuardRAG:
    """
    Semantic retriever backed by ChromaDB.
    Builds a query string from vitals + risk level,
    then fetches the top-k most relevant knowledge chunks.
    """
    def __init__(self, chroma_dir=CHROMA_DIR, collection_name=COLLECTION):
        if not chroma_dir.exists():
            raise FileNotFoundError(
                f"ChromaDB store not found at '{chroma_dir}'.\n"
                "Run: python build_rag.py"
            )
        self.client     = chromadb.PersistentClient(path=str(chroma_dir))
        self.collection = self.client.get_collection(
            name=collection_name,
            embedding_function=EMBED_FN,
        )
        print(f"[RAG] Connected to collection '{collection_name}' "
              f"({self.collection.count()} vectors).")

    def retrieve(self, vitals: dict, risk_label: str, n_results: int = 6) -> str:
        """
        Builds a natural-language query from vitals and risk level,
        retrieves top-n semantically relevant chunks, and returns
        a formatted context block for the Gemini prompt.
        """
        # Build a rich query string so embeddings match relevant chunks
        query_parts = [f"Patient risk level: {risk_label}."]

        # Flag any abnormal vitals explicitly
        abnormal = []
        if vitals["heart_rate"] < 50 or vitals["heart_rate"] > 110:
            abnormal.append(f"heart rate {vitals['heart_rate']} bpm")
        if vitals["spo2"] < 95:
            abnormal.append(f"SpO2 {vitals['spo2']}%")
        if vitals["systolic_bp"] < 90 or vitals["systolic_bp"] > 150:
            abnormal.append(f"blood pressure {vitals['systolic_bp']}/{vitals['diastolic_bp']} mmHg")
        if vitals["temperature"] < 36.0 or vitals["temperature"] > 38.5:
            abnormal.append(f"temperature {vitals['temperature']}°C")
        if vitals["respiratory_rate"] < 10 or vitals["respiratory_rate"] > 22:
            abnormal.append(f"respiratory rate {vitals['respiratory_rate']} breaths/min")
        if vitals["blood_glucose"] < 70 or vitals["blood_glucose"] > 180:
            abnormal.append(f"blood glucose {vitals['blood_glucose']} mg/dL")

        if abnormal:
            query_parts.append("Abnormal vitals: " + ", ".join(abnormal) + ".")

        if risk_label == "HIGH":
            query_parts.append("Emergency first aid instructions for bystanders. CPR cardiac arrest shock sepsis.")
        elif risk_label == "MEDIUM":
            query_parts.append("Recommendations for warning-level vitals. When to call emergency services.")
        else:
            query_parts.append("Normal vitals. General wellness reassurance.")

        query = " ".join(query_parts)

        results = self.collection.query(
            query_texts=[query],
            n_results=n_results,
        )

        chunks    = results["documents"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]

        context_lines = ["=== RETRIEVED MEDICAL KNOWLEDGE (RAG) ===\n"]
        for i, (chunk, meta, dist) in enumerate(zip(chunks, metadatas, distances), 1):
            relevance = round((1 - dist) * 100, 1)
            context_lines.append(f"[Source {i} | type: {meta.get('type','')} | relevance: {relevance}%]")
            context_lines.append(chunk)
            context_lines.append("")

        context_lines.append("=== END OF RETRIEVED KNOWLEDGE ===")
        return "\n".join(context_lines)


# ──────────────────────────────────────────────────────────
# PROMPT BUILDER
# ──────────────────────────────────────────────────────────
def build_prompt(vitals: dict, lstm_result: dict, rag_context: str) -> str:
    risk_label   = lstm_result["label"]
    confidence   = lstm_result["confidence"]
    probs        = lstm_result["probabilities"]

    vitals_block = "\n".join([
        f"  Heart Rate:        {vitals['heart_rate']} bpm",
        f"  SpO2:              {vitals['spo2']} %",
        f"  Blood Pressure:    {vitals['systolic_bp']}/{vitals['diastolic_bp']} mmHg",
        f"  Temperature:       {vitals['temperature']} °C",
        f"  Respiratory Rate:  {vitals['respiratory_rate']} breaths/min",
        f"  Blood Glucose:     {vitals['blood_glucose']} mg/dL",
        f"  Timestamp:         {vitals['timestamp']}",
    ])

    score_block = (
        f"  LSTM Risk Category:  {risk_label}  (confidence: {confidence}%)\n"
        f"  Risk Probabilities:  LOW {probs['LOW']}%  |  MEDIUM {probs['MEDIUM']}%  |  HIGH {probs['HIGH']}%"
    )

    urgency = {
        "HIGH": (
            "CRITICAL ALERT: The LSTM model has classified this patient as HIGH RISK. "
            "A non-medical bystander is reading this. "
            "Using the retrieved medical knowledge above, provide clear numbered step-by-step "
            "emergency first-aid instructions to follow RIGHT NOW before professional help arrives. "
            "Start with calling emergency services. Identify the most likely emergency condition."
        ),
        "MEDIUM": (
            "The LSTM model has classified this patient as MEDIUM RISK. "
            "Identify which vitals are abnormal, explain what they may indicate, "
            "give practical actionable recommendations using the retrieved knowledge, "
            "and state clearly when to escalate to emergency services."
        ),
        "LOW": (
            "The LSTM model has classified this patient as LOW RISK. "
            "All vitals appear within normal range. "
            "Provide brief reassurance and any general wellness tips based on the readings."
        ),
    }[risk_label]

    return f"""
{rag_context}

=== CURRENT PATIENT VITALS ===
{vitals_block}

=== LSTM RISK ASSESSMENT ===
{score_block}

=== INSTRUCTIONS ===
{urgency}

Respond using this structure:
1. **Condition Assessment**: What do the vitals and LSTM score suggest?
2. **Risk Level**: LOW / MEDIUM / HIGH and why.
3. **Recommendations / First Aid Steps**: Numbered list, clear and simple language.
4. **When to call emergency services**: Be explicit.

Use plain language a non-medical bystander can understand and act on immediately.
"""


# ──────────────────────────────────────────────────────────
# MEDGUARD AGENT
# ──────────────────────────────────────────────────────────
class MedGuardAgent:
    def __init__(self, api_key: str, lstm: LSTMRiskClassifier, rag: MedGuardRAG):
        genai.configure(api_key=api_key)
        self.lstm  = lstm
        self.rag   = rag
        self.model = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            system_instruction=(
                "You are MedGuard, an AI medical assistant that evaluates patient vitals "
                "from IoT sensors. You use a real-time LSTM risk score and semantically "
                "retrieved medical knowledge to give accurate, responsible, and clear health "
                "assessments and first-aid guidance to bystanders. "
                "You always recommend calling emergency services for high-risk situations. "
                "You never replace professional medical care."
            )
        )

    def evaluate(self, vitals: dict) -> dict:
        # Step 1: LSTM risk classification
        lstm_result = self.lstm.predict(vitals)
        risk_label  = lstm_result["label"]

        print(f"\n{'='*62}")
        print(f"  [MedGuard]  LSTM Risk: {risk_label} ({lstm_result['confidence']}% confidence)")
        print(f"  Probabilities — LOW: {lstm_result['probabilities']['LOW']}%  "
              f"MEDIUM: {lstm_result['probabilities']['MEDIUM']}%  "
              f"HIGH: {lstm_result['probabilities']['HIGH']}%")
        print(f"  Timestamp: {vitals['timestamp']}")
        print(f"{'='*62}")

        # Step 2: RAG retrieval
        print("  [RAG] Retrieving relevant medical knowledge...")
        rag_context = self.rag.retrieve(vitals, risk_label)

        # Step 3: Build prompt and call Gemini
        prompt   = build_prompt(vitals, lstm_result, rag_context)
        response = self.model.generate_content(prompt)

        return {
            "lstm_result": lstm_result,
            "vitals":      vitals,
            "assessment":  response.text,
        }


# ──────────────────────────────────────────────────────────
# DISPLAY HELPERS
# ──────────────────────────────────────────────────────────
def print_vitals(v: dict):
    print("\n-- Patient Vitals ------------------------------------------")
    print(f"  Heart Rate:        {v['heart_rate']} bpm")
    print(f"  SpO2:              {v['spo2']} %")
    print(f"  Blood Pressure:    {v['systolic_bp']}/{v['diastolic_bp']} mmHg")
    print(f"  Temperature:       {v['temperature']} °C")
    print(f"  Respiratory Rate:  {v['respiratory_rate']} br/min")
    print(f"  Blood Glucose:     {v['blood_glucose']} mg/dL")
    print(f"  Timestamp:         {v['timestamp']}")
    print("------------------------------------------------------------")


def print_assessment(result: dict):
    icons = {"LOW": "[OK]", "MEDIUM": "[WARN]", "HIGH": "[!!!]"}
    level = result["lstm_result"]["label"]
    print(f"\n{icons.get(level, '?')}  AI Assessment  [LSTM Risk: {level}]\n")
    print(result["assessment"])
    print("\n" + "=" * 62)


# ──────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────
def choose_scenario() -> str:
    scenarios = list(KiomiSimulator.SCENARIOS.keys())
    print("\n=============================================")
    print("   MedGuard v2 — LSTM + Real RAG Pipeline   ")
    print("=============================================\n")
    print("Available simulation scenarios:")
    for i, s in enumerate(scenarios, 1):
        print(f"  {i}. {s}")
    choice = input("\nSelect scenario number (or Enter for 'normal'): ").strip()
    if choice.isdigit() and 1 <= int(choice) <= len(scenarios):
        return scenarios[int(choice) - 1]
    return "normal"


if __name__ == "__main__":
    # API key
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        api_key = input("Enter your Gemini API key: ").strip()
    if not api_key:
        raise ValueError("No API key provided.")

    # Load components
    print("\n[MedGuard] Initializing pipeline...")
    lstm = LSTMRiskClassifier()
    rag  = MedGuardRAG()
    agent = MedGuardAgent(api_key=api_key, lstm=lstm, rag=rag)

    # Scenario + sensor
    scenario = choose_scenario()
    print(f"\n[MedGuard] Scenario: '{scenario}'")
    sensor = KiomiSimulator(scenario=scenario, noise=True)

    # Run mode
    mode = input("\nRun mode — (1) Single reading  (2) Continuous loop [default: 1]: ").strip()

    if mode == "2":
        print(f"\n[MedGuard] Monitoring loop started (interval: {POLL_INTERVAL}s). Ctrl+C to stop.\n")
        try:
            while True:
                vitals = sensor.read_vitals()
                print_vitals(vitals)
                result = agent.evaluate(vitals)
                print_assessment(result)
                print(f"\n[MedGuard] Next reading in {POLL_INTERVAL}s...")
                time.sleep(POLL_INTERVAL)
        except KeyboardInterrupt:
            print("\n\n[MedGuard] Monitoring stopped.")
    else:
        vitals = sensor.read_vitals()
        print_vitals(vitals)
        result = agent.evaluate(vitals)
        print_assessment(result)

"""
MedGuard RAG Agent
==================
Reads simulated patient vitals (via Kiomi or manual input),
evaluates the patient's condition using Google Gemini Flash,
and provides recommendations or emergency first-aid instructions.

Requirements:
    pip install google-generativeai

Usage:
    python medguard_rag_agent.py
"""

import time
import random
import json
import os
from datetime import datetime
from pathlib import Path

try:
    import google.generativeai as genai
except ImportError:
    raise ImportError("Run: pip install google-generativeai")


# ─────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────

GEMINI_API_KEY   = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
GEMINI_MODEL     = "gemini-2.5-flash"
POLL_INTERVAL    = 10  # seconds between readings in continuous mode
KB_PATH          = Path(__file__).parent / "medical_knowledge_base.json"


# ─────────────────────────────────────────────
# KNOWLEDGE BASE LOADER
# ─────────────────────────────────────────────

def load_knowledge_base(path: Path = KB_PATH) -> dict:
    if not path.exists():
        raise FileNotFoundError(
            f"Knowledge base not found at '{path}'.\n"
            "Make sure 'medical_knowledge_base.json' is in the same folder as this script."
        )
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def kb_to_prompt_context(kb: dict) -> str:
    """
    Converts the structured JSON knowledge base into a
    readable text block to inject into the Gemini prompt.
    """
    lines = ["=== MEDICAL KNOWLEDGE BASE ===\n"]

    # -- Vital sign ranges
    lines.append("## Vital Sign Normal & Critical Ranges")
    for vital, info in kb["vital_signs"].items():
        unit = info["unit"]
        ranges_summary = []
        for range_key, rng in info["ranges"].items():
            lo = rng.get("min", "")
            hi = rng.get("max", "")
            if lo and hi:
                span = f"{lo}-{hi}"
            elif lo:
                span = f">= {lo}"
            else:
                span = f"<= {hi}"
            ranges_summary.append(f"{rng['label']}: {span} {unit}")
        note = f"  Note: {info['notes']}" if info.get("notes") else ""
        lines.append(f"- {vital.replace('_', ' ').title()}: {' | '.join(ranges_summary)}{note}")

    # -- Condition patterns
    lines.append("\n## Condition Recognition Patterns")
    for cond in kb["condition_patterns"]:
        indicators = ", ".join(f"{k} {v}" for k, v in cond["indicators"].items())
        lines.append(f"- {cond['name']} [{cond['severity']}]: {cond['description']} (Indicators: {indicators})")

    # -- Non-critical recommendations
    lines.append("\n## Non-Critical Recommendations")
    for rec_key, rec in kb["recommendations"].items():
        actions = "; ".join(rec["actions"])
        lines.append(f"- {rec['applies_to'].capitalize()} [{rec['severity']}]: {actions}")

    # -- Emergency protocols
    lines.append("\n## Emergency First-Aid Protocols (for bystanders)")
    for proto_key, proto in kb["emergency_protocols"].items():
        lines.append(f"\n### {proto['condition']}")
        lines.append(f"Triggers: {proto['triggers']}")
        lines.append("Steps:")
        for i, step in enumerate(proto["steps"], 1):
            lines.append(f"  {i}. {step}")

    lines.append("\n=== END OF KNOWLEDGE BASE ===")
    return "\n".join(lines)


# ─────────────────────────────────────────────
# KIOMI SIMULATOR
# ─────────────────────────────────────────────

class KiomiSimulator:
    """
    Simulates IoT vital readings from a Kiomi device.
    Replace read_vitals() with real Kiomi SDK calls on actual hardware:

        from kiomisan import KiomiDevice
        device = KiomiDevice(port="/dev/ttyUSB0")
        return device.get_vitals()
    """

    SCENARIOS = {
        "normal":         {"hr": 75,  "spo2": 98, "sbp": 118, "dbp": 76,  "temp": 36.7, "rr": 15, "glucose": 95},
        "low_oxygen":     {"hr": 95,  "spo2": 91, "sbp": 115, "dbp": 74,  "temp": 36.9, "rr": 23, "glucose": 90},
        "heart_attack":   {"hr": 118, "spo2": 93, "sbp": 155, "dbp": 98,  "temp": 37.1, "rr": 26, "glucose": 105},
        "cardiac_arrest": {"hr": 22,  "spo2": 78, "sbp": 55,  "dbp": 30,  "temp": 36.5, "rr": 5,  "glucose": 88},
        "hypoglycemia":   {"hr": 105, "spo2": 97, "sbp": 110, "dbp": 70,  "temp": 36.8, "rr": 18, "glucose": 44},
        "hypertension":   {"hr": 88,  "spo2": 96, "sbp": 185, "dbp": 118, "temp": 36.9, "rr": 19, "glucose": 130},
        "fever_sepsis":   {"hr": 122, "spo2": 94, "sbp": 98,  "dbp": 58,  "temp": 39.8, "rr": 28, "glucose": 160},
    }

    def __init__(self, scenario: str = "normal", noise: bool = True):
        self.scenario = scenario
        self.noise    = noise

    def _jitter(self, value: float, scale: float = 0.02) -> float:
        if not self.noise:
            return value
        return round(value + random.uniform(-value * scale, value * scale), 1)

    def read_vitals(self) -> dict:
        base = self.SCENARIOS.get(self.scenario, self.SCENARIOS["normal"])
        return {
            "heart_rate":       self._jitter(base["hr"],      0.03),
            "spo2":             min(100, self._jitter(base["spo2"],  0.005)),
            "systolic_bp":      self._jitter(base["sbp"],     0.02),
            "diastolic_bp":     self._jitter(base["dbp"],     0.02),
            "temperature":      self._jitter(base["temp"],    0.005),
            "respiratory_rate": self._jitter(base["rr"],      0.05),
            "blood_glucose":    self._jitter(base["glucose"], 0.03),
            "timestamp":        datetime.now().isoformat(),
        }


# ─────────────────────────────────────────────
# TRIAGE HELPER
# ─────────────────────────────────────────────

def quick_triage(vitals: dict, kb: dict) -> str:
    """
    Fast local threshold check using ranges from the knowledge base JSON.
    Returns 'CRITICAL', 'WARNING', or 'STABLE'.
    """
    vital_map = {
        "heart_rate":       vitals["heart_rate"],
        "spo2":             vitals["spo2"],
        "systolic_bp":      vitals["systolic_bp"],
        "diastolic_bp":     vitals["diastolic_bp"],
        "temperature":      vitals["temperature"],
        "respiratory_rate": vitals["respiratory_rate"],
        "blood_glucose":    vitals["blood_glucose"],
    }

    level = "STABLE"

    for vital_name, value in vital_map.items():
        ranges = kb["vital_signs"][vital_name]["ranges"]

        if "critical_low" in ranges:
            threshold = ranges["critical_low"].get("max")
            if threshold is not None and value <= threshold:
                return "CRITICAL"

        if "critical_high" in ranges:
            threshold = ranges["critical_high"].get("min")
            if threshold is not None and value >= threshold:
                return "CRITICAL"

        if "warning_low" in ranges:
            lo = ranges["warning_low"].get("min", float("-inf"))
            hi = ranges["warning_low"].get("max", float("inf"))
            if lo <= value <= hi:
                level = "WARNING"

        if "warning_high" in ranges:
            lo = ranges["warning_high"].get("min", float("-inf"))
            hi = ranges["warning_high"].get("max", float("inf"))
            if lo <= value <= hi:
                level = "WARNING"

    return level


# ─────────────────────────────────────────────
# PROMPT BUILDER
# ─────────────────────────────────────────────

def build_prompt(vitals: dict, triage_level: str, kb_context: str) -> str:
    vitals_block = "\n".join([
        f"  - Heart Rate:        {vitals['heart_rate']} bpm",
        f"  - SpO2:              {vitals['spo2']} %",
        f"  - Blood Pressure:    {vitals['systolic_bp']}/{vitals['diastolic_bp']} mmHg",
        f"  - Temperature:       {vitals['temperature']} C",
        f"  - Respiratory Rate:  {vitals['respiratory_rate']} breaths/min",
        f"  - Blood Glucose:     {vitals['blood_glucose']} mg/dL",
        f"  - Timestamp:         {vitals['timestamp']}",
    ])

    urgency_instruction = {
        "CRITICAL": (
            "CRITICAL ALERT: One or more vitals are in the CRITICAL range. "
            "A non-medical bystander is reading this. "
            "Provide clear, numbered, step-by-step emergency first-aid instructions "
            "to perform RIGHT NOW before professional help arrives. "
            "Start with calling emergency services. Identify the most likely emergency condition."
        ),
        "WARNING": (
            "One or more vitals are outside the normal range but not yet critical. "
            "Identify which vitals are abnormal, explain what it might indicate, "
            "and give practical actionable recommendations. "
            "State clearly when to escalate to emergency services."
        ),
        "STABLE": (
            "All vitals appear within normal range. "
            "Provide brief reassurance and any general wellness tips based on the readings."
        ),
    }[triage_level]

    return f"""
{kb_context}

=== CURRENT PATIENT VITALS ===
{vitals_block}

=== TRIAGE LEVEL: {triage_level} ===

{urgency_instruction}

Respond using this structure:
1. **Condition Assessment**: What do the vitals suggest?
2. **Severity**: STABLE / WARNING / CRITICAL and why.
3. **Recommendations / First Aid Steps**: Numbered list, clear and simple.
4. **When to call emergency services**: Be explicit.

Use plain language a non-medical bystander can understand and act on immediately.
"""


# ─────────────────────────────────────────────
# MEDGUARD AGENT
# ─────────────────────────────────────────────

class MedGuardAgent:
    def __init__(self, api_key: str, kb: dict):
        genai.configure(api_key=api_key)
        self.kb         = kb
        self.kb_context = kb_to_prompt_context(kb)
        self.model      = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            system_instruction=(
                "You are MedGuard, an AI medical assistant that evaluates patient vitals "
                "read from IoT sensors. You use the provided medical knowledge base to give "
                "accurate, responsible, and clear health assessments and first-aid guidance. "
                "You always recommend calling emergency services for critical situations. "
                "You never replace professional medical care."
            )
        )

    def evaluate(self, vitals: dict) -> dict:
        triage = quick_triage(vitals, self.kb)
        prompt = build_prompt(vitals, triage, self.kb_context)

        print(f"\n{'='*60}")
        print(f"  [MedGuard]  Triage: {triage}  |  {vitals['timestamp']}")
        print(f"{'='*60}")

        response = self.model.generate_content(prompt)
        return {
            "triage_level": triage,
            "vitals":       vitals,
            "assessment":   response.text,
        }


# ─────────────────────────────────────────────
# DISPLAY HELPERS
# ─────────────────────────────────────────────

def print_vitals(vitals: dict):
    print("\n-- Patient Vitals ------------------------------------------")
    print(f"  Heart Rate:        {vitals['heart_rate']} bpm")
    print(f"  SpO2:              {vitals['spo2']} %")
    print(f"  Blood Pressure:    {vitals['systolic_bp']}/{vitals['diastolic_bp']} mmHg")
    print(f"  Temperature:       {vitals['temperature']} C")
    print(f"  Respiratory Rate:  {vitals['respiratory_rate']} br/min")
    print(f"  Blood Glucose:     {vitals['blood_glucose']} mg/dL")
    print(f"  Timestamp:         {vitals['timestamp']}")
    print("------------------------------------------------------------")


def print_assessment(result: dict):
    icons = {"STABLE": "[OK]", "WARNING": "[WARN]", "CRITICAL": "[!!!]"}
    level = result["triage_level"]
    print(f"\n{icons.get(level, '?')}  AI Assessment [{level}]\n")
    print(result["assessment"])
    print("\n" + "=" * 60)


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

def choose_scenario() -> str:
    scenarios = list(KiomiSimulator.SCENARIOS.keys())
    print("\n=============================================")
    print("      MedGuard RAG Agent -- Kiomi Sim       ")
    print("=============================================\n")
    print("Available simulation scenarios:")
    for i, s in enumerate(scenarios, 1):
        print(f"  {i}. {s}")
    print()
    choice = random.randrange(1, 8)
    if choice.isdigit() and 1 <= int(choice) <= len(scenarios):
        return scenarios[int(choice) - 1]
    return "normal"


def run_continuous(agent: MedGuardAgent, sensor: KiomiSimulator):
    print(f"\n[MedGuard] Monitoring loop started (interval: {POLL_INTERVAL}s). Press Ctrl+C to stop.\n")
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


def run_single(agent: MedGuardAgent, sensor: KiomiSimulator):
    vitals = sensor.read_vitals()
    print_vitals(vitals)
    result = agent.evaluate(vitals)
    print_assessment(result)
    return result


def lhdra_m3a_lai(message):
    # -- API key

    api_key = "AIzaSyAejIkIqEf725n3Di29XMAofAbCz-P7rco"

    # -- Load knowledge base
    print(f"\n[MedGuard] Loading knowledge base from '{KB_PATH}'...")
    kb = load_knowledge_base()
    print(f"[MedGuard] Loaded -- {len(kb['vital_signs'])} vitals, "
          f"{len(kb['condition_patterns'])} conditions, "
          f"{len(kb['emergency_protocols'])} emergency protocols.")

    # -- Scenario & agent
    scenario = message
    print(f"\n[MedGuard] Scenario: '{scenario}'")
    sensor = KiomiSimulator(scenario=scenario, noise=True)
    agent  = MedGuardAgent(api_key=api_key, kb=kb)
    return run_single(agent, sensor)
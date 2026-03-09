# MedGuard v2 — LSTM + Real RAG Pipeline

## What's new vs the original

| Feature | Original | v2 |
|---|---|---|
| Risk scoring | Simple threshold rules | **LSTM neural network** |
| Knowledge retrieval | Full JSON injected into every prompt | **Real RAG with ChromaDB vector search** |
| Embeddings | None | **sentence-transformers (all-MiniLM-L6-v2)** |
| Vector database | None | **ChromaDB (local, persistent)** |
| Knowledge base | Basic JSON | **Expanded with 10 rich medical articles** |

---

## Setup — run in order

### 1. Install dependencies
```bash
pip install google-generativeai tensorflow scikit-learn chromadb sentence-transformers
```

### 2. Generate synthetic training data
```bash
python generate_training_data.py
```
Generates ~10,400 labeled vitals samples across 13 clinical scenarios.
Output: `training_data.json`

### 3. Train the LSTM model
```bash
python train_lstm.py
```
Trains a 2-layer LSTM classifier. Takes ~1-2 minutes on a laptop CPU.
Output: `medguard_lstm.keras`, `medguard_scaler.pkl`

### 4. Build the RAG vector store
```bash
python build_rag.py
```
Chunks the knowledge base, generates embeddings, and stores them in ChromaDB.
Downloads `all-MiniLM-L6-v2` (~80MB) on first run — runs fully locally after that.
Output: `medguard_chroma_db/` directory

### 5. Run the agent
```bash
python medguard_rag_agent.py
```

---

## How the LSTM works

- Input: 7 vital signs (single reading)
- Features: heart rate, SpO2, systolic BP, diastolic BP, temperature, respiratory rate, blood glucose
- Architecture: LSTM(64) → Dropout → LSTM(32) → Dropout → Dense(32) → Dense(3, softmax)
- Output: risk category (LOW / MEDIUM / HIGH) with per-class confidence scores
- Training data: synthetic data across 13 labeled clinical scenarios

## How the RAG works

1. At build time (`build_rag.py`): the knowledge base is chunked into ~60 semantically meaningful pieces (vital sign descriptions, condition patterns, recommendations, emergency protocols, and medical article paragraphs). Each chunk is embedded using `all-MiniLM-L6-v2` and stored in ChromaDB with cosine similarity indexing.

2. At runtime (`medguard_rag_agent.py`): a query is constructed from the current vitals and LSTM risk label. ChromaDB performs a semantic vector search and returns the top 6 most relevant chunks. Only those chunks are injected into the Gemini prompt — not the entire knowledge base.

---

## File structure

```
medguard/
├── generate_training_data.py   # Synthetic data generator
├── train_lstm.py               # LSTM trainer
├── build_rag.py                # ChromaDB vector store builder
├── medguard_rag_agent.py       # Main agent (LSTM + RAG + Gemini)
├── medical_knowledge_base.json # Expanded knowledge base
├── training_data.json          # Generated after step 2
├── medguard_lstm.keras         # Generated after step 3
├── medguard_scaler.pkl         # Generated after step 3
└── medguard_chroma_db/         # Generated after step 4
```

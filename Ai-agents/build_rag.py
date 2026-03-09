"""
MedGuard — RAG Knowledge Base Builder
=======================================
Chunks the expanded medical knowledge base and stores
vector embeddings in a local ChromaDB collection.

Run this ONCE to build the vector store, then the main
agent will query it at runtime for semantic retrieval.

Usage:
    python build_rag.py
    → Creates ./medguard_chroma_db/ directory
"""

import json
from pathlib import Path

try:
    import chromadb
    from chromadb.utils import embedding_functions
except ImportError:
    raise ImportError("Run: pip install chromadb")

KB_PATH    = Path("medical_knowledge_base.json")
CHROMA_DIR = Path("medguard_chroma_db")
COLLECTION = "medguard_knowledge"

# Use ChromaDB's built-in sentence-transformers embedding
# (downloads 'all-MiniLM-L6-v2' on first run — ~80MB, fast, runs locally)
EMBED_FN = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)


def load_kb(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def build_chunks(kb: dict) -> list[dict]:
    """
    Converts the knowledge base into text chunks with metadata.
    Each chunk is a discrete, semantically meaningful piece of text.
    Returns list of {id, text, metadata} dicts.
    """
    chunks = []

    # ── 1. Vital sign descriptions ──────────────────────────
    for vital_name, info in kb["vital_signs"].items():
        unit = info["unit"]
        range_lines = []
        for rk, rng in info["ranges"].items():
            lo = rng.get("min", "")
            hi = rng.get("max", "")
            span = f"{lo}-{hi}" if lo and hi else (f">= {lo}" if lo else f"<= {hi}")
            range_lines.append(f"{rng['label']}: {span} {unit}")
        note = info.get("notes", "")
        text = (
            f"Vital sign: {vital_name.replace('_', ' ').title()} ({unit})\n"
            f"Ranges: {' | '.join(range_lines)}\n"
            + (f"Notes: {note}" if note else "")
        )
        chunks.append({
            "id":       f"vital_{vital_name}",
            "text":     text.strip(),
            "metadata": {"type": "vital_sign", "vital": vital_name},
        })

    # ── 2. Condition patterns ────────────────────────────────
    for cond in kb["condition_patterns"]:
        indicators = "; ".join(f"{k} {v}" for k, v in cond["indicators"].items())
        text = (
            f"Medical condition: {cond['name']} (Severity: {cond['severity']})\n"
            f"Recognition indicators: {indicators}\n"
            f"Description: {cond['description']}"
        )
        chunks.append({
            "id":       f"condition_{cond['id']}",
            "text":     text,
            "metadata": {"type": "condition", "severity": cond["severity"], "id": cond["id"]},
        })

    # ── 3. Recommendations ──────────────────────────────────
    for rec_key, rec in kb["recommendations"].items():
        actions_text = "\n".join(f"- {a}" for a in rec["actions"])
        text = (
            f"First-aid recommendation for: {rec['applies_to']} (Severity: {rec['severity']})\n"
            f"Actions:\n{actions_text}"
        )
        chunks.append({
            "id":       f"rec_{rec_key}",
            "text":     text,
            "metadata": {"type": "recommendation", "severity": rec["severity"]},
        })

    # ── 4. Emergency protocols — one chunk per step group ───
    for proto_key, proto in kb["emergency_protocols"].items():
        steps_text = "\n".join(f"{i+1}. {s}" for i, s in enumerate(proto["steps"]))
        text = (
            f"Emergency protocol: {proto['condition']}\n"
            f"Triggers: {proto['triggers']}\n"
            f"Step-by-step first-aid instructions:\n{steps_text}"
        )
        chunks.append({
            "id":       f"protocol_{proto_key}",
            "text":     text,
            "metadata": {"type": "protocol", "condition": proto["condition"]},
        })

    # ── 5. Medical articles (split into paragraphs) ─────────
    for article in kb.get("medical_articles", []):
        # Split article into paragraph-sized chunks for finer retrieval
        paragraphs = [p.strip() for p in article["content"].split(". ") if p.strip()]
        # Group into chunks of ~3 sentences each
        group_size = 3
        for i in range(0, len(paragraphs), group_size):
            chunk_text = ". ".join(paragraphs[i:i+group_size]) + "."
            chunk_id   = f"{article['id']}_chunk{i//group_size}"
            chunks.append({
                "id":       chunk_id,
                "text":     f"[{article['title']}]\n{chunk_text}",
                "metadata": {
                    "type":    "article",
                    "article": article["id"],
                    "title":   article["title"],
                    "tags":    ", ".join(article.get("tags", [])),
                },
            })

    return chunks


def build_vector_store(chunks: list[dict]) -> chromadb.Collection:
    client     = chromadb.PersistentClient(path=str(CHROMA_DIR))
    # Delete old collection if rebuilding
    try:
        client.delete_collection(COLLECTION)
    except Exception:
        pass

    collection = client.create_collection(
        name=COLLECTION,
        embedding_function=EMBED_FN,
        metadata={"hnsw:space": "cosine"},
    )

    ids       = [c["id"]   for c in chunks]
    documents = [c["text"] for c in chunks]
    metadatas = [c["metadata"] for c in chunks]

    # Upsert in batches of 100
    batch = 100
    for i in range(0, len(chunks), batch):
        collection.add(
            ids=ids[i:i+batch],
            documents=documents[i:i+batch],
            metadatas=metadatas[i:i+batch],
        )
        print(f"  Embedded {min(i+batch, len(chunks))}/{len(chunks)} chunks...")

    return collection


if __name__ == "__main__":
    print(f"[RAG Builder] Loading knowledge base from '{KB_PATH}'...")
    kb     = load_kb(KB_PATH)
    chunks = build_chunks(kb)
    print(f"[RAG Builder] Created {len(chunks)} text chunks.")

    print(f"[RAG Builder] Building ChromaDB vector store at '{CHROMA_DIR}'...")
    collection = build_vector_store(chunks)

    print(f"\n[RAG Builder] Done! Collection '{COLLECTION}' has {collection.count()} vectors.")
    print("[RAG Builder] Run medguard_rag_agent.py to start the agent.")

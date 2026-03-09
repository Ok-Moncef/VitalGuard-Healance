"""
MedGuard — LSTM Risk Classifier Trainer
========================================
Trains an LSTM model on synthetic vitals data.
Input:  7 vital sign features (single reading)
Output: risk category — LOW (0), MEDIUM (1), HIGH (2)

Usage:
    python train_lstm.py
    → Saves model to medguard_lstm.keras
    → Saves scaler to medguard_scaler.pkl
"""

import json
import pickle
import numpy as np
from pathlib import Path

try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense, Dropout, Reshape
    from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
    from tensorflow.keras.utils import to_categorical
except ImportError:
    raise ImportError("Run: pip install tensorflow")

try:
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import classification_report, confusion_matrix
except ImportError:
    raise ImportError("Run: pip install scikit-learn")

# ─── Config ───────────────────────────────────────────────
DATA_PATH   = Path("training_data.json")
MODEL_PATH  = Path("medguard_lstm.keras")
SCALER_PATH = Path("medguard_scaler.pkl")
FEATURES    = ["heart_rate", "spo2", "systolic_bp", "diastolic_bp",
               "temperature", "respiratory_rate", "blood_glucose"]
N_CLASSES   = 3
EPOCHS      = 80
BATCH_SIZE  = 64

# ─── Load data ────────────────────────────────────────────
print("[1/5] Loading training data...")
if not DATA_PATH.exists():
    print("  training_data.json not found — generating now...")
    import generate_training_data
    generate_training_data.generate.__module__
    data = generate_training_data.generate()
    with open(DATA_PATH, "w") as f:
        json.dump(data, f)
else:
    with open(DATA_PATH) as f:
        data = json.load(f)

X_raw = np.array([[r[feat] for feat in FEATURES] for r in data], dtype=np.float32)
y_raw = np.array([r["label"] for r in data], dtype=np.int32)
print(f"  {len(X_raw)} samples loaded. Classes: {np.bincount(y_raw).tolist()}")

# ─── Scale features ───────────────────────────────────────
print("[2/5] Scaling features...")
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_raw)

with open(SCALER_PATH, "wb") as f:
    pickle.dump(scaler, f)
print(f"  Scaler saved to {SCALER_PATH}")

# ─── Train/val/test split ─────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_raw, test_size=0.15, stratify=y_raw, random_state=42
)
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=0.15, stratify=y_train, random_state=42
)

# Reshape for LSTM: (samples, timesteps=1, features)
X_train_lstm = X_train.reshape(-1, 1, len(FEATURES))
X_val_lstm   = X_val.reshape(-1, 1, len(FEATURES))
X_test_lstm  = X_test.reshape(-1, 1, len(FEATURES))

y_train_cat = to_categorical(y_train, N_CLASSES)
y_val_cat   = to_categorical(y_val,   N_CLASSES)

print(f"  Train: {len(X_train)} | Val: {len(X_val)} | Test: {len(X_test)}")

# ─── Build model ──────────────────────────────────────────
print("[3/5] Building LSTM model...")

model = Sequential([
    LSTM(64, input_shape=(1, len(FEATURES)), return_sequences=True),
    Dropout(0.3),
    LSTM(32),
    Dropout(0.2),
    Dense(32, activation="relu"),
    Dense(N_CLASSES, activation="softmax"),
])

model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)
model.summary()

# ─── Train ────────────────────────────────────────────────
print("[4/5] Training...")

callbacks = [
    EarlyStopping(patience=10, restore_best_weights=True, verbose=1),
    ModelCheckpoint(MODEL_PATH, save_best_only=True, verbose=0),
]

history = model.fit(
    X_train_lstm, y_train_cat,
    validation_data=(X_val_lstm, y_val_cat),
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    callbacks=callbacks,
    verbose=1,
)

# ─── Evaluate ─────────────────────────────────────────────
print("[5/5] Evaluating on test set...")
y_pred_probs = model.predict(X_test_lstm)
y_pred = np.argmax(y_pred_probs, axis=1)

print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["LOW", "MEDIUM", "HIGH"]))

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

loss, acc = model.evaluate(X_test_lstm, to_categorical(y_test, N_CLASSES), verbose=0)
print(f"\nTest Accuracy: {acc:.4f}  |  Test Loss: {loss:.4f}")
print(f"\nModel saved to: {MODEL_PATH.resolve()}")
print("Done! Run medguard_rag_agent.py to use the trained model.")

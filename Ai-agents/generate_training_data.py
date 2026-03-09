"""
MedGuard — Synthetic Training Data Generator
=============================================
Generates labeled vitals data for LSTM training.
Labels: 0=LOW risk, 1=MEDIUM risk, 2=HIGH risk
"""

import json
import random
import numpy as np
from pathlib import Path

random.seed(42)
np.random.seed(42)

SCENARIOS = {
    # (label, hr, spo2, sbp, dbp, temp, rr, glucose)
    "normal":           (0, (60,100),  (96,100), (90,120),  (60,80),   (36.1,37.2), (12,20), (70,140)),
    "mild_tachy":       (1, (101,115), (94,99),  (120,145), (80,95),   (36.5,37.8), (18,24), (80,160)),
    "mild_hypo_spo2":   (1, (80,100),  (91,94),  (90,120),  (60,80),   (36.0,37.0), (20,26), (70,130)),
    "mild_hyper_bp":    (1, (75,100),  (95,99),  (140,179), (90,115),  (36.5,37.2), (14,20), (90,160)),
    "mild_fever":       (1, (90,110),  (95,99),  (110,135), (70,90),   (37.5,39.4), (18,24), (80,150)),
    "mild_hypoglycemia":(1, (95,115),  (96,99),  (100,130), (65,85),   (36.5,37.2), (16,22), (51,69)),
    "heart_attack":     (2, (110,140), (88,93),  (145,175), (90,110),  (36.8,37.5), (22,30), (90,140)),
    "cardiac_arrest":   (2, (15,35),   (70,82),  (40,65),   (20,40),   (35.5,36.8), (3,8),   (70,110)),
    "severe_hypoxia":   (2, (100,130), (80,90),  (90,130),  (60,90),   (36.5,37.5), (28,35), (70,120)),
    "sepsis":           (2, (118,145), (90,95),  (85,105),  (50,65),   (38.8,40.5), (26,34), (120,200)),
    "hypertensive_crisis":(2,(85,110), (93,98),  (180,220), (115,135), (36.5,37.5), (18,26), (100,180)),
    "severe_hypoglycemia":(2,(105,130),(95,99),  (100,130), (65,85),   (36.5,37.5), (18,24), (20,50)),
    "shock":            (2, (120,150), (82,92),  (40,75),   (20,45),   (35.5,37.0), (24,32), (60,110)),
}

def jitter(val):
    return round(val + random.uniform(-val * 0.02, val * 0.02), 1)

def sample_vitals(scenario_name):
    label, hr_r, spo2_r, sbp_r, dbp_r, temp_r, rr_r, gluc_r = SCENARIOS[scenario_name]
    return {
        "heart_rate":       jitter(random.uniform(*hr_r)),
        "spo2":             min(100, jitter(random.uniform(*spo2_r))),
        "systolic_bp":      jitter(random.uniform(*sbp_r)),
        "diastolic_bp":     jitter(random.uniform(*dbp_r)),
        "temperature":      jitter(random.uniform(*temp_r)),
        "respiratory_rate": jitter(random.uniform(*rr_r)),
        "blood_glucose":    jitter(random.uniform(*gluc_r)),
        "label":            label,
        "scenario":         scenario_name,
    }

def generate(n_per_scenario=800):
    records = []
    for name in SCENARIOS:
        for _ in range(n_per_scenario):
            records.append(sample_vitals(name))
    random.shuffle(records)
    return records

if __name__ == "__main__":
    data = generate(n_per_scenario=800)
    out = Path("training_data.json")
    with open(out, "w") as f:
        json.dump(data, f, indent=2)

    counts = {0: 0, 1: 0, 2: 0}
    for r in data:
        counts[r["label"]] += 1
    print(f"Generated {len(data)} samples")
    print(f"  LOW risk (0):    {counts[0]}")
    print(f"  MEDIUM risk (1): {counts[1]}")
    print(f"  HIGH risk (2):   {counts[2]}")
    print(f"Saved to {out.resolve()}")

import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

DATASET_PATH = "mhfa_nlp_dataset.xlsx"
MODEL_PATH = "mhfa_sklearn_model.joblib"
LABEL2ID = {"safe": 0, "distress": 1, "crisis": 2}
ID2LABEL = {0: "safe", 1: "distress", 2: "crisis"}

print("Loading dataset...")
df = pd.read_excel(DATASET_PATH)
df = df.dropna(subset=["text", "label", "language"]).copy()
df["text"] = df["text"].astype(str).str.strip()
df["label"] = df["label"].astype(str).str.strip().str.lower()
df["labels"] = df["label"].map(LABEL2ID)

X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["labels"], test_size=0.2, random_state=42, stratify=df["labels"]
)

print("🚀 Training sklearn model...")
model = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=5000, ngram_range=(1,2))),
    ('clf', LogisticRegression(max_iter=1000, class_weight='balanced'))
])

model.fit(X_train, y_train)
print("✅ Training complete!")

print("Evaluating...")
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred, target_names=ID2LABEL.values()))

# Save the model
joblib.dump(model, MODEL_PATH)
print(f"Model saved to {MODEL_PATH}")

# THIS is what your server will call
def get_response(text, lang="EN"):
    pred_id = model.predict([text])[0]
    priority = ID2LABEL[pred_id]
    print(f"DEBUG: '{text}' -> {priority}")

    replies = {
        "EN": {
            "safe": "I hear you. Thank you for sharing. What's been on your mind?",
            "distress": "That sounds really hard. You're not alone. Would you like to talk through what's happening?",
            "crisis": "I'm really worried about you. Please call for help right now: Kenya: 1196, SA: 0800 567 567. Can I stay with you?"
        },
        "SW": {
            "safe": "Nakusikia. Asante kwa kushiriki.",
            "distress": "Inasikika ni ngumu sana. Huja peke yako.",
            "crisis": "Nina wasiwasi sana nawe. Tafadhali piga 1196 sasa hivi."
        },
        "SH": {
            "safe": "Ndinzwa. Ndatenda nekutaura.",
            "distress": "Zvinorwadza chaizvo. Hauzivi wega.",
            "crisis": "Ndinokunetsekera zvikuru. Ndapota fonera 1196 izvozvi."
        }
    }
    lang_replies = replies.get(lang, replies["EN"])
    return lang_replies.get(priority), priority

# Test it
if __name__ == "__main__":
    print(get_response("i wanna die"))
    print(get_response("niko na stress sana"))
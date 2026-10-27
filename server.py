from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

app = Flask(__name__)
CORS(app) # Allow React to talk to Python

# LOAD YOUR TRAINED MODEL
try:
    model = joblib.load("mhfa_sklearn_model.joblib")
    ID2LABEL = {0: "safe", 1: "distress", 2: "crisis"}
    print("Model loaded successfully")
except Exception as e:
    print("Error loading model:", e)
    model = None

KENYA_HELPLINE = "1196 or 0800 720 080"

def detect_priority(text):
    text_lower = text.lower()

    # CRISIS KEYWORDS - EN + SW + SHENG
    crisis_keywords = [
        "die", "kill myself", "suicide", "end my life", "dont want to live",
        "kujiuwa", "kufa", "sitaki kuishi", "nijiue", "nataka kufa", "nijiuwe",
        "nijiongeleshe", "nataka kujimaliza", "siwezi kuendelea kuishi"
    ]

    # DISTRESS KEYWORDS - EN + SW + SHENG
    distress_keywords = [
        "stress", "depressed", "anxious", "hopeless", "overwhelmed", "tired", "sad", "lonely",
        "msongo", "huzuni", "nimechoka", "nina wasiwasi", "nimebored", "naskia mbaya",
        "niko down", "moyo inanisumbua", "sina raha"
    ]

    if any(word in text_lower for word in crisis_keywords):
        return "crisis"
    elif any(word in text_lower for word in distress_keywords):
        return "distress"
    elif model:
        try:
            pred_id = model.predict([text])[0]
            return ID2LABEL[pred_id]
        except:
            return "safe"
    else:
        return "safe"

def get_response(text, lang="EN"):
    priority = detect_priority(text)

    replies = {
        "EN": {
            "safe": "I hear you. Thank you for sharing. What's been on your mind today?",
            "distress": "That sounds really heavy to carry. I'm here with you. Can you tell me more about what's making you feel this way?",
            "crisis": f"I'm really worried about you. Your life matters. Please call for help right now: Kenya: {KENYA_HELPLINE}. You can also talk to someone you trust."
        },
        "SW": {
            "safe": "Nakusikiza. Asante kwa kushiriki. Nini kimekuwa kwenye mawazo yako leo?",
            "distress": "Hii inaonekana ni mzigo mzito sana. Nipo hapa na wewe. Unaweza kuniambia zaidi kinacho kufanya uhisi hivi?",
            "crisis": f"Nina wasiwasi sana juu yako. Maisha yako ni muhimu. Tafadhali pata msaada sasa hivi: Kenya: {KENYA_HELPLINE}. Zungumza na mtu unayemwamini."
        },
        "SG": { # SHENG - CASUAL YOUTH TONE
            "safe": "Niko hapa na wewe bro/sis. Poa ku-share. Ni nini imekushika leo?",
            "distress": "Aii hiyo ni mzigo mzito sana. Siko na wewe. Unaweza niambia nini imekufanya ufeel hivi? Tuchambue pamoja.",
            "crisis": f"Msee niko na wasiwasi na wewe sana. Tafadhali tafuta help haraka sana: Kenya: {KENYA_HELPLINE}. Ongea na mtu unatrust ama enda hospitali. Wewe ni muhimu."
        }
    }

    lang_replies = replies.get(lang, replies["EN"])
    reply_text = lang_replies.get(priority, lang_replies["safe"])

    return {"reply": reply_text, "priority": priority}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    user_lang = data.get("lang", "EN")

    if not user_message:
        return jsonify({"reply": "Please send a message", "priority": "safe"})

    response = get_response(user_message, user_lang)
    return jsonify(response)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
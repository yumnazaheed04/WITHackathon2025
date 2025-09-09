from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random

app = Flask(__name__)
CORS(app)

# Map of demo video filenames to preset labels + scores
DEMO_VIDEOS = {
    "01_02__meeting_serious__YVGY8LOK.mp4": {"label": "❌ Fake", "score": 0.8},
    "01_02__hugging_happy__YVGY8LOK.mp4": {"label": "❌ Fake", "score": 0.9},
    "01_03__kitchen_pan__JZUXXFRB.mp4": {"label": "⚠️ Suspected", "score": 0.9},
    "01__meeting_serious.mp4": {"label": "✅ Trustworthy", "score": 0.9},
    "01__hugging_happy.mp4": {"label": "✅ Trustworthy", "score": 0.9},
}

def predict_demo_or_mock(url):
    """
    If demo video, return preset label + score.
    Otherwise, return a mock AI detection result.
    """
    filename = os.path.basename(url)

    if filename in DEMO_VIDEOS:
        label = DEMO_VIDEOS[filename]["label"]
        score = DEMO_VIDEOS[filename]["score"]
        reason = f"Demo video preset label: {label}"
    else:
        # Simulated AI detection (randomized but biased to look realistic)
        score = random.uniform(0, 1)
        if score < 0.3:
            label = "✅ Trustworthy"
        elif score < 0.7:
            label = "⚠️ Suspected"
        else:
            label = "❌ Fake"
        reason = "Simulated AI analysis (MVP mode)"

    return score, label, reason

@app.route("/", methods=["GET"])
def home():
    return "Deepfake Detection API is running."

@app.route("/check", methods=["POST"])
def check_media():
    data = request.json
    url = data.get("url")
    score, label, reason = predict_demo_or_mock(url)
    return jsonify({
        "score": float(score),
        "label": label,
        "reason": reason
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

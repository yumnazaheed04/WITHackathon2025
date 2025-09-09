# Deepfake Detection Chrome Extension – Hackathon 2025

A Chrome extension that detects potential deepfake images and videos on web pages in real-time. Hover over an image or video to see a badge indicating whether it is trustworthy, suspected, or likely fake.

---

## ⚡ Quick Start (Hackathon-Ready)

Follow these steps to run the project in **<15 minutes**:

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd WITHackathon2025
Set up a virtual environment for the backend:

bash
Copy code
python3 -m venv kaggle-venv
source kaggle-venv/bin/activate
Install dependencies:

bash
Copy code
pip install -r backend/requirements.txt
Place your Kaggle API key in kaggle.json (download from Kaggle account → API).

Download sample DFDC Mini dataset:

bash
Copy code
cd backend/datasets
kaggle competitions download -c deepfake-detection-challenge -f train_sample_videos.zip
kaggle competitions download -c deepfake-detection-challenge -f test_videos.zip
kaggle competitions download -c deepfake-detection-challenge -f sample_submission.csv
unzip '*.zip'
cd ../../
Start the Flask backend:

bash
Copy code
python backend/backend.py
The backend will run at http://127.0.0.1:5000.

Load the Chrome extension:

Open chrome://extensions/

Enable Developer Mode

Click Load unpacked and select the extension/ folder

Hover over any image or video in your browser to see the detection badge.

📂 Dataset
DFDC Mini Dataset – small sample (~300 videos) for demo purposes.

Publicly available; free Kaggle login required.

Format: .mp4 videos with accompanying metadata.json and sample_submission.csv.

⚡ Features
Real-time detection on web pages.

Badge overlay:

✅ Trustworthy

⚠️ Suspected

❌ Fake

Click badge for detection reason.

Demo-ready model with placeholder predictions; can be trained on DFDC Mini dataset for real results.

🛠️ Project Structure
graphql
Copy code
WITHackathon2025/
├── backend/               # Flask API & model code
│   ├── backend.py
│   ├── datasets/          # DFDC Mini dataset
│   ├── models/            # Pre-trained/custom models
│   └── requirements.txt
├── extension/             # Chrome extension
│   ├── content.js
│   ├── manifest.json
├── kaggle.json            # Kaggle API key (not committed)
└── README.md
🎓 Credits & References
DFDC Mini Dataset – Kaggle: DeepFake Detection Challenge

Deepfake Detection Models & Research:

Dessa OSS DeepFake-Detection

Shirshosinha RedFlag_SCDS_TechFest

Fake Voice Detection

Libraries & Tools: Flask, NumPy, Pillow, requests, Chrome Extension API
# 🎓 SGT University AI Chatbot

An AI-powered smart assistant designed to help students with queries related to **admissions, courses, fees, campus information, and placements**.

The chatbot uses an **offline Large Language Model (LLM)** powered by **Ollama**, ensuring fast, secure, and private responses without external API costs.

---

## 🚀 Features

✅ Floating AI Buddy chatbot
✅ Modern white & pink professional UI
✅ Dynamic background image slider (campus, events, culture)
✅ AI-generated responses using offline LLM
✅ Flask backend with REST API
✅ Lightweight and easy to deploy
✅ Works without internet after setup

---

## 🧠 AI Architecture

User → Flask Backend → Ollama LLM → Response → UI

The chatbot leverages local LLM inference instead of cloud APIs, making it cost-effective and privacy-friendly.

---

## 🛠 Tech Stack

* Python (Flask)
* HTML, CSS, JavaScript
* Ollama (Phi-3 / Gemma Models)
* Machine Learning / RAG Concepts
* Local LLM Inference

---

## ⚙️ Prerequisites

Before running this project, install:

### 1️⃣ Python

Download:
https://www.python.org/downloads/

### 2️⃣ Ollama (Required for AI Model)

Download Ollama:
https://ollama.com

After installing Ollama, run:

```bash
ollama pull phi3
```

Alternative model:

```bash
ollama pull gemma:2b
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/ahujakush/AI-chatbot.git
cd AI-chatbot/college_chatbot
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## ▶️ Run the Project

Start Ollama (if not running):

```bash
ollama run phi3
```

Then run Flask app:

```bash
python app.py
```

Open browser:

```
http://127.0.0.1:5000
```

---

## 💡 How It Works

1. User opens website
2. Landing page shows university information and images
3. Floating AI Buddy appears
4. User clicks chatbot
5. Query is sent to Flask backend
6. Backend sends prompt to Ollama LLM
7. AI response returned instantly

---

## 📁 Project Structure

```
college_chatbot/
│── app.py
│── ollama_engine.py
│── rag_engine.py
│── train_model.py
│── requirements.txt
│
├── data/
│   ├── college_faq.csv
│   ├── knowledge.txt
│
├── static/
│   ├── css/
│   ├── js/
│   ├── images/
│
├── templates/
│   ├── chat.html
│
└── models/
```

---

## 🎨 UI Highlights

* Floating chatbot interface
* Glassmorphism effect
* Background image slider
* Mobile responsive design
* Modern university-style layout

---

## 🔮 Future Improvements

* Voice input support
* Student login integration
* Database knowledge retrieval
* Multi-language support
* Deployment on cloud server

---

## 👨‍💻 Author

**Kush Ahuja**
B.Tech Artificial Intelligence & Machine Learning

GitHub: https://github.com/ahujakush

---

## ⭐ Project Purpose

This project was developed as part of an internship to demonstrate:

* AI chatbot development
* Local LLM integration
* Full-stack implementation
* UI/UX design skills
* Machine learning concepts

---

## 📜 License

This project is for educational and internship demonstration purposes.

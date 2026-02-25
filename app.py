from flask import Flask, render_template, request, jsonify
from ollama_engine import get_answer
import ollama 
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("chat.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    answer = get_answer(user_message)

    return jsonify({"response": answer})

def warmup():
    ollama.chat(
        model="phi3",   # or llama3 if using that
        messages=[{"role": "user", "content": "hello"}]
    )


if __name__ == "__main__":
    app.run(debug=True)
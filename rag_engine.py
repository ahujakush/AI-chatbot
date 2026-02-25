import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def load_knowledge():
    with open("data/knowledge.txt", "r", encoding="utf-8") as f:
        return f.read()


knowledge_base = load_knowledge()


def get_answer(question):

    prompt = f"""
    You are an AI assistant for SGT University.

    Use the following information to answer:

    {knowledge_base}

    Question: {question}

    Answer clearly and professionally.
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    return response.text
import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def embed_text(text: str):
    response = genai.embed_content(
        model="models/embedding-001",
        content=text
    )
    return response["embedding"]

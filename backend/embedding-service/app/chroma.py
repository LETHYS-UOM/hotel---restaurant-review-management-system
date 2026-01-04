import chromadb
from chromadb.config import Settings

client = chromadb.Client(
    Settings(
        persist_directory="/data/chroma",
        anonymized_telemetry=False
    )
)

collection = client.get_or_create_collection("hotel_reviews")

def save_embedding(review_id: str, embedding, metadata: dict):
    collection.add(
        ids=[review_id],
        embeddings=[embedding],
        metadatas=[metadata]
    )

def count_embeddings():
    return collection.count()

def peek_embeddings(limit=5):
    return collection.peek(limit=limit)

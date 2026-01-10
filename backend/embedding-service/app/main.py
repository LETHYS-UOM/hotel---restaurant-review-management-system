from fastapi import FastAPI
from pydantic import BaseModel

from app.embedding import embed_text
from app.chroma import save_embedding
from app.chroma import collection

app = FastAPI(title="Embedding Service")


class Review(BaseModel):
    review_id: str
    text: str
    hotel_id: int


@app.post("/embed")
def embed(review: Review):
    vector = embed_text(review.text)

    save_embedding(
        review.review_id,
        vector,
        {"hotel_id": review.hotel_id}
    )

    return {"status": "success"}

@app.get("/debug/count")
def debug_count():
    return {"count": collection.count()}

@app.get("/debug/peek")
def debug_peek():
    return collection.peek(limit=5)
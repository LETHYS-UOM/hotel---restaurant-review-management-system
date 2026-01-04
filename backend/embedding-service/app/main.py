from fastapi import FastAPI
from pydantic import BaseModel

from app.embedding import embed_text
from app.chroma import save_embedding

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

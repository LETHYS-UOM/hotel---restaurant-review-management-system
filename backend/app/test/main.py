from fastapi import FastAPI
from routers import reviews

app = FastAPI(title="Hotel Review API")

app.include_router(reviews.router)

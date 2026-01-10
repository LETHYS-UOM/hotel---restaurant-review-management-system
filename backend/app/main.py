from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, AnyHttpUrl
import json
import os
from pathlib import Path

from test.scraping.booking import scrape_booking

# Importing internal modules (assuming you have these folders)
# from app.api.v1 import api_router
# from app.core.config import settings

app = FastAPI(
    title="My Project API",
    description="A comprehensive API built with FastAPI",
    version="1.0.0",
)

# 1. Middleware Configuration
# Adjust 'allow_origins' for production (e.g., ["https://example.com"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 3. Health Check / Root Endpoint
@app.get("/", tags=["Health"])
async def root():
    return {"message": "API is online", "status": "healthy"}

class BookingScrapeRequest(BaseModel):
    url: AnyHttpUrl
    headless: bool = True

<<<<<<< HEAD
# 5. Example Endpoint

=======

@app.post("/scrape/booking", tags=["Scraping"])
async def start_booking_scrape(payload: BookingScrapeRequest, background_tasks: BackgroundTasks):
    """Kick off a Booking.com scrape from the front end.

    Runs in a background task so the HTTP request returns immediately.
    """
    try:
        background_tasks.add_task(scrape_booking, str(payload.url), payload.headless)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Unable to start scrape: {exc}")

    return {
        "message": "Booking.com scrape started",
        "url": str(payload.url),
        "headless": payload.headless,
    }


@app.get("/reviews", tags=["Reviews"])
async def get_reviews():
    """Get all scraped reviews from the analyzed data file."""
    try:
        # Path to the analyzed data file
        data_file = Path(__file__).parent / "analyzed_data_frontend.json"
        
        # Check if file exists
        if not data_file.exists():
            return {"reviews": [], "message": "No reviews found yet. Run a scrape first."}
        
        # Read and return the reviews
        with open(data_file, 'r', encoding='utf-8') as f:
            reviews = json.load(f)
        
        return {"reviews": reviews, "total": len(reviews)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading reviews: {str(e)}")
>>>>>>> frontend-merge-to-scraping

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
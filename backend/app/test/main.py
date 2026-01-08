import json
import pyodbc
import uvicorn
from typing import List, Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel , AnyHttpUrl
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from scraping.booking import scrape_booking

load_dotenv()  # Load environment variables from .env file
# ==========================================
# 1. CONFIGURATION
# ==========================================
# REPLACE with your specific connection details
DB_CONNECTION_STRING = (
    f"DRIVER={{{os.getenv('DB_DRIVER')}}};"
    f"SERVER={os.getenv('DB_SERVER')};"
    f"DATABASE={os.getenv('DB_NAME')};"
    f"UID={os.getenv('DB_UID')};"
    f"PWD={os.getenv('DB_PWD')};"
    "TrustServerCertificate=yes;"
)

# ==========================================
# 2. DATA MODELS (Pydantic)
# ==========================================
class ReviewModel(BaseModel):
    id: int
    rating: float
    userName: str
    text: Optional[str] = None
    sentiment: str
    categories: List[str]  # API returns this as a real list ["Food", "Service"]
    source: str
    date: str
    status: str

# ==========================================
# 3. APP INITIALIZATION
# ==========================================
app = FastAPI(title="Review Management API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (React, etc.) to connect
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allows all headers
)

# ==========================================
# 4. DATABASE HELPERS
# ==========================================
def get_all_reviews_from_db():
    try:
        conn = pyodbc.connect(DB_CONNECTION_STRING)
        cursor = conn.cursor()
        
        # We use [brackets] for reserved keywords like date/status
        query = """
            SELECT id, rating, userName, text, sentiment, 
                   categories, source, [date], [status]
            FROM dbo.process_reviews
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        results = []
        for row in rows:
            # PARSING LOGIC:
            # The DB stores categories as a string: '["Food", "Cleanliness"]'
            # We must convert it back to a Python list using json.loads
            try:
                cat_list = json.loads(row.categories) if row.categories else []
            except json.JSONDecodeError:
                cat_list = [] # Safety fallback if DB data is corrupt

            results.append({
                "id": row.id,
                "rating": row.rating,
                "userName": row.userName,
                "text": row.text,
                "sentiment": row.sentiment,
                "categories": cat_list,
                "source": row.source,
                "date": row.date,
                "status": row.status
            })
            
        conn.close()
        return results

    except Exception as e:
        print(f"Database Error: {e}")
        raise e
    
# def remove_all_reviews_from_db():
#     try:
#         conn = pyodbc.connect(DB_CONNECTION_STRING)
#         cursor = conn.cursor()
#
#         # Delete all records from ProcessedReviews
#         cursor.execute("DELETE FROM dbo.review_photos")
#         conn.commit()
#
#         # Delete all records from ReviewPhotos
#         cursor.execute("DELETE FROM dbo.ReviewPhotos")
#         conn.commit()
#
#         # Delete all records from RawReviews
#         cursor.execute("DELETE FROM dbo.ProcessedReviews")
#         conn.commit()
#
#         conn.close()
#         return True
#     except Exception as e:
#         print(f"Database Error: {e}")
#         raise e

# ==========================================
# 5. API ROUTES
# ==========================================

@app.get("/")
def read_root():
    return {"status": "Active", "message": "Visit /docs to see the API"}

@app.get("/reviews", response_model=List[ReviewModel])
def read_reviews():
    """
    Fetch all processed reviews from the database.
    Converts stored JSON strings back into arrays.
    """
    try:
        reviews = get_all_reviews_from_db()
        return reviews
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/reviews_count")
def count_reviews():
    """
    Returns the total number of reviews in the database.
    """
    try:
        conn = pyodbc.connect(DB_CONNECTION_STRING)
        cursor = conn.cursor()
        
        # specific SQL query for counting rows efficiently
        query = "SELECT COUNT(*) FROM dbo.process_reviews"
        
        cursor.execute(query)
        count = cursor.fetchone()[0] # Gets the first column of the first row
        
        conn.close()
        return {"total_reviews": count}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class BookingScrapeRequest(BaseModel):
    url: AnyHttpUrl
    headless: bool = True


@app.post("/scrape/booking", tags=["Scraping"])
async def start_booking_scrape(payload: BookingScrapeRequest, background_tasks: BackgroundTasks):
    """Kick off a Booking.com scrape from the front end.

    Runs in a background task so the HTTP request returns immediately.
    """
    
    try:
        remove_all_reviews_from_db()
    except Exception as e:
        print(e)
    
    try:
        background_tasks.add_task(scrape_booking, str(payload.url), payload.headless)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Unable to start scrape: {exc}")

    return {
        "message": "Booking.com scrape started",
        "url": str(payload.url),
        "headless": payload.headless,
    }


# ==========================================
# 6. RUNNER
# ==========================================
if __name__ == "__main__":
    # Runs the server on localhost:8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
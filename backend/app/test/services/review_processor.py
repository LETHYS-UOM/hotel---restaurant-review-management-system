"""
analyze_reviews_from_db.py
Fetch reviews + photos from BookingScraper DB, send to Gemini,
save cleaned JSON for the front-end, and store results in SQL.
"""
from __future__ import annotations
import json
import pathlib
import re
from dataclasses import dataclass, asdict
from typing import List

from google import genai
import pyodbc

# ------------------------------------------------------------------
# Helpers
# ------------------------------------------------------------------
def strip_markdown_fences(text: str) -> str:
    """Remove ```json ... ``` or ``` ... ``` fences if present."""
    pattern = r'^```(?:json)?\s*(.*?)\s*```$'
    match = re.search(pattern, text, re.DOTALL | re.MULTILINE)
    return match.group(1) if match else text

# ------------------------------------------------------------------
# 1. DB connection (same credentials as the scraper)
# ------------------------------------------------------------------
CONN_STR = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=178.128.84.124;"
    "DATABASE=BookingScraper;"
    "UID=sa;"
    "PWD=Qwer3552;"
    "TrustServerCertificate=yes;"
)

# ------------------------------------------------------------------
# 2. Gemini setup
# ------------------------------------------------------------------
GENAI_KEY = "AIzaSyBn7-MzYkqfjTSHTSr4ddb5KyPkJcfYc9A"
client = genai.Client(api_key=GENAI_KEY, http_options={"api_version": "v1"})

# ------------------------------------------------------------------
# 3. Tiny DTOs to build the JSON array exactly like the scraper did
# ------------------------------------------------------------------
@dataclass
class Picture:
    src: str
    alt: str

@dataclass
class Review:
    review_id: int
    title: str
    score: float
    positive_txt: str
    negative_txt: str
    posted_date: str | None
    reviewer_stay_date: str | None
    num_of_nights: int
    traveler_type: str
    room_name: str
    raw_review: str
    photo: List[Picture]

# ------------------------------------------------------------------
# 4. DB I/O
# ------------------------------------------------------------------
def fetch_reviews() -> List[Review]:
    """Return every review + its photos as a list of Review objects."""
    with pyodbc.connect(CONN_STR) as conn:
        cur = conn.cursor()

        rows = cur.execute(
            "SELECT review_id, title, score, positive_txt, negative_txt, "
            "posted_date, reviewer_stay_date, num_of_nights, traveler_type, "
            "room_name, raw_review FROM reviews"
        ).fetchall()

        pics = cur.execute(
            "SELECT review_id, src, alt FROM review_photos"
        ).fetchall()
        photo_map: dict[int, List[Picture]] = {}
        for rev_id, src, alt in pics:
            photo_map.setdefault(rev_id, []).append(Picture(src=src or "", alt=alt or ""))

        reviews = []
        for r in rows:
            rev = Review(
                review_id=r.review_id,
                title=r.title or "",
                score=float(r.score or 0),
                positive_txt=r.positive_txt or "",
                negative_txt=r.negative_txt or "",
                posted_date=r.posted_date.isoformat() if r.posted_date else None,
                reviewer_stay_date=r.reviewer_stay_date.isoformat() if r.reviewer_stay_date else None,
                num_of_nights=r.num_of_nights or 0,
                traveler_type=r.traveler_type or "",
                room_name=r.room_name or "",
                raw_review=r.raw_review or "",
                photo=photo_map.get(r.review_id, []),
            )
            reviews.append(rev)
    return reviews

# ------------------------------------------------------------------
# 5. Helper: insert cleaned rows into process_reviews table
# ------------------------------------------------------------------
def insert_processed_reviews(conn: pyodbc.Connection, rows: list[dict]) -> None:
    """rows = the JSON array Gemini returned (list of dicts)"""
    sql = """
        INSERT INTO dbo.process_reviews
               (id, rating, userName, text, sentiment,
                categories, source, [date], [status])
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    cur = conn.cursor()
    for r in rows:
        cur.execute(
            sql,
            r["id"],
            r["rating"],
            r["userName"],
            r["text"],
            r["sentiment"],
            json.dumps(r["categories"], ensure_ascii=False),
            r["source"],
            r["date"],
            r["status"]
        )
    cur.commit()
    print(f"✓ Saved {len(rows)} processed reviews to SQL table.")

# ------------------------------------------------------------------
# 6. Prompt builder (identical to your original, with escaped braces)
# ------------------------------------------------------------------
SYSTEM_PROMPT = """Role: You are a Review Data Processor and Sentiment Analyst for a hotel reputation management system.

Task: I will provide you with a JSON array of raw hotel reviews. Your job is to parse, clean, and restructure this data into a specific JSON output format.

Transformation Rules:

id: Use the original review_id.

rating: The input score is out of 10. Convert this to a 1-5 star rating scale (e.g., score / 2). Round to the nearest integer.

userName: The input does not have a specific name field. You must extract the name from the raw_review field. The name is typically the very first word or two at the start of that string (e.g., if raw_review is "Prem IndiaDouble Room...", the name is "Prem").

text: Combine the title, positive_txt, and negative_txt into a single, coherent paragraph. Do not include empty strings if the positive or negative text is missing.

sentiment: Analyze the combined text and the score. Output one of the following: "Positive", "Neutral", "Negative".

categories: Analyze the text and tag the review with relevant categories from this list: ["Cleanliness", "Staff", "Location", "Facilities", "Comfort", "Value", "Noise", "Food", "Privacy"]. Max 3 categories.

source: Always set this to "Booking.com".

date: Format the reviewer_stay_date into "MMM DD, YYYY" format (e.g., "Sep 01, 2025").

status: Always set this to "Pending".

Input Data: {hotel_data}

Output Format: Return only a valid JSON array with objects matching this structure:

[
  {{
    "id": 1,
    "rating": 4,
    "userName": "Extracted Name",
    "text": "The combined review text...",
    "sentiment": "Positive",
    "categories": ["Category1", "Category2"],
    "source": "Booking.com",
    "date": "Sep 01, 2025",
    "status": "Pending"
  }}
]
"""

# ------------------------------------------------------------------
# 7. Orchestration
# ------------------------------------------------------------------
def main() -> None:
    reviews = fetch_reviews()
    if not reviews:
        print("No reviews found in DB – aborting.")
        return

    # build prompt exactly as before
    hotel_data = json.dumps([asdict(r) for r in reviews], ensure_ascii=False)
    prompt = SYSTEM_PROMPT.format(hotel_data=hotel_data)
    pathlib.Path("promptForFrontender.txt").write_text(prompt, encoding="utf-8")
    print("Prompt saved -> promptForFrontender.txt")

    # Gemini call
    print("Calling Gemini…")
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )

    # Safely extract text and strip fences
    response_text = response.text  # new SDK property
    clean_json_text = strip_markdown_fences(response_text)

    # Parse JSON
    try:
        cleaned_rows = json.loads(clean_json_text)
        if not isinstance(cleaned_rows, list):
            raise ValueError("Response is not a JSON array")
    except json.JSONDecodeError as e:
        print(f"Failed to parse Gemini response as JSON: {e}")
        print("Raw response:", clean_json_text)
        raise

    print("--- Analysis ---")
    print(response_text)

    # 1) save JSON for front-end
    pathlib.Path("analyzed_data_frontend.json").write_text(
        json.dumps(cleaned_rows, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print("✓ analyzed_data_frontend.json saved")

    # 2) save to SQL
    with pyodbc.connect(CONN_STR) as conn:
        insert_processed_reviews(conn, cleaned_rows)

if __name__ == "__main__":
    main()
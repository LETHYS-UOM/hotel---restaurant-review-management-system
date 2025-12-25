from datetime import datetime
from dataclasses import dataclass, asdict
import json
import pathlib
import random
import re
from time import sleep
from typing import List

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

# --- Create screenshots directory ---
screenshot_dir = pathlib.Path("screenshots")
screenshot_dir.mkdir(parents=True, exist_ok=True)
print(f"Screenshots will be saved to: {screenshot_dir.absolute()}")
# ------------------------------------

URL = input("Paste the Booking.com property reviews URL and press Enter: ").strip()
if not URL.startswith("http"):
    raise SystemExit("That doesn't look like a valid URL – aborting.")


def rand_between(a: int = 2000, b: int = 4500) -> int:
    return random.randint(min(a, b), max(a, b))


def first_float(text: str) -> float | None:
    if not text:
        return None
    m = re.search(r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)', text)
    return float(m.group(0)) if m else None


@dataclass
class Picture:
    src: str = ""
    alt: str = ""


@dataclass
class Review:
    review_id: int
    title: str
    score: float
    positive_txt: str = ""
    negative_txt: str = ""
    posted_date: str = None  # Changed to string for JSON serialization
    reviewer_stay_date: str = None  # Changed to string for JSON serialization
    num_of_nights: int = 0
    traveler_type: str = ""
    room_name: str = ""
    raw_review: str = ""
    photo: List[Picture] = None

    def __post_init__(self):
        if self.photo is None:
            self.photo = []


all_reviews: List[Review] = []

with sync_playwright() as p:
    # Launch with stealth mode to avoid detection
    browser = p.chromium.launch(
        headless=True,
        args=['--disable-blink-features=AutomationControlled']
    )

    context = browser.new_context(
        viewport={'width': 1050, 'height': 600},
        user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )

    page = context.new_page()

    try:
        print("Loading page...")
        page.goto(URL, wait_until="domcontentloaded", timeout=60000)
        
        # SCREENSHOT: Page Initial Load
        page.screenshot(path="screenshots/01_initial_page_load.png")

        # Wait for and click "View all reviews"
        print("Waiting for reviews button...")
        view_all_reviews = page.locator('[data-testid="fr-read-all-reviews"]')
        view_all_reviews.wait_for(state="visible", timeout=10000)
        
        # SCREENSHOT: Review Button Visible
        page.screenshot(path="screenshots/02_review_button_visible.png")

        page.locator('[data-testid="poi-block"]').last.wait_for(state="visible")
        view_all_reviews.hover()
        page.wait_for_timeout(rand_between())
        view_all_reviews.click()
        print("Review button clicked, waiting for modal...")

        # Wait for review modal to load
        page.wait_for_timeout(2000)
        page.locator('[data-testid="review-card"]').first.wait_for(state="visible", timeout=10000)
        
        # SCREENSHOT: Modal Loaded
        page.screenshot(path="screenshots/03_review_modal_loaded.png")

        page_counter = 1
        while True:
            print(f"\n--- Processing Page {page_counter} ---")

            # Wait for reviews to stabilize
            sleep(0.5)
            page.wait_for_timeout(rand_between())

            review_nodes = page.locator('[data-testid="review-card"]')
            review_nodes.last.wait_for(state="visible")
            
            # SCREENSHOT: Current Page Content
            page.screenshot(path=f"screenshots/04_page_{page_counter}_content.png")

            base_id = len(all_reviews) + 1
            no_of_reviews_for_the_page = review_nodes.count()

            for i in range(no_of_reviews_for_the_page):
                print(f"Reading review: {i + 1}/{no_of_reviews_for_the_page}")

                review = review_nodes.nth(i)

                # Safely get text content with fallbacks
                try:
                    raw_text = review.text_content(timeout=1000) or ""
                except:
                    raw_text = ""

                # Extract review data with error handling for each field
                try:
                    review_title = review.locator('[data-testid="review-title"]').text_content(timeout=1000).strip()
                except:
                    review_title = "No Title"

                try:
                    rev_po_date = \
                    review.locator('[data-testid="review-date"]').text_content(timeout=1000).strip().split(":", 1)[
                        -1].strip()
                    review_post_date = datetime.strptime(rev_po_date, "%B %d, %Y").date().isoformat()
                except:
                    review_post_date = None

                try:
                    score_text = review.locator('[data-testid="review-score"]').text_content(timeout=1000).strip()
                    review_score = first_float(score_text) or 0.0
                except:
                    review_score = 0.0

                try:
                    pos_rev = review.locator('[data-testid="review-positive-text"]')
                    positive_review = pos_rev.text_content(timeout=1000).strip() if pos_rev.count() > 0 else ""
                except:
                    positive_review = ""

                try:
                    neg_rev = review.locator('[data-testid="review-negative-text"]')
                    negative_review = neg_rev.text_content(timeout=1000).strip() if neg_rev.count() > 0 else ""
                except:
                    negative_review = ""

                try:
                    st_date = review.locator('[data-testid="review-stay-date"]').text_content(timeout=1000).strip()
                    stayed_date = datetime.strptime(st_date, "%B %Y").date().isoformat()
                except:
                    stayed_date = None

                try:
                    nights_text = review.locator('[data-testid="review-num-nights"]').text_content(timeout=1000).strip()
                    num_of_nights = int(first_float(nights_text) or 0)
                except:
                    num_of_nights = 0

                try:
                    traveler_type = review.locator('[data-testid="review-traveler-type"]').text_content(
                        timeout=1000).strip()
                except:
                    traveler_type = ""

                try:
                    room_name = review.locator('[data-testid="review-room-name"]').text_content(timeout=1000).strip()
                except:
                    room_name = ""

                # IMPROVED PHOTO HANDLING
                review_pictures: List[Picture] = []
                try:
                    is_photo = review.locator('[data-testid="review-photos"]')
                    if is_photo.count() > 0:
                        print("  → Detected photos, opening gallery...")
                        thumb_place = is_photo.locator('[data-testid="REVIEW_THUMBNAIL_PROPERTY"]').first

                        # Ensure thumbnail is stable before clicking
                        thumb_place.wait_for(state="visible", timeout=2000)
                        thumb_place.hover()
                        page.wait_for_timeout(rand_between())
                        thumb_place.click()

                        # WAIT FOR GALLERY TO APPEAR AND LOAD
                        gallery = page.locator('[data-testid="GALLERY"]')
                        gallery.wait_for(state="visible", timeout=5000)
                        page.wait_for_timeout(1000)  # Extra buffer for animation

                        # WAIT FOR AT LEAST ONE IMAGE TO BE PRESENT
                        gallery.locator('[data-testid="REVIEW_PHOTO_PROPERTY"] img').first.wait_for(state="attached",
                                                                                                    timeout=5000)
                        page.wait_for_timeout(rand_between())  # Additional load time for lazy images
                        
                        # SCREENSHOT: Gallery Open
                        page.screenshot(path=f"screenshots/05_gallery_pg{page_counter}_rev{i+1}.png")

                        # Now safely get all images
                        img_elements = gallery.locator('[data-testid="REVIEW_PHOTO_PROPERTY"] img').all()

                        print(f"  → Extracting {len(img_elements)} photo(s)...")
                        for img in img_elements:
                            try:
                                src = img.get_attribute("src", timeout=1000) or ""
                                alt = img.get_attribute("alt", timeout=1000) or ""
                                review_pictures.append(Picture(src=src, alt=alt))
                            except:
                                continue  # Skip individual photo if it fails

                        # Close gallery
                        close_btn = page.locator('[data-testid="GALLERY_CLOSE"]')
                        close_btn.wait_for(state="visible", timeout=2000)
                        page.wait_for_timeout(rand_between())
                        close_btn.click()

                        # Wait for gallery to disappear
                        gallery.wait_for(state="hidden", timeout=2000)
                        page.wait_for_timeout(500)

                except Exception as e:
                    print(f"  → Photo extraction failed: {str(e)[:50]}...")
                    # Ensure gallery is closed if something went wrong
                    try:
                        close_btn = page.locator('[data-testid="GALLERY_CLOSE"]')
                        if close_btn.count() > 0 and close_btn.is_visible():
                            close_btn.click()
                            page.wait_for_timeout(500)
                    except:
                        pass

                # Create review object
                all_reviews.append(Review(
                    review_id=base_id + i,
                    title=review_title,
                    score=review_score,
                    positive_txt=positive_review,
                    negative_txt=negative_review,
                    posted_date=review_post_date,
                    reviewer_stay_date=stayed_date,
                    num_of_nights=num_of_nights,
                    traveler_type=traveler_type,
                    room_name=room_name,
                    photo=review_pictures,
                    raw_review=raw_text
                ))

            # PAGINATION
            page_counter += 1
            print(f"\nMoving to page {page_counter}...")

            next_page_button = page.locator('[aria-label="Next page"]')

            # Check if next button exists and is enabled
            if next_page_button.count() == 0 or next_page_button.is_disabled():
                print("No more pages available.")
                break

            next_page_button.hover()
            page.wait_for_timeout(rand_between())
            next_page_button.click()
            print("Next page clicked, waiting for load...")

            # Wait for new reviews to load
            page.wait_for_timeout(rand_between())
            page.locator('[data-testid="review-card"]').first.wait_for(state='visible', timeout=10000)

        print("\nFinished scraping all reviews!")
        page.wait_for_timeout(1000)

    except Exception as e:
        print(f"\nError occurred: {e}")
        # SCREENSHOT: Error State
        try:
            page.screenshot(path="screenshots/99_error_state.png")
        except:
            pass
        print("Saving collected reviews before exit...")

    finally:
        # Ensure browser always closes
        print("Closing browser...")
        browser.close()

    # Save to JSON
    if all_reviews:
        output_dir = pathlib.Path("BookingOutput")
        output_dir.mkdir(parents=True, exist_ok=True)

        # Convert to dict using asdict for proper serialization
        reviews_data = [asdict(review) for review in all_reviews]

        pathlib.Path("BookingOutput/reviews.json").write_text(
            json.dumps(reviews_data, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        print(f"\n✓ Successfully wrote {len(all_reviews)} reviews to reviews.json")
    else:
        print("\nNo reviews were collected.")
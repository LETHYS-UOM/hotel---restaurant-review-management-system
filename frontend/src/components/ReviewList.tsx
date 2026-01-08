import { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import ReviewDetailModal from "./ReviewDetailModal";
import "./ReviewList.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const ReviewList = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.reviews || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleOpenReview = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <>
      <div className="review-list-container">
      {/* HEADER ROW */}
      <div className="review-header-row">
        <div className="h-col">RATING</div>
        <div className="h-col">REVIEW SNIPPET</div>
        <div className="h-col">SENTIMENT</div>
        <div className="h-col">CATEGORY</div>
        <div className="h-col">SOURCE</div>
        <div className="h-col">DATE</div>
        <div className="h-col">REPLY STATUS</div>
        <div className="h-col">ACTIONS</div>
      </div>

      {/* DATA ROWS */}
      <div className="review-rows">
        {loading && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading reviews...
          </div>
        )}
        
        {error && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#e74c3c' }}>
            Error: {error}
          </div>
        )}
        
        {!loading && !error && reviews.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            No reviews found. Run a scrape to get reviews from Booking.com.
          </div>
        )}
        
        {!loading && !error && reviews.map((review) => (
          <ReviewItem 
            key={review.id} 
            review={review}
            onOpen={() => handleOpenReview(review)}
          />
        ))}
      </div>
    </div>

    {selectedReview && (
      <ReviewDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        review={selectedReview}
      />
    )}
  </>
  );
};

export default ReviewList;

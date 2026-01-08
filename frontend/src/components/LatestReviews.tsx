import { useState } from 'react';
import './LatestReviews.css';
import ReviewDetailModal from './ReviewDetailModal';

const LatestReviews = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = [
    {
      id: 'REV-001',
      reviewerName: 'Sarah Johnson',
      title: 'Exceptional service and beautiful rooms…',
      source: 'Booking',
      sentiment: 'Positive' as const,
      time: '2h ago',
      rating: 5,
      date: 'November 15, 2025 at 05:30 AM',
      reviewText: 'Absolutely wonderful experience! The staff was incredibly friendly and went above and beyond to make our stay memorable. The room was spotless, and the breakfast buffet exceeded all expectations. The location is perfect for exploring the city center.',
      categories: ['Staff', 'Cleanliness', 'Food', 'Location'],
      keyPhrases: ['wonderful experience', 'incredibly friendly', 'spotless', 'perfect location'],
      summary: 'Highly positive review praising staff, cleanliness, food quality, and location. Customer had an exceptional experience.',
      platformReviewId: 'BK-2951273',
      language: 'English',
      replyStatus: 'Replied',
      firstSeen: 'November 15, 2025 at 05:30 AM',
      lastUpdated: 'November 16, 2025 at 05:30 AM',
      scrapedAt: 'November 15, 2025 at 08:52 PM',
      hasReply: 'Yes',
    },
    {
      id: 'REV-002',
      reviewerName: 'Michael Chen',
      title: 'Wi-Fi connection was terrible…',
      source: 'TripAdvisor',
      sentiment: 'Negative' as const,
      time: '9h ago',
      rating: 2,
      date: 'November 14, 2025 at 10:15 PM',
      reviewText: 'Very disappointed with our stay. The room was not cleaned properly before check-in, and we found hair in the bathroom. The Wi-Fi was extremely slow, making it impossible to work.',
      categories: ['Cleanliness', 'WiFi'],
      keyPhrases: ['disappointed', 'not cleaned properly', 'extremely slow'],
      summary: 'Negative review highlighting cleanliness issues and poor WiFi connectivity.',
      platformReviewId: 'TA-8451923',
      language: 'English',
      replyStatus: 'Pending',
      firstSeen: 'November 14, 2025 at 10:15 PM',
      lastUpdated: 'November 14, 2025 at 10:15 PM',
      scrapedAt: 'November 14, 2025 at 11:30 PM',
      hasReply: 'No',
    },
  ];

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <>
      <div className="latest-reviews-card">
        <div className="card-header">
          <h3 className="card-title">Latest Reviews</h3>
          <button className="view-all-btn">View All</button>
        </div>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="review-item"
              onClick={() => handleReviewClick(review)}
              style={{ cursor: 'pointer' }}
            >
              <div className="review-stars">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-text">{review.title}</p>
              <div className="review-meta">
                <span className={`review-badge source`}>{review.source}</span>
                <span className={`review-badge ${review.sentiment.toLowerCase()}`}>
                  {review.sentiment}
                </span>
                <span className="review-time">{review.time}</span>
              </div>
            </div>
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

export default LatestReviews;

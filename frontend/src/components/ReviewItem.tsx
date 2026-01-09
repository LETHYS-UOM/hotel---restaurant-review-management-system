import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import './ReviewItem.css';// We will share one CSS file for the list layout

// Define the shape of a Review Object
interface ReviewProps {
  review: {
    id: number | string;
    rating: number;
    userName: string;
    text: string;
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    categories: string[];
    source: string;
    date: string;
    status: 'Replied' | 'AI Draft' | 'Pending';
  };
  onOpen: () => void;
}

const ReviewItem = ({ review, onOpen }: ReviewProps) => {
  return (
    <div className="review-row">
      
      {/* 1. Rating */}
      <div className="col-rating">
        <span className="rating-num">{review.rating}</span>
        <Star size={14} fill="#fbbf24" color="#fbbf24" /> {/* Gold Star */}
      </div>

      {/* 2. Snippet */}
      <div className="col-snippet">
        <div className="user-name">{review.userName}</div>
        <div className="review-text">{review.text}</div>
      </div>

      {/* 3. Sentiment */}
      <div className="col-sentiment">
        <span className={`sentiment-pill ${review.sentiment.toLowerCase()}`}>
          {review.sentiment}
        </span>
      </div>

      {/* 4. Category */}
      <div className="col-category">
        <div className="category-stack">
          {review.categories.slice(0, 2).map((cat, i) => (
            <span key={i} className="category-pill">{cat}</span>
          ))}
          {review.categories.length > 2 && (
            <span className="category-more">+{review.categories.length - 2}</span>
          )}
        </div>
      </div>

      {/* 5. Source */}
      <div className="col-source">
        <span className="source-pill">{review.source}</span>
      </div>

      {/* 6. Date */}
      <div className="col-date">
        {review.date}
      </div>

      {/* 7. Status */}
      <div className="col-status">
        <span className={`status-pill ${review.status.replace(' ', '-').toLowerCase()}`}>
          {review.status}
        </span>
      </div>

      {/* 8. Actions */}
      <div className="col-actions">
        <button className="open-btn" onClick={onOpen}>
          Open <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default ReviewItem;
import React from 'react';
import './ReviewHeaderBottom.css';

const ReviewsHeaderBottom = () => {
  const filters = [
    "Rating", 
    "Sentiment", 
    "Source", 
    "Category", 
    "Language", 
    "Has AI Reply"
  ];

  return (
    <div className="header-bottom-container">
      
      {/* The Row of Filter Pills */}
      <div className="filter-pills-row">
        {filters.map((filter, index) => (
          <button key={index} className="filter-pill">
            {filter}
          </button>
        ))}
      </div>

      {/* The Review Count Text */}
      <div className="review-count-text">
        Showing <span className="highlight-number">12</span> reviews
      </div>

    </div>
  );
};

export default ReviewsHeaderBottom;
import React from 'react';
import ReviewsHeaderTop from './ReviewHeaderTop';
import ReviewsHeaderBottom from './ReviewHeaderBottom';

interface ReviewsHeaderProps {
  onMenuClick?: () => void;
}

const ReviewsHeader: React.FC<ReviewsHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="reviews-header-wrapper">
      {/* 1. The Top Part (Title, Search, etc) */}
      <ReviewsHeaderTop onMenuClick={onMenuClick} />

      {/* 2. The Bottom Part (Pills, Count) */}
      <ReviewsHeaderBottom />
    </div>
  );
};

export default ReviewsHeader;
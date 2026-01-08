// src/pages/ReviewsPage.tsx
import React from 'react';
import ReviewsHeader from '../components/ReviewHeader';
import ReviewList from '../components/ReviewList';

interface ReviewsPageProps {
  toggleSidebar: () => void;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ toggleSidebar }) => {
  return (
    <div className="page-content">
      <ReviewsHeader onMenuClick={toggleSidebar} />
      <div className="content-area">
        <ReviewList />
      </div>
    </div>
  );
};

export default ReviewsPage;
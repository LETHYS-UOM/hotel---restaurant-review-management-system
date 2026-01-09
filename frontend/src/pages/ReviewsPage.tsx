// src/pages/ReviewsPage.tsx
import React from 'react';
import ReviewsHeader from '../components/ReviewHeader';
import ReviewList from '../components/ReviewList';

const ReviewsPage = () => {
  return (
    <div className="page-content">
      <ReviewsHeader />
      <div className="content-area">
        <ReviewList />
      </div>
    </div>
  );
};

export default ReviewsPage;
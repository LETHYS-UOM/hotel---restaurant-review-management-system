import React from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.css";

const ReviewList = () => {
  // Dummy Data matching your screenshot
  const reviews = [
    {
      id: 1,
      rating: 5,
      userName: "Sarah Johnson",
      text: "Absolutely wonderful experience! The staff was incredibly friendly and went above and beyond...",
      sentiment: "Positive",
      categories: ["Staff", "Cleanliness", "Service"],
      source: "Booking.com",
      date: "Nov 15, 2025",
      status: "Replied",
    },
    {
      id: 2,
      rating: 2,
      userName: "Michael Chen",
      text: "Very disappointed with our stay. The room was not cleaned properly before check-in...",
      sentiment: "Negative",
      categories: ["Cleanliness", "Facilities", "Noise"],
      source: "TripAdvisor",
      date: "Nov 14, 2025",
      status: "AI Draft",
    },
    {
      id: 3,
      rating: 4,
      userName: "Emma Rodriguez",
      text: "Good hotel overall. The location is convenient, close to metro and restaurants...",
      sentiment: "Positive",
      categories: ["Location", "Facilities", "Food"],
      source: "Google Maps",
      date: "Nov 13, 2025",
      status: "Pending",
    },
    {
      id: 4,
      rating: 3,
      userName: "Anonymous",
      text: "Mixed feelings about this place. Pros: Central location, friendly reception staff...",
      sentiment: "Neutral",
      categories: ["Location", "Staff", "Price"],
      source: "Agoda",
      date: "Nov 12, 2025",
      status: "Pending",
    },
  ];

  return (
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
        {reviews.map((review) => (
          // @ts-expect-error: ReviewItem prop types don’t match mock review shape yet (temporary suppression)
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

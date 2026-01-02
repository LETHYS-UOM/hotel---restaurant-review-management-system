import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import ReviewDetailModal from "./ReviewDetailModal";
import "./ReviewList.css";

const ReviewList = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = [
    {
      id: 'REV-001',
      rating: 5,
      userName: 'Sarah Johnson',
      reviewerName: 'Sarah Johnson',
      text: 'Absolutely wonderful experience! The staff was incredibly friendly and went above and beyond...',
      sentiment: 'Positive' as const,
      categories: ['Staff', 'Cleanliness'],
      source: 'Booking.com',
      date: 'Nov 15, 2025',
      status: 'Replied' as const,
      reviewText: 'Absolutely wonderful experience! The staff was incredibly friendly and went above and beyond to make our stay memorable. The room was spotless, and the breakfast buffet exceeded all expectations. The location is perfect for exploring the city center.',
      keyPhrases: ['wonderful experience', 'incredibly friendly', 'spotless', 'perfect location'],
      summary: 'Highly positive review praising staff, cleanliness, food quality, and location. Customer had an exceptional experience.',
      platformReviewId: 'BK-2951273',
      language: 'English',
      replyStatus: 'Replied',
      firstSeen: 'November 15, 2025 at 05:30 AM',
      lastUpdated: 'November 16, 2025 at 05:30 AM',
      scrapedAt: 'November 15, 2025 at 08:52 PM',
      hasReply: 'Yes',
      images: [
        { id: 1, url: '', alt: 'Hotel room view' },
        { id: 2, url: '', alt: 'Breakfast buffet' },
        { id: 3, url: '', alt: 'Hotel lobby' },
      ],
    },
    {
      id: 'REV-002',
      rating: 2,
      userName: 'Michael Chen',
      reviewerName: 'Michael Chen',
      text: 'Very disappointed with our stay. The room was not cleaned properly before check-in...',
      sentiment: 'Negative' as const,
      categories: ['Cleanliness', 'Facilities'],
      source: 'TripAdvisor',
      date: 'Nov 14, 2025',
      status: 'AI Draft' as const,
      reviewText: 'Very disappointed with our stay. The room was not cleaned properly before check-in, and we found hair in the bathroom. The Wi-Fi was extremely slow, making it impossible to work.',
      keyPhrases: ['disappointed', 'not cleaned properly', 'extremely slow'],
      summary: 'Negative review highlighting cleanliness issues and poor WiFi connectivity.',
      platformReviewId: 'TA-8451923',
      language: 'English',
      replyStatus: 'Pending',
      firstSeen: 'November 14, 2025 at 10:15 PM',
      lastUpdated: 'November 14, 2025 at 10:15 PM',
      scrapedAt: 'November 14, 2025 at 11:30 PM',
      hasReply: 'No',
      images: [
        { id: 1, url: '', alt: 'Room issue 1' },
        { id: 2, url: '', alt: 'Room issue 2' },
      ],
    },
    {
      id: 'REV-003',
      rating: 4,
      userName: 'Emma Rodriguez',
      reviewerName: 'Emma Rodriguez',
      text: 'Good hotel overall. The location is convenient, close to metro and restaurants...',
      sentiment: 'Positive' as const,
      categories: ['Location', 'Facilities'],
      source: 'Google Maps',
      date: 'Nov 13, 2025',
      status: 'Pending' as const,
      reviewText: 'Good hotel overall. The location is convenient, close to metro and restaurants. Room was comfortable and clean. Staff was helpful.',
      keyPhrases: ['convenient', 'comfortable', 'helpful staff'],
      summary: 'Positive review emphasizing great location and comfortable accommodations.',
      platformReviewId: 'GM-7391234',
      language: 'English',
      replyStatus: 'Pending',
      firstSeen: 'November 13, 2025 at 02:20 PM',
      lastUpdated: 'November 13, 2025 at 02:20 PM',
      scrapedAt: 'November 13, 2025 at 03:45 PM',
      hasReply: 'No',
    },
    {
      id: 'REV-004',
      rating: 3,
      userName: 'Anonymous',
      reviewerName: 'Anonymous',
      text: 'Mixed feelings about this place. Pros: Central location, friendly reception staff...',
      sentiment: 'Neutral' as const,
      categories: ['Location', 'Staff'],
      source: 'Agoda',
      date: 'Nov 12, 2025',
      status: 'Pending' as const,
      reviewText: 'Mixed feelings about this place. Pros: Central location, friendly reception staff. Cons: Room was smaller than expected, noise from the street at night.',
      keyPhrases: ['central location', 'friendly staff', 'smaller than expected', 'noisy'],
      summary: 'Neutral review with both positive aspects (location, staff) and negative points (room size, noise).',
      platformReviewId: 'AG-5612847',
      language: 'English',
      replyStatus: 'Pending',
      firstSeen: 'November 12, 2025 at 08:10 AM',
      lastUpdated: 'November 12, 2025 at 08:10 AM',
      scrapedAt: 'November 12, 2025 at 09:30 AM',
      hasReply: 'No',
    },
  ];

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
        {reviews.map((review) => (
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

import { X, Image as ImageIcon } from 'lucide-react';
import './ReviewDetailModal.css';

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    id: number | string;
    userName?: string;
    rating: number;
    date: string;
    text?: string;
    sentiment: string;
    categories: string[];
    source?: string;
    status?: string;
    // Optional fields from detailed data
    reviewerName?: string;
    reviewText?: string;
    keyPhrases?: string[];
    summary?: string;
    platformReviewId?: string;
    language?: string;
    replyStatus?: string;
    firstSeen?: string;
    lastUpdated?: string;
    scrapedAt?: string;
    hasReply?: string;
    images?: { id: number; url: string; alt: string; }[];
  };
}

const ReviewDetailModal = ({ isOpen, onClose, review }: ReviewDetailModalProps) => {
  if (!isOpen || !review) return null;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return '#10b981';
      case 'Negative':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Use available fields with fallbacks
  const displayName = review.reviewerName || review.userName || 'Anonymous';
  const displayText = review.reviewText || review.text || 'No review text available';
  const displayRating = Math.min(5, Math.max(0, Math.round(review.rating || 0)));

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="review-modal-header">
          <div className="review-modal-title">
            <h2>{displayName}</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="review-rating-date">
            <div className="stars">
              {'★'.repeat(displayRating)}{'☆'.repeat(5 - displayRating)}
            </div>
            <span className="review-date">{review.date || 'N/A'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="review-modal-content">
          {/* Review Text */}
          <div className="review-section">
            <h3 className="section-label">Review</h3>
            <p className="review-text">{displayText}</p>
          </div>

          {/* Review Images */}
          {review.images && review.images.length > 0 && (
            <div className="review-section">
              <h3 className="section-label">Images</h3>
              <div className="review-images-grid">
                {review.images.map((image) => (
                  <div key={image.id} className="review-image-item">
                    {image.url ? (
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="review-image"
                      />
                    ) : (
                      <div className="review-image-placeholder">
                        <ImageIcon size={24} className="placeholder-icon" />
                        <span className="placeholder-text">Image {image.id}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div className="review-section">
            <h3 className="section-label">AI Analysis</h3>
            
            <div className="analysis-item">
              <span className="analysis-label">Sentiment</span>
              <span 
                className="sentiment-badge" 
                style={{ 
                  backgroundColor: getSentimentColor(review.sentiment),
                  color: 'white'
                }}
              >
                {review.sentiment}
              </span>
            </div>

            {review.categories && review.categories.length > 0 && (
              <div className="analysis-item">
                <span className="analysis-label">Categories</span>
                <div className="categories-badges">
                  {review.categories.map((category, index) => (
                    <span key={index} className="category-badge">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {review.keyPhrases && review.keyPhrases.length > 0 && (
              <div className="analysis-item">
                <span className="analysis-label">Key Phrases</span>
                <div className="key-phrases">
                  {review.keyPhrases.map((phrase, index) => (
                    <span key={index} className="key-phrase">"{phrase}"</span>
                  ))}
                </div>
              </div>
            )}

            {review.summary && (
              <div className="analysis-item">
                <span className="analysis-label">Summary</span>
                <p className="summary-text">{review.summary}</p>
              </div>
            )}
          </div>

          {/* AI Reply Generator */}
          <div className="review-section">
            <h3 className="section-label">AI Reply Generator</h3>
            <div className="reply-generator">
              <textarea 
                className="reply-textarea"
                placeholder="AI generated response will appear here..."
                rows={4}
              />
              <div className="reply-actions">
                <button className="action-btn">
                  <span>🔄</span> Regenerate Reply
                </button>
                <button className="action-btn">
                  <span>✨</span> Improve Tone
                </button>
                <button className="action-btn">
                  <span>✂️</span> Shorten
                </button>
                <button className="action-btn">
                  <span>📋</span> Copy Reply
                </button>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="review-section">
            <h3 className="section-label">Metadata</h3>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Review ID</span>
                <span className="metadata-value">{review.id}</span>
              </div>
              {review.source && (
                <div className="metadata-item">
                  <span className="metadata-label">Source</span>
                  <span className="metadata-value">{review.source}</span>
                </div>
              )}
              {review.platformReviewId && (
                <div className="metadata-item">
                  <span className="metadata-label">Platform Review ID</span>
                  <span className="metadata-value">{review.platformReviewId}</span>
                </div>
              )}
              {review.language && (
                <div className="metadata-item">
                  <span className="metadata-label">Language</span>
                  <span className="metadata-value">{review.language}</span>
                </div>
              )}
              {(review.replyStatus || review.status) && (
                <div className="metadata-item">
                  <span className="metadata-label">Reply Status</span>
                  <span className="metadata-value">{review.replyStatus || review.status}</span>
                </div>
              )}
              {review.firstSeen && (
                <div className="metadata-item">
                  <span className="metadata-label">First Seen</span>
                  <span className="metadata-value">{review.firstSeen}</span>
                </div>
              )}
              {review.lastUpdated && (
                <div className="metadata-item">
                  <span className="metadata-label">Last Updated</span>
                  <span className="metadata-value">{review.lastUpdated}</span>
                </div>
              )}
              {review.scrapedAt && (
                <div className="metadata-item">
                  <span className="metadata-label">Scraped At</span>
                  <span className="metadata-value">{review.scrapedAt}</span>
                </div>
              )}
              {review.hasReply && (
                <div className="metadata-item">
                  <span className="metadata-label">Has AI Reply</span>
                  <span className="metadata-value">{review.hasReply}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="review-modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary">Mark as Replied</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailModal;

import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './ReviewImageGallery.css';

const ReviewImageGallery = () => {
  // Placeholder images - will be replaced with backend data
  const placeholderImages = [
    { id: 1, url: '', alt: 'Review image 1' },
    { id: 2, url: '', alt: 'Review image 2' },
    { id: 3, url: '', alt: 'Review image 3' },
    { id: 4, url: '', alt: 'Review image 4' },
    { id: 5, url: '', alt: 'Review image 5' },
  ];

  return (
    <div className="review-image-gallery">
      <div className="gallery-header">
        <h3 className="gallery-title">Recent Review Images</h3>
        <span className="gallery-count">{placeholderImages.length} images</span>
      </div>
      
      <div className="gallery-grid">
        {placeholderImages.map((image) => (
          <div key={image.id} className="gallery-item">
            {image.url ? (
              <img 
                src={image.url} 
                alt={image.alt}
                className="gallery-image"
              />
            ) : (
              <div className="gallery-placeholder">
                <ImageIcon size={32} className="placeholder-icon" />
                <span className="placeholder-text">Image {image.id}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewImageGallery;

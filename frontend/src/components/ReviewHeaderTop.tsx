import React from "react";
import { Search, Calendar, Download } from "lucide-react";
import "./ReviewHeaderTop.css";

const ReviewsHeader = () => {
  return (
    <div className="reviews-header">
      {/* ROW 1: Title and Top Actions */}
      <div className="header-top-row">
        <h1 className="page-title">Reviews</h1>
        
        <div className="top-actions">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="search-input"
            />
          </div>

          <button className="filter-btn">Filters</button>
        </div>

        <div className="header-actions">
          <button className="action-btn">
            <Calendar size={16} className="btn-icon" />
            <span>Select date range</span>
          </button>
          <button className="action-btn">
            <Download size={16} className="btn-icon" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsHeader;

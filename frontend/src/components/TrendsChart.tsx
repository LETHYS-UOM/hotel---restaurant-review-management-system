import './TrendsChart.css';

const TrendsChart = () => {
  return (
    <div className="trends-chart-card">
      <div className="card-header">
        <h3 className="card-title">Review Trends</h3>
        <div className="chart-legend-inline">
          <div className="legend-dot-item">
            <span className="chart-dot review-count"></span>
            <span>Review Count</span>
          </div>
          <div className="legend-dot-item">
            <span className="chart-dot sentiment-score"></span>
            <span>Sentiment Score</span>
          </div>
        </div>
      </div>

      <div className="trends-chart">
        <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="chart-svg">
          {/* Background grid lines */}
          <line x1="0" y1="50" x2="600" y2="50" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="0" y1="100" x2="600" y2="100" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="0" y1="150" x2="600" y2="150" stroke="#f3f4f6" strokeWidth="1" />

          {/* Review Count Line (dotted gray) */}
          <polyline
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="4,4"
            points="0,120 100,115 200,125 300,118 400,122 500,120 600,118"
          />

          {/* Sentiment Score Line (solid blue) */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points="0,140 100,135 200,125 300,115 400,105 500,95 600,85"
          />
        </svg>
      </div>

      <div className="chart-months">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>
  );
};

export default TrendsChart;

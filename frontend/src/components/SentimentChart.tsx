import './SentimentChart.css';

const SentimentChart = () => {
  return (
    <div className="sentiment-chart-card">
      <div className="card-header">
        <h3 className="card-title">Sentiment Distribution</h3>
      </div>

      <div className="sentiment-content">
        <div className="donut-chart">
          <svg viewBox="0 0 200 200" className="donut-svg">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="30"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="30"
              strokeDasharray="340 163"
              strokeDashoffset="25"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="30"
              strokeDasharray="100 403"
              strokeDashoffset="-315"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#4b5563"
              strokeWidth="30"
              strokeDasharray="60 443"
              strokeDashoffset="-415"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="donut-center-text">
            <p className="donut-percentage">68%</p>
            <p className="donut-label">Positive</p>
          </div>
        </div>

        <div className="sentiment-legend">
          <div className="legend-item">
            <span className="legend-dot positive"></span>
            <span className="legend-text">Positive</span>
            <span className="legend-percent">68%</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot neutral"></span>
            <span className="legend-text">Neutral</span>
            <span className="legend-percent">20%</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot negative"></span>
            <span className="legend-text">Negative</span>
            <span className="legend-percent">12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;

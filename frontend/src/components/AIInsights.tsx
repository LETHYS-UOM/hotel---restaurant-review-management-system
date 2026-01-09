import './AIInsights.css';

const AIInsights = () => {
  return (
    <div className="ai-insights-card">
      <div className="card-header">
        <h3 className="card-title">AI Insights</h3>
        <button className="view-btn">View</button>
      </div>

      <div className="insights-content">
        <div className="insight-column">
          <h4 className="insight-heading">What Customers Liked</h4>
          <ul className="insight-list positive">
            <li>Exceptional staff service</li>
            <li>Prime beach location</li>
            <li>Clean, spacious rooms</li>
          </ul>
        </div>

        <div className="insight-column">
          <h4 className="insight-heading">Common Complaints</h4>
          <ul className="insight-list negative">
            <li>Slow Wi-Fi connection</li>
            <li>Limited breakfast options</li>
            <li>Noisy air conditioning</li>
          </ul>
        </div>
      </div>

      <div className="insight-highlight">
        Wi-Fi mentioned in 34% of negative reviews
      </div>
    </div>
  );
};

export default AIInsights;

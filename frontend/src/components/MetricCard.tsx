import './MetricCard.css';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
}

const MetricCard = ({ icon, label, value, change, changeType = 'neutral' }: MetricCardProps) => {
  return (
    <div className="metric-card">
      <div className="metric-icon-wrapper">{icon}</div>
      <div className="metric-content">
        <p className="metric-label">{label}</p>
        <div className="metric-bottom">
          <span className="metric-value">{value}</span>
          {change && (
            <span className={`metric-change ${changeType}`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;

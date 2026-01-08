import './ReviewSources.css';

const ReviewSources = () => {
  const sources = [
    { name: 'Booking', percentage: 42, color: '#3b82f6' },
    { name: 'TripAdvisor', percentage: 28, color: '#8b5cf6' },
    { name: 'Google', percentage: 20, color: '#1f2937' },
    { name: 'Other', percentage: 10, color: '#9ca3af' },
  ];

  // Create SVG path for donut segments
  const createDonutPath = (percentage: number, startAngle: number) => {
    const radius = 90;
    const innerRadius = 50;
    const cx = 100;
    const cy = 100;
    
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = cx + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = cy + radius * Math.sin((Math.PI * endAngle) / 180);
    
    const ix1 = cx + innerRadius * Math.cos((Math.PI * startAngle) / 180);
    const iy1 = cy + innerRadius * Math.sin((Math.PI * startAngle) / 180);
    const ix2 = cx + innerRadius * Math.cos((Math.PI * endAngle) / 180);
    const iy2 = cy + innerRadius * Math.sin((Math.PI * endAngle) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${ix2} ${iy2}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1}
      Z
    `;
  };

  let currentAngle = -90; // Start from top

  return (
    <div className="review-sources-card">
      <div className="card-header">
        <h3 className="card-title">Review Sources</h3>
      </div>

      <div className="sources-content">
        <div className="pie-chart">
          <svg viewBox="0 0 200 200" className="pie-svg">
            {sources.map((source, index) => {
              const path = createDonutPath(source.percentage, currentAngle);
              const segmentAngle = currentAngle;
              currentAngle += (source.percentage / 100) * 360;
              
              return (
                <path
                  key={source.name}
                  d={path}
                  fill={source.color}
                />
              );
            })}
          </svg>
        </div>

        <div className="sources-legend">
          {sources.map((source) => (
            <div key={source.name} className="source-item">
              <span
                className="source-color"
                style={{ backgroundColor: source.color }}
              ></span>
              <span className="source-name">{source.name}</span>
              <span className="source-percentage">{source.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSources;
  
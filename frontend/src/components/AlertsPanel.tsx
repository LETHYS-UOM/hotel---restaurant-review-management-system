import './AlertsPanel.css';

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      message: 'Spike in negative reviews today (+15)',
      type: 'critical',
    },
    {
      id: 2,
      message: 'Booking.com sync failed',
      type: 'warning',
    },
  ];

  return (
    <div className="alerts-panel-card">
      <div className="card-header">
        <h3 className="card-title">Alerts</h3>
        <button className="view-all-btn">View All</button>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-item ${alert.type}`}>
            <span className="alert-dot"></span>
            <p className="alert-message">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;

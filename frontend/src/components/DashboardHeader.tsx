import { Bell, CalendarDays } from 'lucide-react';
import './DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="hotel-title">Grand Plaza Hotel</h1>
        <p className="hotel-subtitle">Review Management Dashboard</p>
      </div>

      <div className="header-right">
        <button className="date-selector">
          <CalendarDays size={16} />
          <span>Last 30 Days</span>
        </button>
        <button className="notification-btn">
          <Bell size={18} />
        </button>
        <div className="user-avatar">L</div>
      </div>
    </header>
  );
};

export default DashboardHeader;

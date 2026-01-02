import { Bell, CalendarDays, Menu } from 'lucide-react';
import './DashboardHeader.css';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div>
          <h1 className="hotel-title">Grand Plaza Hotel</h1>
          <p className="hotel-subtitle">Review Management Dashboard</p>
        </div>
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

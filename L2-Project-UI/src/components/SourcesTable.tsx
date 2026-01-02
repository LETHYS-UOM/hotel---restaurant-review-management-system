import React from 'react';
import { Play, Edit2, Trash2 } from 'lucide-react';
import './SourcesTable.css';

interface Source {
  id: number;
  platform: string;
  status: 'Active' | 'Paused';
  lastSynced: string;
  schedule: string;
}

interface SourcesTableProps {
  sources: Source[];
  onEditSource: (source: Source) => void;
}

const SourcesTable = ({ sources, onEditSource }: SourcesTableProps) => {
  return (
    <div className="sources-table-container">
      <table className="sources-table">
        <thead>
          <tr>
            <th>Source Platform</th>
            <th>Status</th>
            <th>Last Synced</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id}>
              <td className="platform-cell">{source.platform}</td>
              <td>
                <span className={`status-badge ${source.status.toLowerCase()}`}>
                  {source.status}
                </span>
              </td>
              <td className="synced-cell">{source.lastSynced}</td>
              <td className="schedule-cell">{source.schedule}</td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn run-btn">
                    <Play size={14} />
                    Run Now
                  </button>
                  <button 
                    className="icon-btn edit-btn" 
                    title="Edit"
                    onClick={() => onEditSource(source)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-btn delete-btn" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SourcesTable;

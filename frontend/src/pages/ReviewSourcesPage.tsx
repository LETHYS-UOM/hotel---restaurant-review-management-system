import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SourcesTable from '../components/SourcesTable';
import AddSourceModal from '../components/AddSourceModal';
import EditSourceModal from '../components/EditSourceModal';

const styles = {
  sourcesPage: {
    padding: '32px 40px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },
  sourcesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  headerContent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  pageSubtitle: {
    fontSize: '15px',
    color: '#6b7280',
    margin: 0,
  },
  addSourceBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

const ReviewSourcesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [sources, setSources] = useState([
    {
      id: 1,
      platform: 'TripAdvisor',
      status: 'Active' as const,
      lastSynced: '2 minutes ago',
      schedule: 'Hourly',
    },
    {
      id: 2,
      platform: 'Booking.com',
      status: 'Active' as const,
      lastSynced: '15 minutes ago',
      schedule: 'Daily',
    },
    {
      id: 3,
      platform: 'Google Reviews',
      status: 'Paused' as const,
      lastSynced: '2 hours ago',
      schedule: 'Hourly',
    },
    {
      id: 4,
      platform: 'Airbnb',
      status: 'Active' as const,
      lastSynced: '5 minutes ago',
      schedule: 'Daily',
    },
    {
      id: 5,
      platform: 'TripAdvisor',
      status: 'Active' as const,
      lastSynced: '1 hour ago',
      schedule: 'Daily',
    },
    {
      id: 6,
      platform: 'Booking.com',
      status: 'Active' as const,
      lastSynced: '30 minutes ago',
      schedule: 'Hourly',
    },
    {
      id: 7,
      platform: 'Google Reviews',
      status: 'Active' as const,
      lastSynced: '10 minutes ago',
      schedule: 'Hourly',
    },
    {
      id: 8,
      platform: 'Airbnb',
      status: 'Paused' as const,
      lastSynced: '3 hours ago',
      schedule: 'Daily',
    },
  ]);

  const handleEditSource = (source: typeof sources[0]) => {
    setSelectedSource(source);
    setIsEditModalOpen(true);
  };

  const handleSaveSource = (updatedSource: any) => {
    setSources(sources.map(s => 
      s.id === updatedSource.id ? updatedSource : s
    ));
  };

  return (
    <div style={styles.sourcesPage}>
      {/* Header */}
      <div style={styles.sourcesHeader}>
        <div style={styles.headerContent}>
          <h1 style={styles.pageTitle}>Review Sources</h1>
          <p style={styles.pageSubtitle}>Manage your connected review platforms</p>
        </div>
        <button 
          style={styles.addSourceBtn}
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          <Plus size={18} />
          Add Source
        </button>
      </div>

      {/* Sources Table */}
      <SourcesTable sources={sources} onEditSource={handleEditSource} />

      {/* Add Source Modal */}
      <AddSourceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Edit Source Modal */}
      <EditSourceModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSource(null);
        }}
        source={selectedSource}
        onSave={handleSaveSource}
      />
    </div>
  );
};

export default ReviewSourcesPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';
import SetupLayout from '../components/SetupLayout';

const SetupPage = () => {
  const [organizationType, setOrganizationType] = useState<'hotel' | 'restaurant' | 'other'>('hotel');
  const [organizationName, setOrganizationName] = useState('');
  const [groupInviteLink, setGroupInviteLink] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    // Validate Step 1
    if (!organizationName.trim()) {
      alert('Please enter an organization name');
      return;
    }
    navigate('/setup/sources');
  };

  const styles = {
    pageWrapper: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      overflow: 'auto',
      backgroundColor: '#f3f4f6',
    },
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    header: {
      padding: '20px 40px',
      backgroundColor: '#2c3e50',
      color: '#9ca3af',
      fontSize: '16px',
      fontWeight: 500,
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      padding: '40px 20px 30px',
      backgroundColor: 'white',
    },
    step: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
      gap: '8px',
      flex: 1,
      maxWidth: '200px',
    },
    stepLabel: (active: boolean) => ({
      fontSize: '13px',
      color: active ? '#1f2937' : '#9ca3af',
      fontWeight: active ? 600 : 400,
      whiteSpace: 'nowrap' as const,
    }),
    stepNumber: {
      fontSize: '13px',
      color: '#9ca3af',
      marginBottom: '2px',
    },
    stepIndicator: (active: boolean) => ({
      width: '100%',
      height: '3px',
      backgroundColor: active ? '#1f2937' : '#e5e7eb',
      borderRadius: '2px',
      marginTop: '4px',
    }),
    mainCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '50px 60px',
      maxWidth: '800px',
      margin: '40px auto',
      width: '90%',
    },
    title: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#1f2937',
      textAlign: 'center' as const,
      marginBottom: '40px',
    },
    sectionLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '12px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
    },
    typeButton: (selected: boolean) => ({
      flex: 1,
      padding: '10px 20px',
      border: 'none',
      borderRadius: '50px',
      fontSize: '13px',
      fontWeight: 500,
      cursor: 'pointer',
      backgroundColor: selected ? '#374151' : '#f3f4f6',
      color: selected ? 'white' : '#9ca3af',
      transition: 'all 0.2s',
    }),
    inputWrapper: {
      position: 'relative' as const,
      marginBottom: '24px',
    },
    icon: {
      position: 'absolute' as const,
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#d1d5db',
      width: '18px',
      height: '18px',
    },
    input: {
      width: '100%',
      padding: '12px 14px 12px 44px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '13px',
      outline: 'none',
      backgroundColor: '#ffffff',
      color: '#6b7280',
      transition: 'border-color 0.2s',
    },
  };

  return (
    <SetupLayout currentStep={1} onContinue={handleContinue} showBack={false}>
      <h1 style={styles.title}>Let's Set Up your Hotel or Restaurant</h1>

      <div style={{ marginBottom: '30px' }}>
        <div style={styles.sectionLabel}>Organization Type</div>
        <div style={styles.buttonGroup}>
          <button
            style={styles.typeButton(organizationType === 'hotel')}
            onClick={() => setOrganizationType('hotel')}
          >
            Hotel
          </button>
          <button
            style={styles.typeButton(organizationType === 'restaurant')}
            onClick={() => setOrganizationType('restaurant')}
          >
            Restaurant
          </button>
          <button
            style={styles.typeButton(organizationType === 'other')}
            onClick={() => setOrganizationType('other')}
          >
            Other
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={styles.sectionLabel}>Organization Name</div>
        <div style={styles.inputWrapper}>
          <Building2 style={styles.icon} />
          <input
            type="text"
            placeholder="e.g. Ocean Bay Hotel"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <div>
        <div style={styles.sectionLabel}>Group Assignment</div>
        <div style={styles.inputWrapper}>
          <Users style={styles.icon} />
          <input
            type="text"
            placeholder="enter group invite link"
            value={groupInviteLink}
            onChange={(e) => setGroupInviteLink(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>
    </SetupLayout>
  );
};

export default SetupPage;

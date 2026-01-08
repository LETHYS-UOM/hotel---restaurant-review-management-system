import React from 'react';

interface SetupLayoutProps {
  currentStep: number;
  children: React.ReactNode;
  onContinue?: () => void;
  onBack?: () => void;
  showContinue?: boolean;
  showBack?: boolean;
}

const SetupLayout: React.FC<SetupLayoutProps> = ({
  currentStep,
  children,
  onContinue,
  onBack,
  showContinue = true,
  showBack = true,
}) => {
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
    continueButton: {
      width: '100%',
      maxWidth: '280px',
      margin: '30px auto 0',
      display: 'block',
      padding: '12px 32px',
      backgroundColor: '#1d9bf0',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    backButton: {
      marginTop: '20px',
      padding: '10px 24px',
      backgroundColor: 'transparent',
      color: '#6b7280',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.stepsContainer}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>Step 1:</div>
            <div style={styles.stepLabel(currentStep === 1)}>Add Organization</div>
            <div style={styles.stepIndicator(currentStep >= 1)} />
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>Step 2:</div>
            <div style={styles.stepLabel(currentStep === 2)}>Add Sources</div>
            <div style={styles.stepIndicator(currentStep >= 2)} />
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>Step 3:</div>
            <div style={styles.stepLabel(currentStep === 3)}>Choose Schedule</div>
            <div style={styles.stepIndicator(currentStep >= 3)} />
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>Step 4:</div>
            <div style={styles.stepLabel(currentStep === 4)}>Finish Setup</div>
            <div style={styles.stepIndicator(currentStep >= 4)} />
          </div>
        </div>

        <div style={styles.mainCard}>
          {children}

          <div style={{ textAlign: 'center' }}>
            {showContinue && onContinue && (
              <button
                onClick={onContinue}
                style={styles.continueButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a8cd8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d9bf0';
                }}
              >
                Continue
              </button>
            )}

            {showBack && currentStep > 1 && onBack && (
              <button
                onClick={onBack}
                style={styles.backButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupLayout;

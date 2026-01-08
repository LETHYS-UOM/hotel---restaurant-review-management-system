import React, { useState } from 'react';
import { Rocket, Link2, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import './ScrapeLauncher.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

type Status = 'idle' | 'running' | 'success' | 'error';

const ScrapeLauncher: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('Provide a Booking.com reviews link and launch the scraper.');
  const [headless, setHeadless] = useState(true);

  const startScrape = async () => {
    const trimmed = url.trim();
    if (!trimmed.startsWith('http')) {
      setStatus('error');
      setMessage('Please paste a full Booking.com reviews URL.');
      return;
    }

    setStatus('running');
    setMessage('Starting scrape…');

    try {
      const response = await fetch(`${API_BASE}/scrape/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed, headless }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to start scrape');
      }

      const data = await response.json();
      setStatus('success');
      setMessage(data.message || 'Scrape started. Check backend logs for progress.');
    } catch (err) {
      const fallback = err instanceof Error ? err.message : 'Failed to start scrape';
      setStatus('error');
      setMessage(fallback);
    }
  };

  const renderStatusIcon = () => {
    if (status === 'running') return <Loader2 size={16} className="spin" />;
    if (status === 'success') return <CheckCircle2 size={16} />;
    if (status === 'error') return <AlertTriangle size={16} />;
    return null;
  };

  return (
    <div className="scrape-card">
      <div className="scrape-card__header">
        <div className="scrape-card__title">
          <Rocket size={18} />
          <div>
            <h3>Booking.com Scraper</h3>
            <p>Trigger the Playwright scraper directly from the dashboard.</p>
          </div>
        </div>
        <div className={`status-chip status-${status}`}>
          {renderStatusIcon()}
          <span>
            {status === 'idle' && 'Idle'}
            {status === 'running' && 'Running'}
            {status === 'success' && 'Started'}
            {status === 'error' && 'Error'}
          </span>
        </div>
      </div>

      <label className="scrape-card__label">Booking reviews URL</label>
      <div className="scrape-card__input-row">
        <Link2 size={16} />
        <input
          type="url"
          placeholder="https://www.booking.com/hotel/.../reviews.html"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') startScrape();
          }}
        />
        <button
          className="primary-btn"
          disabled={status === 'running'}
          onClick={startScrape}
        >
          {status === 'running' ? (
            <>
              <Loader2 size={16} className="spin" />
              <span>Launching…</span>
            </>
          ) : (
            <>
              <Rocket size={16} />
              <span>Start</span>
            </>
          )}
        </button>
      </div>

      <div className="scrape-card__footer">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={!headless}
            onChange={(e) => setHeadless(!e.target.checked)}
          />
          <span>Show browser window (debug)</span>
        </label>
        <p className={`message message-${status}`}>{message}</p>
      </div>
    </div>
  );
};

export default ScrapeLauncher;

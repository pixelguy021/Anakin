'use client';

import { useEffect, useRef, useState } from 'react';
import { HARVEST_FEED, type HarvestEvent } from '@/lib/harvest-stream';
import styles from './HarvestConsole.module.css';

const TYPE_COLORS: Record<string, string> = {
  marketplace: 'var(--brand-primary)',
  review: 'var(--brand-accent)',
  social: 'var(--brand-secondary)',
  support: 'var(--brand-success)',
  tld: 'var(--brand-warm)',
};

const FLAG: Record<string, string> = {
  ID: '🇮🇩', MY: '🇲🇾', TH: '🇹🇭', VN: '🇻🇳', PH: '🇵🇭',
  SG: '🇸🇬', JP: '🇯🇵', KR: '🇰🇷', CN: '🇨🇳', IN: '🇮🇳',
  BD: '🇧🇩', DE: '🇩🇪', FR: '🇫🇷', SA: '🇸🇦', MX: '🇲🇽',
  BR: '🇧🇷', KE: '🇰🇪',
};

function formatBytes(b: number) {
  if (b === 0) return '—';
  if (b > 1000000) return `${(b / 1000000).toFixed(1)} MB`;
  return `${Math.round(b / 1000)} KB`;
}

function timeAgo(ts: string) {
  const sec = Math.round((Date.now() - new Date(ts).getTime()) / 1000);
  if (sec < 5) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  return `${Math.round(sec / 60)}m ago`;
}

export default function HarvestConsole() {
  const [events, setEvents] = useState<HarvestEvent[]>([]);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const bottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  // Simulate live incoming events
  useEffect(() => {
    const initial = HARVEST_FEED.slice().reverse();
    setEvents(initial);

    // Continuously add new simulated events
    const sources = HARVEST_FEED.filter(h => h.status === 'done');
    const interval = setInterval(() => {
      if (paused) return;
      const base = sources[counterRef.current % sources.length];
      counterRef.current++;
      const newEvent: HarvestEvent = {
        ...base,
        id: `live-${Date.now()}`,
        timestamp: new Date().toISOString(),
        phrasesFound: Math.floor(Math.random() * 60) + 15,
        quality: Math.floor(Math.random() * 15) + 82,
        status: 'done',
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 80));
    }, 3500);

    return () => clearInterval(interval);
  }, [paused]);

  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);
  const live = events.filter(e => e.status !== 'done').length;

  return (
    <div className={styles.console}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.liveIndicator}>
          <span className="dot dot-live" />
          <span className={styles.liveLabel}>LIVE</span>
          {live > 0 && <span className="badge badge-warning" style={{ marginLeft: 4 }}>{live} reading</span>}
        </div>

        <div className={styles.filters}>
          {['all', 'marketplace', 'social', 'review', 'support', 'tld'].map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
              id={`harvest-filter-${f}`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          className={styles.pauseBtn}
          onClick={() => setPaused(!paused)}
          id="harvest-pause-btn"
        >
          {paused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>

      {/* Console rows */}
      <div className={styles.feed}>
        {filtered.map(event => (
          <div
            key={event.id}
            className={`${styles.row} ${event.status !== 'done' ? styles.rowActive : ''}`}
          >
            {/* Status */}
            <div className={styles.statusCol}>
              {event.status === 'reading' && <span className={styles.spinner}>⟳</span>}
              {event.status === 'extracting' && <span className={styles.extracting}>◈</span>}
              {event.status === 'done' && <span className={styles.done}>✓</span>}
              {event.status === 'error' && <span className={styles.error}>✗</span>}
            </div>

            {/* Flag + lang */}
            <div className={styles.langCol}>
              <span className={styles.flag}>{FLAG[event.countryCode] || '🌐'}</span>
              <span className={styles.langCode}>{event.langCode}</span>
            </div>

            {/* Site */}
            <div className={styles.siteCol}>
              <span
                className={styles.siteType}
                style={{ background: `${TYPE_COLORS[event.type]}20`, color: TYPE_COLORS[event.type] }}
              >
                {event.type}
              </span>
              <span className={styles.siteName}>{event.siteName}</span>
            </div>

            {/* URL */}
            <div className={styles.urlCol}>
              <span className={styles.url}>{event.url}</span>
            </div>

            {/* Phrase found */}
            {event.status === 'done' && event.topPhrase && (
              <div className={styles.phraseCol}>
                <span className={styles.phrase}>{event.topPhrase}</span>
                <span className={styles.phraseTranslation}>→ {event.topPhraseTranslation}</span>
              </div>
            )}
            {event.status === 'reading' && (
              <div className={styles.phraseCol}>
                <span className={styles.loading}>reading page content...</span>
              </div>
            )}
            {event.status === 'extracting' && (
              <div className={styles.phraseCol}>
                <span className={styles.loading}>extracting phrases...</span>
              </div>
            )}

            {/* Stats */}
            <div className={styles.statsCol}>
              {event.status === 'done' && (
                <>
                  <span className={styles.statBadge}>+{event.phrasesFound} phrases</span>
                  <span className={styles.quality} style={{
                    color: event.quality > 90 ? 'var(--brand-success)' : event.quality > 80 ? 'var(--brand-warm)' : 'var(--brand-danger)'
                  }}>Q:{event.quality}</span>
                </>
              )}
            </div>

            {/* Time + size */}
            <div className={styles.metaCol}>
              <span className={styles.time}>{timeAgo(event.timestamp)}</span>
              <span className={styles.bytes}>{formatBytes(event.bytes)}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

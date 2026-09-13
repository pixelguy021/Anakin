'use client';

import { useState } from 'react';
import { LOCALE_CORPUS, type LocaleEntry } from '@/lib/locale-data';
import styles from './LocaleMap.module.css';

const REGION_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  SEA: { x: 72, y: 58, label: 'Southeast Asia' },
  EA:  { x: 78, y: 40, label: 'East Asia' },
  SA:  { x: 62, y: 48, label: 'South Asia' },
  EU:  { x: 48, y: 28, label: 'Europe' },
  MENA:{ x: 54, y: 43, label: 'Middle East & N. Africa' },
  AF:  { x: 50, y: 60, label: 'Africa' },
  LATAM:{ x: 27, y: 65, label: 'Latin America' },
  NA:  { x: 18, y: 35, label: 'North America' },
};

const REGION_COLORS: Record<string, string> = {
  SEA: '#6366f1',
  EA:  '#8b5cf6',
  SA:  '#06b6d4',
  EU:  '#10b981',
  MENA:'#f59e0b',
  AF:  '#f43f5e',
  LATAM:'#ec4899',
  NA:  '#3b82f6',
};

const REGION_LOCALE_MAP: Record<string, LocaleEntry[]> = {};
LOCALE_CORPUS.forEach(l => {
  if (!REGION_LOCALE_MAP[l.region]) REGION_LOCALE_MAP[l.region] = [];
  REGION_LOCALE_MAP[l.region].push(l);
});

function CoverageBar({ value }: { value: number }) {
  return (
    <div className={styles.coverageBar}>
      <div
        className={styles.coverageFill}
        style={{
          width: `${value}%`,
          background: value > 85 ? 'var(--brand-success)' : value > 65 ? 'var(--brand-primary)' : 'var(--brand-warm)',
        }}
      />
    </div>
  );
}

export default function LocaleMap() {
  const [selectedLocale, setSelectedLocale] = useState<LocaleEntry | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.mapArea}>
        {/* SVG world map simplified */}
        <svg className={styles.worldSvg} viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet">
          {/* Simple world outlines (simplified blobs) */}
          {/* North America */}
          <ellipse cx="18" cy="33" rx="12" ry="14" className={styles.continent} />
          {/* South America */}
          <ellipse cx="27" cy="60" rx="7" ry="10" className={styles.continent} />
          {/* Europe */}
          <ellipse cx="48" cy="27" rx="6" ry="6" className={styles.continent} />
          {/* Africa */}
          <ellipse cx="50" cy="53" rx="7" ry="12" className={styles.continent} />
          {/* Middle East */}
          <ellipse cx="57" cy="40" rx="5" ry="6" className={styles.continent} />
          {/* South Asia */}
          <ellipse cx="64" cy="46" rx="5" ry="6" className={styles.continent} />
          {/* East Asia */}
          <ellipse cx="78" cy="38" rx="8" ry="8" className={styles.continent} />
          {/* SEA */}
          <ellipse cx="74" cy="56" rx="6" ry="5" className={styles.continent} />
          {/* Australia */}
          <ellipse cx="81" cy="62" rx="6" ry="4" className={styles.continent} />

          {/* Region nodes */}
          {Object.entries(REGION_POSITIONS).map(([region, pos]) => {
            const locales = REGION_LOCALE_MAP[region] || [];
            const avgCoverage = locales.length
              ? Math.round(locales.reduce((s, l) => s + l.coverage, 0) / locales.length)
              : 0;
            const color = REGION_COLORS[region];
            const isHovered = hoveredRegion === region;
            const nodeSize = locales.length * 0.4 + 1.5;

            return (
              <g key={region}>
                {/* Glow ring */}
                {locales.length > 0 && (
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={nodeSize + 1.5}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.3"
                    opacity={isHovered ? 0.6 : 0.2}
                    className={styles.glowRing}
                  />
                )}
                {/* Main node */}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={locales.length > 0 ? nodeSize : 1}
                  fill={locales.length > 0 ? color : 'var(--bg-highlight)'}
                  opacity={locales.length > 0 ? 0.85 : 0.3}
                  className={styles.regionNode}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{ cursor: locales.length > 0 ? 'pointer' : 'default' }}
                />
                {/* Label */}
                {locales.length > 0 && (
                  <text
                    x={pos.x} y={pos.y + nodeSize + 2}
                    textAnchor="middle"
                    className={styles.regionLabel}
                    fill={color}
                    fontSize="1.8"
                  >
                    {avgCoverage}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendTitle}>Coverage</div>
          {[
            { color: 'var(--brand-success)', label: '85%+' },
            { color: 'var(--brand-primary)', label: '65–85%' },
            { color: 'var(--brand-warm)', label: '<65%' },
            { color: 'var(--bg-highlight)', label: 'Pending' },
          ].map(item => (
            <div key={item.label} className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Locale list */}
      <div className={styles.localeList}>
        <div className={styles.listHeader}>
          <span className={styles.listTitle}>Seeded Locales</span>
          <span className="badge badge-primary">{LOCALE_CORPUS.length} / 242</span>
        </div>
        <div className={styles.locales}>
          {LOCALE_CORPUS.map(locale => (
            <button
              key={locale.id}
              className={`${styles.localeItem} ${selectedLocale?.id === locale.id ? styles.localeActive : ''}`}
              onClick={() => setSelectedLocale(selectedLocale?.id === locale.id ? null : locale)}
              id={`locale-${locale.id}`}
            >
              <div className={styles.localeTop}>
                <div className={styles.localeName}>{locale.lang}</div>
                <div className={styles.localeCountry}>{locale.country}</div>
              </div>
              <div className={styles.localeMeta}>
                <CoverageBar value={locale.coverage} />
                <div className={styles.localeStats}>
                  <span style={{ color: locale.coverage > 85 ? 'var(--brand-success)' : locale.coverage > 65 ? 'var(--brand-primary)' : 'var(--brand-warm)' }}>
                    {locale.coverage}%
                  </span>
                  <span className={styles.localeHarvested}>{(locale.harvested / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selectedLocale && (
        <div className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <div>
              <div className={styles.detailLang}>{selectedLocale.lang}</div>
              <div className={styles.detailCountry}>{selectedLocale.country}</div>
            </div>
            <button className="btn-icon" onClick={() => setSelectedLocale(null)} id="locale-detail-close">✕</button>
          </div>

          <div className={styles.detailStats}>
            <div className={styles.dStat}>
              <div className={styles.dStatVal} style={{ color: 'var(--brand-primary)' }}>{selectedLocale.coverage}%</div>
              <div className={styles.dStatLabel}>Coverage</div>
            </div>
            <div className={styles.dStat}>
              <div className={styles.dStatVal} style={{ color: 'var(--brand-accent)' }}>{(selectedLocale.harvested / 1000).toFixed(1)}K</div>
              <div className={styles.dStatLabel}>Phrases</div>
            </div>
            <div className={styles.dStat}>
              <div className={styles.dStatVal} style={{ color: 'var(--brand-success)' }}>{selectedLocale.quality}</div>
              <div className={styles.dStatLabel}>Quality</div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <div className={styles.sectionLabel}>Authentic Phrases vs. Translated</div>
            {selectedLocale.phrases.slice(0, 3).map(p => (
              <div key={p.id} className={styles.phraseRow}>
                <div className={styles.phraseKey}>{p.key.replace(/_/g, ' ')}</div>
                <div className={styles.phrasePair}>
                  <div className={styles.phraseAuth}>
                    <span className={styles.authTag}>✓ authentic</span>
                    <span className={styles.authText}>{p.authentic}</span>
                  </div>
                  <div className={styles.phraseTrans}>
                    <span className={styles.transTag}>⚠ translated</span>
                    <span className={styles.transText}>{p.translated}</span>
                  </div>
                </div>
                <div className={styles.phraseScore}>
                  <span style={{ color: p.authenticityScore > 90 ? 'var(--brand-success)' : 'var(--brand-warm)' }}>
                    {p.authenticityScore}% authentic
                  </span>
                  <span className={styles.phraseSource}>from {p.source}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.detailSection}>
            <div className={styles.sectionLabel}>Active Sources</div>
            {selectedLocale.sources.map(s => (
              <div key={s.url} className={styles.sourceRow}>
                <span className={`dot ${s.status === 'active' ? 'dot-live' : 'dot-warm'}`} />
                <span className={styles.sourceName}>{s.name}</span>
                <span className={styles.sourceType}>{s.type}</span>
                <span className={styles.sourcePhrases}>+{s.phrasesFound.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

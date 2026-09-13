'use client';

import { useState } from 'react';
import AgentChat from '@/components/AgentChat';
import HarvestConsole from '@/components/HarvestConsole';
import LocaleMap from '@/components/LocaleMap';
import SEAPilot from '@/components/SEAPilot';
import { TOTAL_STATS } from '@/lib/locale-data';
import styles from './page.module.css';

type Tab = 'agent' | 'map' | 'harvest' | 'sea';

const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: 'agent',   label: 'Agent',           icon: '🤖', desc: 'Multi-step reasoning' },
  { id: 'map',     label: 'Locale Explorer', icon: '🌍', desc: '242-language coverage' },
  { id: 'harvest', label: 'Live Harvest',    icon: '📡', desc: 'Real-time web reads' },
  { id: 'sea',     label: 'SEA Pilot',       icon: '🇸🇬', desc: 'AI Singapore program' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('agent');

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <a href="https://anakin.io" target="_blank" rel="noopener noreferrer" className={styles.logo} style={{ textDecoration: 'none' }}>
          <div className={styles.logoMark}>A</div>
          <div className={styles.logoText}>
            <div className={styles.logoPrimary}>Anakin</div>
            <div className={styles.logoSub}>Locale Agent</div>
          </div>
        </a>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarLabel}>UC-2 · Localize Mode</div>
          <nav className={styles.nav}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`${styles.navItem} ${activeTab === tab.id ? styles.navActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
                id={`nav-${tab.id}`}
              >
                <span className={styles.navIcon}>{tab.icon}</span>
                <div className={styles.navText}>
                  <div className={styles.navLabel}>{tab.label}</div>
                  <div className={styles.navDesc}>{tab.desc}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarLabel}>Corpus Stats</div>
          <div className={styles.statsList}>
            <div className={styles.statRow}>
              <span className={styles.statKey}>Languages</span>
              <span className={styles.statVal}>{TOTAL_STATS.languages}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statKey}>Seeded</span>
              <span className={styles.statVal} style={{ color: 'var(--brand-primary)' }}>{TOTAL_STATS.seeded}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statKey}>Phrases</span>
              <span className={styles.statVal} style={{ color: 'var(--brand-accent)' }}>
                {(TOTAL_STATS.totalPhrases / 1000).toFixed(0)}K
              </span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statKey}>Avg Quality</span>
              <span className={styles.statVal} style={{ color: 'var(--brand-success)' }}>{TOTAL_STATS.avgQuality}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statKey}>Avg Coverage</span>
              <span className={styles.statVal}>{TOTAL_STATS.avgCoverage}%</span>
            </div>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerBadge}>
            <span className="dot dot-live" />
            <span>Live harvest active</span>
          </div>
          <div className={styles.footerPowered}>clarion-qwen · Ollama · Local</div>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <h1 className={styles.pageTitle}>
              {TABS.find(t => t.id === activeTab)?.icon}{' '}
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <p className={styles.pageDesc}>
              {activeTab === 'agent' && 'Multi-step reasoning agent for locale grounding — powered by a local on-device model, no API key required'}
              {activeTab === 'map' && 'Language coverage map — click any locale to see authentic vs. translated phrase comparison'}
              {activeTab === 'harvest' && 'Live web harvest — regional marketplaces, country TLDs, local reviews, and social endpoints'}
              {activeTab === 'sea' && 'AI Singapore Southeast Asia pilot — live non-English training efficiency program'}
            </p>
          </div>
          <div className={styles.topbarRight}>
            <div className="badge badge-success">
              <span className="dot dot-live" style={{ width: 6, height: 6 }} />
              System Online
            </div>
            <div className="badge badge-primary">UC-2 · Localize Mode</div>
          </div>
        </header>

        {/* Content area */}
        <div className={styles.content}>
          {activeTab === 'agent'   && <AgentChat />}
          {activeTab === 'map'     && <LocaleMap />}
          {activeTab === 'harvest' && <HarvestConsole />}
          {activeTab === 'sea'     && <SEAPilot />}
        </div>
      </main>
    </div>
  );
}

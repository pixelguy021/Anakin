'use client';

import { SEA_LOCALES, type LocaleEntry } from '@/lib/locale-data';
import { HARVEST_FEED } from '@/lib/harvest-stream';
import { useState } from 'react';
import styles from './SEAPilot.module.css';

const SEA_FLAGS: Record<string, string> = {
  ID: '🇮🇩', MY: '🇲🇾', TH: '🇹🇭', VN: '🇻🇳', PH: '🇵🇭', SG: '🇸🇬',
};

const SEA_HARVEST = HARVEST_FEED.filter(h =>
  ['ID', 'MY', 'TH', 'VN', 'PH', 'SG'].includes(h.countryCode) && h.status === 'done'
);

const PILOT_METRICS = {
  trainingEfficiency: 34,   // % improvement over base model
  coverageGain: 2.8,        // x multiplier vs translated data
  phraseDiversity: 91,      // score /100
  nativeApproval: 87,       // % of phrases approved by native speakers
  totalLanguages: 6,
  totalPhrases: SEA_LOCALES.reduce((s, l) => s + l.harvested, 0),
};

export default function SEAPilot() {
  const [activeLocale, setActiveLocale] = useState<LocaleEntry>(SEA_LOCALES[0]);

  return (
    <div className={styles.pilot}>
      {/* Hero banner */}
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <div className={styles.pilotTag}>
            <span className="dot dot-live" />
            LIVE PILOT
          </div>
          <h2 className={styles.bannerTitle}>
            AI Singapore <span className="gradient-text-sea">Southeast Asia</span> Program
          </h2>
          <p className={styles.bannerDesc}>
            Named, active non-English training efficiency pilot across 6 SEA markets.
            Anakin sources real marketplace &amp; social phrasing — dramatically outperforming model-translated data.
          </p>
        </div>
        <div className={styles.bannerStats}>
          <div className={styles.bigStat}>
            <div className={styles.bigStatVal} style={{ color: 'var(--brand-success)' }}>+{PILOT_METRICS.trainingEfficiency}%</div>
            <div className={styles.bigStatLabel}>Training Efficiency</div>
          </div>
          <div className={styles.bigStat}>
            <div className={styles.bigStatVal} style={{ color: 'var(--brand-accent)' }}>{PILOT_METRICS.coverageGain}x</div>
            <div className={styles.bigStatLabel}>Coverage vs Translated</div>
          </div>
          <div className={styles.bigStat}>
            <div className={styles.bigStatVal} style={{ color: 'var(--brand-secondary)' }}>{PILOT_METRICS.nativeApproval}%</div>
            <div className={styles.bigStatLabel}>Native Approval Rate</div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {/* Left: locale tabs */}
        <div className={styles.localeTabs}>
          <div className={styles.tabsTitle}>SEA Markets</div>
          {SEA_LOCALES.map(locale => (
            <button
              key={locale.id}
              className={`${styles.tab} ${activeLocale.id === locale.id ? styles.tabActive : ''}`}
              onClick={() => setActiveLocale(locale)}
              id={`sea-tab-${locale.id}`}
            >
              <span className={styles.tabFlag}>{SEA_FLAGS[locale.countryCode]}</span>
              <div className={styles.tabInfo}>
                <div className={styles.tabLang}>{locale.lang}</div>
                <div className={styles.tabCountry}>{locale.country}</div>
              </div>
              <div className={styles.tabCoverage}
                style={{ color: locale.coverage > 80 ? 'var(--brand-success)' : 'var(--brand-warm)' }}>
                {locale.coverage}%
              </div>
            </button>
          ))}
        </div>

        {/* Center: locale detail */}
        <div className={styles.localeDetail}>
          <div className={styles.detailCard}>
            <div className={styles.detailTop}>
              <div>
                <div className={styles.detailFlag}>{SEA_FLAGS[activeLocale.countryCode]}</div>
                <div className={styles.detailLang}>{activeLocale.lang}</div>
                <div className={styles.detailCountry}>{activeLocale.country}</div>
              </div>
              <div className={styles.detailKpis}>
                <div className={styles.kpi}>
                  <div className={styles.kpiVal}>{activeLocale.coverage}%</div>
                  <div className={styles.kpiLabel}>Coverage</div>
                </div>
                <div className={styles.kpi}>
                  <div className={styles.kpiVal}>{(activeLocale.harvested / 1000).toFixed(1)}K</div>
                  <div className={styles.kpiLabel}>Phrases</div>
                </div>
                <div className={styles.kpi}>
                  <div className={styles.kpiVal}>{activeLocale.quality}</div>
                  <div className={styles.kpiLabel}>Quality</div>
                </div>
              </div>
            </div>

            {/* Phrase showcase */}
            <div className={styles.phrases}>
              <div className={styles.phrasesTitle}>Authentic vs. Translationese</div>
              {activeLocale.phrases.map(phrase => (
                <div key={phrase.id} className={styles.phraseCard}>
                  <div className={styles.phraseKey}>{phrase.key.replace(/_/g, ' ')}</div>
                  <div className={styles.comparison}>
                    <div className={styles.authentic}>
                      <div className={styles.compLabel}>
                        <span className={styles.greenDot} />Web-harvested
                      </div>
                      <div className={styles.compText}>{phrase.authentic}</div>
                      <div className={styles.compSource}>from {phrase.source}</div>
                    </div>
                    <div className={styles.vsArrow}>vs</div>
                    <div className={styles.translated}>
                      <div className={styles.compLabel}>
                        <span className={styles.redDot} />Model-translated
                      </div>
                      <div className={styles.compText} style={{ opacity: 0.6 }}>{phrase.translated}</div>
                      <div className={styles.compSource} style={{ color: 'var(--brand-danger)', opacity: 0.7 }}>
                        {phrase.authenticityScore < 95 ? '⚠ translationese detected' : '⚡ divergence minimal'}
                      </div>
                    </div>
                  </div>
                  <div className={styles.scoreLine}>
                    <div className={styles.scoreBar}>
                      <div className={styles.scoreBarFill} style={{ width: `${phrase.authenticityScore}%` }} />
                    </div>
                    <span className={styles.scoreVal}>{phrase.authenticityScore}% authentic</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sources */}
            <div className={styles.sourcesSection}>
              <div className={styles.phrasesTitle}>Harvest Sources</div>
              <div className={styles.sourceGrid}>
                {activeLocale.sources.map(s => (
                  <div key={s.url} className={styles.sourceChip}>
                    <span className={`dot ${s.status === 'active' ? 'dot-live' : 'dot-warm'}`} />
                    <span className={styles.chipName}>{s.name}</span>
                    <span className={styles.chipPhrases}>+{s.phrasesFound.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: live harvest for SEA */}
        <div className={styles.seaFeed}>
          <div className={styles.feedTitle}>
            <span className="dot dot-live" />
            SEA Live Feed
          </div>
          <div className={styles.feedItems}>
            {SEA_HARVEST.slice(0, 8).map(event => (
              <div key={event.id} className={styles.feedItem}>
                <div className={styles.feedTop}>
                  <span className={styles.feedFlag}>{SEA_FLAGS[event.countryCode]}</span>
                  <span className={styles.feedSite}>{event.siteName}</span>
                  <span className={styles.feedPhrases}>+{event.phrasesFound}</span>
                </div>
                {event.topPhrase && (
                  <div className={styles.feedPhrase}>
                    <span className={styles.feedPhraseText}>{event.topPhrase}</span>
                    <span className={styles.feedPhraseEn}>→ {event.topPhraseTranslation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

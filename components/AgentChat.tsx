'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './AgentChat.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCall[];
  isLoading?: boolean;
}

interface ToolCall {
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
}

const TOOL_ICONS: Record<string, string> = {
  look_up_locale: '🔍',
  compare_phrases: '⚖️',
  list_sources: '📡',
  harvest_status: '📊',
  recommend_sources: '🎯',
  scrape_url: '🌐',
};

const TOOL_LABELS: Record<string, string> = {
  look_up_locale: 'Looking up locale corpus',
  compare_phrases: 'Comparing authentic vs translated',
  list_sources: 'Listing regional sources',
  harvest_status: 'Checking harvest statistics',
  recommend_sources: 'Recommending sources',
  scrape_url: 'Scraping live URL via Anakin.io',
};

const SUGGESTED_PROMPTS = [
  "Find authentic e-commerce phrases for Bahasa Indonesia",
  "Compare 'add to cart' across SEA locales",
  "What sources cover Japanese best?",
  "Show me the current harvest statistics",
  "Recommend sources for Southeast Asia",
  "Scrape https://shopee.co.th and extract key phrases",
];

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = { id: generateId(), role: 'user', content: userText };
    const assistantId = generateId();

    setMessages(prev => [
      ...prev,
      userMsg,
      { id: assistantId, role: 'assistant', content: '', isLoading: true }
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: userText }],
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, isLoading: false, content: `⚠️ Error: ${data.error || res.statusText}` }
              : m
          )
        );
        return;
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, isLoading: false, content: data.text || '', toolCalls: data.toolCalls || [] }
            : m
        )
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId ? { ...m, isLoading: false, content: `⚠️ ${msg}` } : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.agentAvatar}>
            <span>A</span>
            <div className={styles.avatarGlow} />
          </div>
          <div>
            <div className={styles.agentName}>Anakin Agent</div>
            <div className={styles.agentStatus}>
              <span className="dot dot-live" />
              <span>Multilingual Locale Grounding · Local Model · No API Key</span>
            </div>
          </div>
        </div>
        <div className="badge badge-success" style={{ fontSize: '0.7rem' }}>
          🖥️ Offline Ready
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🌍</div>
            <h3>Anakin Locale Grounding Agent</h3>
            <p>
              Powered entirely by a <strong>local on-device model</strong> — no API key, no internet required.
              I source authentic in-market phrasing across 242 languages from regional marketplaces,
              country TLDs, and social platforms.
            </p>
            <div className={styles.modelBadge}>
              🖥️ clarion-qwen · Ollama · Running locally
            </div>
            <div className={styles.suggestions}>
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  className={styles.suggestion}
                  onClick={() => sendMessage(p)}
                  id={`suggestion-${i}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.agentMessage}`}
          >
            {msg.role === 'assistant' && <div className={styles.messageAvatar}>A</div>}
            <div className={styles.messageBubble}>
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <div className={styles.toolCalls}>
                  {msg.toolCalls.map((tc, i) => (
                    <div key={i} className={styles.toolCall}>
                      <div className={styles.toolHeader}>
                        <span className={styles.toolIcon}>{TOOL_ICONS[tc.toolName] || '🔧'}</span>
                        <span className={styles.toolName}>{TOOL_LABELS[tc.toolName] || tc.toolName}</span>
                        <span className={`${styles.toolState} ${styles.toolDone}`}>✓ done</span>
                      </div>
                      <div className={styles.toolArgs}>
                        {Object.entries(tc.args || {}).map(([k, v]) => (
                          <span key={k} className={styles.toolArg}>
                            <span className={styles.toolArgKey}>{k}:</span>
                            <span className={styles.toolArgVal}>{JSON.stringify(v)}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {msg.isLoading ? (
                <div className={styles.thinking}><span /><span /><span /></div>
              ) : msg.content ? (
                <div className={styles.messageText}>
                  <FormattedMessage content={msg.content} />
                </div>
              ) : null}
            </div>
            {msg.role === 'user' && <div className={styles.userAvatar}>U</div>}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form className={styles.inputBar} onSubmit={handleSubmit} id="agent-chat-form">
        <input
          className={`input ${styles.chatInput}`}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about locale phrasing, sources, or harvests..."
          disabled={isLoading}
          id="agent-chat-input"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !input.trim()}
          id="agent-send-btn"
          style={{ flexShrink: 0 }}
        >
          {isLoading
            ? <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>↻</span>
            : '↑ Send'}
        </button>
      </form>
    </div>
  );
}

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div>
      {lines.map((line, i) => {
        if (line.startsWith('## ')) return <h3 key={i} style={{ color: 'var(--brand-accent)', margin: '8px 0 4px', fontSize: '0.95rem' }}>{line.slice(3)}</h3>;
        if (line.startsWith('# ')) return <h2 key={i} style={{ color: 'var(--text-primary)', margin: '8px 0 4px', fontSize: '1rem' }}>{line.slice(2)}</h2>;
        if (line.startsWith('- ') || line.startsWith('• ')) return <div key={i} style={{ paddingLeft: '12px', borderLeft: '2px solid var(--border-bright)', margin: '3px 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{line.slice(2)}</div>;
        if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} style={{ color: 'var(--text-primary)', display: 'block' }}>{line.slice(2, -2)}</strong>;
        if (line.startsWith('⚡') || line.startsWith('✓') || line.startsWith('⚠')) return <div key={i} style={{ color: line.startsWith('⚡') ? 'var(--brand-warm)' : line.startsWith('✓') ? 'var(--brand-success)' : '#f59e0b', fontSize: '0.85rem', marginTop: '4px' }}>{line}</div>;
        if (line.trim() === '') return <div key={i} style={{ height: '6px' }} />;
        return <span key={i} style={{ display: 'block', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{line}</span>;
      })}
    </div>
  );
}

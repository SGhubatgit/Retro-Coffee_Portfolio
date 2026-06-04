import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PROFILE, RESUME_URL, RESUME_FILENAME } from '../data/resume';

const COMMANDS = [
  { id: 'about',      label: 'Go to About',       icon: '👤', section: 'about' },
  { id: 'experience', label: 'Go to Experience',   icon: '📋', section: 'experience' },
  { id: 'skills',     label: 'Go to Skills',       icon: '⚡', section: 'skills' },
  { id: 'projects',   label: 'Go to Projects',     icon: '🚀', section: 'projects' },
  { id: 'contact',    label: 'Go to Contact',      icon: '✉️',  section: 'contact' },
  { id: 'top',        label: 'Scroll to Top',      icon: '⬆️',  type: 'scroll-top' },
  { id: 'github',     label: 'Open GitHub',        icon: '🐙', href: PROFILE.github, external: true },
  { id: 'linkedin',   label: 'Open LinkedIn',      icon: '💼', href: PROFILE.linkedin, external: true },
  { id: 'resume',     label: 'Download Resume',    icon: '📄', href: RESUME_URL, download: RESUME_FILENAME },
  { id: 'dark',       label: 'Toggle Dark Mode',   icon: '🌙', type: 'toggle-dark' },
  { id: 'email',      label: 'Copy Email Address', icon: '📧', type: 'copy-email' },
  { id: 'phone',      label: 'Call Sunny',         icon: '📞', href: PROFILE.phoneHref },
];

export default function CommandPalette({ onToggleDark, open, onOpen, onClose }) {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(0);
  const [toast, setToast]       = useState('');
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return COMMANDS;
    const q = query.toLowerCase();
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  // Global Ctrl+K / ⌘K shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? onClose() : onOpen();
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpen, onClose]);

  // Focus + reset when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const runCommand = (cmd) => {
    if (!cmd) return;
    onClose();

    switch (cmd.type) {
      case 'scroll-top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      case 'toggle-dark':
        onToggleDark?.();
        return;
      case 'copy-email':
        navigator.clipboard.writeText(PROFILE.email).then(() => {
          showToast('✓ Email copied to clipboard!');
        });
        return;
      default:
        break;
    }

    if (cmd.section) {
      document.getElementById(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (cmd.download) {
      const a = document.createElement('a');
      a.href = cmd.href; a.download = cmd.download;
      document.body.appendChild(a); a.click(); a.remove();
      return;
    }
    if (cmd.href) {
      cmd.external
        ? window.open(cmd.href, '_blank', 'noopener,noreferrer')
        : (window.location.href = cmd.href);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); runCommand(filtered[selected]); }
  };

  return (
    <>
      {/* Toast notification */}
      <div className={`toast${toast ? ' show toast-success' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="cp-overlay"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            {/* Search input */}
            <div className="cp-header">
              <svg className="cp-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                className="cp-input"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
              <kbd className="cp-esc-key" onClick={onClose}>ESC</kbd>
            </div>

            {/* Results list */}
            <ul className="cp-list" role="listbox">
              {filtered.length === 0 ? (
                <li className="cp-empty">No results for &ldquo;{query}&rdquo;</li>
              ) : (
                filtered.map((cmd, i) => (
                  <li
                    key={cmd.id}
                    className={`cp-item${i === selected ? ' cp-selected' : ''}`}
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    role="option"
                    aria-selected={i === selected}
                  >
                    <span className="cp-icon">{cmd.icon}</span>
                    <span className="cp-label">{cmd.label}</span>
                    <span className="cp-enter">↵</span>
                  </li>
                ))
              )}
            </ul>

            {/* Footer shortcuts hint */}
            <div className="cp-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>ESC</kbd> close</span>
              <span style={{ marginLeft: 'auto', opacity: 0.5 }}>Ctrl K</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

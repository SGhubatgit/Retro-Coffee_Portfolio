import React, { useState, useEffect } from 'react';
import { RESUME_URL, RESUME_FILENAME } from '../data/resume';

const DOWNLOAD_KEY = 'sg_resume_downloads';
const getCount = () => parseInt(localStorage.getItem(DOWNLOAD_KEY) || '0', 10);

const NAV_SECTIONS = ['about', 'experience', 'skills', 'projects', 'contact'];

export default function Navbar({ darkMode, onToggleDark, onOpenPalette }) {
  const [downloadCount, setDownloadCount] = useState(getCount);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scrolled shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight active nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -65% 0px' }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const magnetic = {
    onMouseMove(e) {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.35;
      const y = (e.clientY - r.top  - r.height / 2) * 0.35;
      e.currentTarget.style.transform = `translate(${x}px, ${y}px) translate(-2px, -3px)`;
    },
    onMouseLeave(e) { e.currentTarget.style.transform = ''; },
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    const next = getCount() + 1;
    localStorage.setItem(DOWNLOAD_KEY, String(next));
    setDownloadCount(next);
  };

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      {/* Logo */}
      <div
        className="nav-logo"
        onClick={scrollToTop}
        role="button" tabIndex={0}
        aria-label="Scroll to top"
        {...magnetic}
      >
        <span className="nav-logo-text">SG</span>
      </div>

      {/* Nav links — always visible, wraps on mobile */}
      <div className="nav-links">
        {NAV_SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? 'nav-active' : ''}
            onClick={(e) => handleNavClick(e, id)}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}

        {/* Dark / Light toggle */}
        <button
          className="theme-toggle"
          onClick={onToggleDark}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1"  x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        {/* Resume download with counter badge */}
        <a
          href={RESUME_URL}
          className="btn-resume"
          download={RESUME_FILENAME}
          onClick={handleDownload}
          title={downloadCount > 0 ? `Downloaded ${downloadCount}×` : 'Download Resume'}
          {...magnetic}
        >
          Resume ↓
          {downloadCount > 0 && (
            <span className="download-badge">{downloadCount}</span>
          )}
        </a>
      </div>
    </nav>
  );
}

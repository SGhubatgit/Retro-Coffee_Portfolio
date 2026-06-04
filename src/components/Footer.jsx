import React from 'react';
import { PROFILE, RESUME_URL, RESUME_FILENAME } from '../data/resume';

const currentYear = new Date().getFullYear();

const NAV_LINKS = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];

export default function Footer() {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">SG</div>
          <p className="footer-tagline">
            Building things with code<br />and a lot of ☕
          </p>
          <div className="footer-socials">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href={PROFILE.phoneHref} aria-label="Call" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <div className="footer-col-title">Navigate</div>
          {NAV_LINKS.map((name) => (
            <a key={name} href={`#${name.toLowerCase()}`} className="footer-link"
               onClick={(e) => handleNavClick(e, name.toLowerCase())}>
              {name}
            </a>
          ))}
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <div className="footer-col-title">Connect</div>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a>
          <a href={PROFILE.github}   target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a>
          <a href={PROFILE.phoneHref} className="footer-link">{PROFILE.phone}</a>
          <a href={RESUME_URL} download={RESUME_FILENAME} className="footer-link footer-resume-link">
            Download Resume ↓
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© {currentYear} {PROFILE.name}. All rights reserved.</span>
        <span className="footer-made">Made with <span className="footer-heart">♥</span> in India</span>
      </div>
    </footer>
  );
}

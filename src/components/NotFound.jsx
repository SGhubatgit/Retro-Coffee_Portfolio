import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-page">
      {/* Pixel grid background */}
      <div className="notfound-grid" aria-hidden="true" />

      <div className="notfound-content">
        <div className="notfound-glitch" data-text="404">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-sub">
          Looks like this page got lost in the matrix.<br />
          Let&apos;s get you back on track.
        </p>

        <div className="notfound-terminal">
          <span className="nt-prompt">$</span>
          <span className="nt-cmd"> cd ~</span>
          <span className="nt-blink">▌</span>
        </div>

        <Link to="/" className="notfound-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

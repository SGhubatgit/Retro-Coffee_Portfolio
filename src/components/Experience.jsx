import React from 'react';
import { EXPERIENCE } from '../data/resume';

const ICONS = {
  education: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  activity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

export default function Experience() {
  return (
    <section id="experience" className="reveal">
      <p className="section-label">Journey</p>
      <h2 className="section-title">Experience &amp; Education</h2>
      <p className="section-subtitle">My academic background and notable activities</p>

      <div className="timeline">
        {EXPERIENCE.map((item, i) => (
          <div key={i} className={`timeline-item reveal reveal-delay-${(i % 4) + 1}`}>
            {/* Line + Icon connector */}
            <div className="timeline-connector">
              <div className="timeline-icon">
                {ICONS[item.type] || ICONS.activity}
              </div>
              {i < EXPERIENCE.length - 1 && <div className="timeline-line" />}
            </div>

            {/* Card */}
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.organization}</p>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-period">{item.period}</span>
                  <span className="timeline-detail">{item.detail}</span>
                </div>
              </div>
              <p className="timeline-desc">{item.description}</p>
              <div className={`timeline-type-badge type-${item.type}`}>
                {item.type === 'education' ? '🎓 Education' : '⚡ Activity'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

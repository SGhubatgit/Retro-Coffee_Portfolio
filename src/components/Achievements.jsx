import React, { useRef } from 'react';
import { ACHIEVEMENTS } from '../data/resume';

export default function Achievements() {
  const stripRef = useRef(null);

  // Drag-to-scroll on desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
    stripRef.current.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section id="achievements" className="achievements-section reveal">
      <p className="section-label">Milestones</p>
      <h2 className="section-title">Achievements &amp; Highlights</h2>
      <p className="section-subtitle">Certifications, activities, and skills that define my journey</p>

      <div
        className="achievements-strip"
        ref={stripRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {ACHIEVEMENTS.map((ach, i) => (
          <div
            key={i}
            className="achievement-badge reveal"
            style={{ '--badge-color': ach.color, animationDelay: `${i * 0.08}s` }}
          >
            <div className="badge-icon">{ach.icon}</div>
            <div className="badge-body">
              <div className="badge-title">{ach.title}</div>
              <div className="badge-subtitle">{ach.subtitle}</div>
            </div>
            <div className="badge-glow" />
          </div>
        ))}
      </div>
    </section>
  );
}

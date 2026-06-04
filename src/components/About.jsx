import React, { useRef, useEffect, useState } from 'react';
import { PROFILE } from '../data/resume';

const STATS = [
  { end: 3,    suffix: '+',  label: 'Projects Built',  decimal: false },
  { end: 16,   suffix: '+',  label: 'Technologies',    decimal: false },
  { end: 7.53, suffix: '',   label: 'Current CPI',     decimal: true  },
  { end: 2,    suffix: '+',  label: 'Years Coding',    decimal: false },
];

function AnimatedCounter({ end, suffix, decimal }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const steps    = 50;
          const step     = duration / steps;
          let current    = 0;
          const timer = setInterval(() => {
            current += 1;
            const progress = current / steps;
            const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setVal(parseFloat((eased * end).toFixed(decimal ? 2 : 0)));
            if (current >= steps) {
              clearInterval(timer);
              setVal(end);
            }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimal]);

  return (
    <span ref={ref} className="stat-value">
      {decimal ? val.toFixed(2) : val}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="reveal">
      <p className="section-label">Identity</p>
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">A glimpse into who I am and what I do</p>

      <div className="about-card">
        <div className="about-text">
          <p>
            Hello! I&apos;m <strong>{PROFILE.name}</strong>, a Computer Science &amp; Engineering
            student at <strong>Parul University</strong> pursuing a B.Tech with hands-on experience
            in software development, backend systems, and AI-based applications.
          </p>
          <p>{PROFILE.summary}</p>
          <p>{PROFILE.objective}</p>
        </div>

        <div className="about-details">
          <div className="about-info-item">
            <div className="about-info-title">Degree</div>
            <div className="about-info-value">B.Tech — CSE, Parul University</div>
          </div>
          <div className="about-info-item">
            <div className="about-info-title">CPI</div>
            <div className="about-info-value">7.53 (Currently Pursuing)</div>
          </div>
          <div className="about-info-item">
            <div className="about-info-title">Class XII</div>
            <div className="about-info-value">Bihar Board — 76%</div>
          </div>
          <div className="about-info-item">
            <div className="about-info-title">Class X</div>
            <div className="about-info-value">CBSE — 75%</div>
          </div>
          <div className="about-info-item">
            <div className="about-info-title">Activities</div>
            <div className="about-info-value">Winter of Code · Open Source &amp; Git</div>
          </div>
          <div className="about-info-item">
            <div className="about-info-title">Contact</div>
            <div className="about-info-value">{PROFILE.phone}</div>
          </div>
        </div>
      </div>

      {/* Animated stats strip */}
      <div className="about-stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <AnimatedCounter end={stat.end} suffix={stat.suffix} decimal={stat.decimal} />
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

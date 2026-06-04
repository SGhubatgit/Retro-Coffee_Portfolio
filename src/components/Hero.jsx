import React, { useEffect, useRef, useState } from 'react';
import { PROFILE, CURRENTLY_LEARNING } from '../data/resume';

const PHRASES = [
  'Hello, I am Sunny Gautam',
  'Hello, I am . Software Developer',
];

const TYPE_SPEED   = 75;
const ERASE_SPEED  = 40;
const PAUSE_AFTER  = 1800;
const PAUSE_BEFORE = 400;

function getDynamicGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return { text: 'Good Morning',  emoji: '☀️' };
  if (h >= 12 && h < 17) return { text: 'Good Afternoon', emoji: '🌤' };
  if (h >= 17 && h < 21) return { text: 'Good Evening',  emoji: '🌆' };
  return                         { text: 'Good Night',    emoji: '🌙' };
}

export default function Hero() {
  const imageRef      = useRef(null);
  const [text, setText]             = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const greeting                    = getDynamicGreeting();

  // Mouse parallax on image
  useEffect(() => {
    const onMove = (e) => {
      if (!imageRef.current) return;
      const dx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      imageRef.current.style.transform = `translate(${dx * 12}px, ${dy * 12}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Continuous typing animation
  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, erasing = false, tid;

    const tick = () => {
      const phrase = PHRASES[phraseIdx];
      if (!erasing) {
        charIdx++;
        setText(phrase.slice(0, charIdx));
        if (charIdx >= phrase.length) {
          erasing = true;
          tid = setTimeout(tick, PAUSE_AFTER);
          return;
        }
        tid = setTimeout(tick, TYPE_SPEED);
      } else {
        charIdx--;
        setText(phrase.slice(0, charIdx));
        if (charIdx <= 0) {
          erasing = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          tid = setTimeout(tick, PAUSE_BEFORE);
          return;
        }
        tid = setTimeout(tick, ERASE_SPEED);
      }
    };
    tid = setTimeout(tick, 800);
    return () => clearTimeout(tid);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
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

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      <div className="hero-left">
        {/* Dynamic time greeting */}
        <div className="hero-greeting" aria-label={`${greeting.text}, visitor!`}>
          <span className="hero-greeting-emoji">{greeting.emoji}</span>
          <span className="hero-greeting-text">{greeting.text}, visitor!</span>
        </div>

        <p className="hero-eyebrow">
          <span className="availability-dot" aria-hidden="true" />
          Available for internship
        </p>

        <h1 className="hero-title">
          <span className="hero-typewriter" aria-label={text}>
            {text}
            <span className={`hero-cursor${showCursor ? ' visible' : ''}`} aria-hidden="true">|</span>
          </span>
        </h1>

        <p className="hero-sub">{PROFILE.summary}</p>

        {/* CTA Button */}
        <a
          href="#projects"
          className="hero-cta-btn"
          onClick={scrollToProjects}
          {...magnetic}
        >
          <span>View My Work</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>

        <div className="hero-socials">
          <a href={PROFILE.linkedin} className="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer" {...magnetic}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href={PROFILE.github} className="social-btn" title="GitHub" target="_blank" rel="noopener noreferrer" {...magnetic}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href={PROFILE.phoneHref} className="social-btn" title={`Call: ${PROFILE.phone}`} {...magnetic}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>      
      </div>

      <div className="hero-right">
        <div className="hero-visual" ref={imageRef}>
          <img className="hero-pixel-art" src="/image.png" alt="Pixel art developer at a retro computer desk" />
        </div>
      </div>
    </section>
  );
}

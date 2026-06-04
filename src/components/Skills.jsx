import React, { useEffect, useRef } from 'react';
import { SKILL_PROFICIENCY } from '../data/resume';

const DEV = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const HEX_SIZE = 58;
const HEX_GAP  = 1.28;

const skills = [
  { name: 'Python',      class: 'python',     logo: DEV('python'),           desc: 'Language',  accent: true },
  { name: 'Java',        class: 'java',        logo: DEV('java'),             desc: 'Language' },
  { name: 'C',           class: 'c',           logo: DEV('c'),                desc: 'Language' },
  { name: 'JavaScript',  class: 'javascript',  logo: DEV('javascript'),       desc: 'Language',  accent: true },
  { name: 'HTML5',       class: 'html',        logo: DEV('html5'),            desc: 'Web' },
  { name: 'CSS3',        class: 'css',         logo: DEV('css3'),             desc: 'Web' },
  { name: 'Flask',       class: 'flask',       logo: DEV('flask'),            desc: 'Framework', accent: true },
  { name: 'Django',      class: 'django',      logo: DEV('django', 'plain'),  desc: 'Framework' },
  { name: 'React',       class: 'react',       logo: DEV('react'),            desc: 'Framework' },
  { name: 'Git',         class: 'git',         logo: DEV('git'),              desc: 'Tools' },
  { name: 'GitHub',      class: 'github',      logo: DEV('github'),           desc: 'Tools',     accent: true },
  { name: 'VS Code',     class: 'vscode',      logo: DEV('vscode'),           desc: 'Tools' },
  { name: 'TensorFlow',  class: 'ml',          logo: DEV('tensorflow'),       desc: 'ML / AI' },
  { name: 'Node.js',     class: 'backend',     logo: DEV('nodejs'),           desc: 'Backend' },
  { name: 'MongoDB',     class: 'fullstack',   logo: DEV('mongodb'),          desc: 'Database',  accent: true },
  { name: 'Linux',       class: 'opensource',  logo: DEV('linux'),            desc: 'OS / Tools' },
];

const honeycombCoords = [
  { q: 0, r: 0 },
  { q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 1 },
  { q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 },
  { q: 2, r: 0 }, { q: 2, r: -1 }, { q: 2, r: -2 },
  { q: 1, r: -2 }, { q: 0, r: -2 }, { q: -2, r: 0 },
  { q: -2, r: 1 }, { q: -1, r: 2 }, { q: 0, r: 2 }, { q: 1, r: 1 },
];

function axialToPixel(q, r) {
  return {
    x: HEX_SIZE * HEX_GAP * Math.sqrt(3) * (q + r / 2),
    y: HEX_SIZE * HEX_GAP * 1.5 * r,
  };
}

function SkillBar({ skill, index }) {
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current) {
          barRef.current.style.width = `${skill.level}%`;
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current.parentElement);
    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <div className="skill-bar-item" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{skill.name}</span>
        <span className="skill-bar-pct">{skill.level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{ width: '0%', transitionDelay: `${index * 0.07}s` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="reveal">
      <p className="section-label">Technical</p>
      <h2 className="section-title">Skills &amp; Expertise</h2>
      <p className="section-subtitle">Programming, web technologies, frameworks, and development tools</p>

      {/* Honeycomb logo grid */}
      <div className="honeycomb-container">
        {skills.map((skill, index) => {
          const { q, r } = honeycombCoords[index];
          const { x, y } = axialToPixel(q, r);
          const ring  = Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r));
          const delay = `${ring * 0.12 + index * 0.04}s`;

          return (
            <div
              key={skill.name}
              className={`honeycomb-cell ${skill.class}${skill.accent ? ' accent' : ''} animate-in`}
              style={{ '--hx': `${x}px`, '--hy': `${y}px`, animationDelay: delay }}
              title={skill.name}
            >
              <div className="hex-shadow" aria-hidden="true" />
              <div className="hex-stroke" aria-hidden="true" />
              <div className="hex-face">
                <div className="honeycomb-cell-content">
                  <img className="honeycomb-logo" src={skill.logo} alt={skill.name} loading="lazy" draggable="false" />
                  <span className="honeycomb-name">{skill.name}</span>
                  <span className="honeycomb-desc">{skill.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proficiency bars */}
      <div className="skill-bars-section reveal">
        <p className="skill-bars-label">Proficiency Overview</p>
        <div className="skill-bars-grid">
          {SKILL_PROFICIENCY.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

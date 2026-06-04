import React, { useRef } from 'react';
import { PROJECTS } from '../data/resume';

// Tech pill color map
const TECH_COLORS = {
  Python:           { bg: '#3572a5', text: '#fff' },
  Flask:            { bg: '#000', text: '#fff' },
  ML:               { bg: '#ff6f00', text: '#fff' },
  'Machine Learning': { bg: '#ff6f00', text: '#fff' },
  HTML5:            { bg: '#e34f26', text: '#fff' },
  CSS3:             { bg: '#1572b6', text: '#fff' },
  JavaScript:       { bg: '#f7df1e', text: '#000' },
  React:            { bg: '#61dafb', text: '#000' },
  Django:           { bg: '#092e20', text: '#fff' },
  SQLite:           { bg: '#003b57', text: '#fff' },
  'Node.js':        { bg: '#339933', text: '#fff' },
  MongoDB:          { bg: '#47a248', text: '#fff' },
  Git:              { bg: '#f05032', text: '#fff' },
  TypeScript:       { bg: '#3178c6', text: '#fff' },
};

const DEFAULT_PILL = { bg: '#6b5a4a', text: '#fff' };

function TechPills({ stack }) {
  return (
    <div className="tech-pills">
      {stack.map((tech) => {
        const color = TECH_COLORS[tech] || DEFAULT_PILL;
        return (
          <span
            key={tech}
            className="tech-pill"
            style={{ background: color.bg, color: color.text }}
          >
            {tech}
          </span>
        );
      })}
    </div>
  );
}

// SVG illustrations (kept from original)
const ILLUSTRATIONS = [
  (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="8" y="12" width="104" height="56" rx="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="40" cy="40" r="18" fill="rgba(255,255,255,0.2)" />
      <path d="M28 52 Q40 28 52 52" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
      <rect x="68" y="22" width="36" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="68" y="34" width="28" height="4" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="68" y="44" width="32" height="4" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="68" y="54" width="24" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
    </svg>
  ),
  (
    <svg width="100" height="55" viewBox="0 0 100 55" fill="none">
      <rect x="6"  y="8" width="28" height="38" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="38" y="8" width="28" height="38" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="70" y="8" width="24" height="38" rx="2" fill="rgba(255,255,255,0.12)" />
      <rect x="10" y="12" width="20" height="14" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="42" y="12" width="20" height="14" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="74" y="12" width="16" height="14" rx="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  ),
  (
    <svg width="100" height="55" viewBox="0 0 100 55" fill="none">
      <rect x="8"  y="10" width="84" height="36" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="14" y="16" width="10" height="10" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="30" y="19" width="50" height="4"  rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="14" y="28" width="10" height="10" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="30" y="31" width="42" height="4"  rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="14" y="40" width="10" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="30" y="43" width="36" height="4"  rx="1" fill="rgba(255,255,255,0.2)" />
    </svg>
  ),
];

function ProjectCard({ project, index, isFeatured }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translate(-4px,-6px) rotate(-0.5deg) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div
      className={`project-card ${isFeatured ? 'featured' : 'small'} reveal tilt`}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-img" style={{ background: project.bgGrad }}>
        {project.image ? (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="project-img-inner">{ILLUSTRATIONS[index % ILLUSTRATIONS.length]}</div>
        )}
      </div>

      <div className="project-body">
        <span className="project-tag">{project.tag}</span>
        <h3 className="project-title" style={!isFeatured ? { fontSize: '1rem' } : undefined}>
          {project.title}
        </h3>
        {isFeatured && <p className="project-desc">{project.desc}</p>}

        {/* Tech stack pill badges */}
        <TechPills stack={project.techStack} />

        <div className="project-actions">
          {project.codeUrl && (
            <a href={project.codeUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              ↗ GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              ⚡ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <p className="section-label reveal">Work</p>
      <h2 className="section-title reveal">Featured Projects</h2>
      <p className="section-subtitle reveal">Projects from my resume and portfolio</p>

      <div className="projects-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <ProjectCard project={PROJECTS[0]} index={0} isFeatured={true} />
          <ProjectCard project={PROJECTS[2]} index={2} isFeatured={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <ProjectCard project={PROJECTS[3]} index={3} isFeatured={false} />
          <ProjectCard project={PROJECTS[1]} index={1} isFeatured={true} />
        </div>
      </div>
    </section>
  );
}

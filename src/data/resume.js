// ─── Resume / CV ───────────────────────────────────────────────────────────────
export const RESUME_URL = '/sunny_resume.pdf';
export const RESUME_FILENAME = 'Sunny_Gautam_Resume.pdf';

// ─── Profile ───────────────────────────────────────────────────────────────────
export const PROFILE = {
  name: 'Sunny Gautam',
  title: 'Software Developer',
  email: 'sunnygautam@example.com', // ← update with your real email
  phone: '+91 6200036944',
  phoneHref: 'tel:+916200036944',
  linkedin: 'https://www.linkedin.com/in/sunny-gautam-3b830031b/',
  github: 'https://github.com/SGhubatgit',
  summary:
    'Motivated Computer Science student with hands-on experience in software development, backend systems, and AI-based applications. Skilled in Python, JavaScript, Flask, and Django with practical knowledge of full-stack development and machine learning projects.',
  objective:
    'To obtain a Software Development Internship where I can contribute to real-world projects, strengthen my technical skills, and grow as a developer.',
};

// ─── Projects ──────────────────────────────────────────────────────────────────
// Update codeUrl/liveUrl with actual repo links when available
export const PROJECTS = [
  {
    title: 'Healthcare+ Platform',
    tag: 'Web Application',
    techStack: ['React', 'Node.js', 'MongoDB', 'CSS3'],
    desc: 'End-to-end digital health workflow platform supporting appointments, emergency dispatch, and digital lab tests all in one dashboard.',
    bgGrad: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
    featured: true,
    image: '/healthcare.png',
    codeUrl: 'https://github.com/SGhubatgit',
    liveUrl: null,
  },
  {
    title: 'Crop Disease Prediction System',
    tag: 'Machine Learning · Flask',
    techStack: ['Python', 'Flask', 'ML', 'HTML5', 'CSS3'],
    desc: 'Crop disease prediction app using machine learning for user input and image analysis. Flask backend with integrated frontend, focused on early disease detection to improve farming productivity.',
    bgGrad: 'linear-gradient(135deg, #4a9a4a 0%, #2c5f2c 100%)',
    featured: true,
    image: '/crop_predicition.png',
    codeUrl: 'https://github.com/SGhubatgit',
    liveUrl: null,
  },
  {
    title: 'Wallpaper Gallery Application',
    tag: 'HTML5 · CSS3 · JavaScript',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    desc: 'Responsive wallpaper gallery with clean UI, structured layout, and responsive design principles.',
    bgGrad: 'linear-gradient(135deg, #d7ba67 0%, #c9a840 100%)',
    featured: false,
    image: '/wallpaper_project.png',
    codeUrl: 'https://github.com/SGhubatgit',
    liveUrl: null,
  },
  {
    title: 'Flask To-Do Application',
    tag: 'Python · Flask · SQLite',
    techStack: ['Python', 'Flask', 'SQLite'],
    desc: 'Task management application with CRUD operations, Flask routing, and backend task handling.',
    bgGrad: 'linear-gradient(135deg, #8bb3ad 0%, #6a9b94 100%)',
    featured: false,
    image: '/todo_app_mockup.png',
    codeUrl: 'https://github.com/SGhubatgit',
    liveUrl: null,
  },
];

// ─── Experience / Timeline ─────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    type: 'education',
    title: 'B.Tech — Computer Science & Engineering',
    organization: 'Parul University',
    period: '2022 – Present',
    detail: 'CPI: 7.53',
    description:
      'Pursuing B.Tech in CSE with a focus on software development, data structures, algorithms, and AI applications.',
  },
  {
    type: 'activity',
    title: 'Winter of Code',
    organization: 'Open Source Contribution',
    period: '2023',
    detail: 'Contributor',
    description:
      'Contributed to open-source projects, collaborated with developers worldwide, and sharpened Git workflows and code review skills.',
  },
  {
    type: 'education',
    title: 'Class XII',
    organization: 'Bihar Board',
    period: '2022',
    detail: '76%',
    description: 'Completed higher secondary education with a focus on science and mathematics.',
  },
  {
    type: 'education',
    title: 'Class X',
    organization: 'CBSE Board',
    period: '2020',
    detail: '75%',
    description: 'Completed secondary education with strong academic performance across all subjects.',
  },
];

// ─── Achievements / Certifications Badges ─────────────────────────────────────
export const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Winter of Code', subtitle: 'Open Source Contributor', color: '#d7ba67' },
  { icon: '🎓', title: 'B.Tech CSE', subtitle: 'Parul University · CPI 7.53', color: '#7d9ec7' },
  { icon: '⚡', title: 'Full Stack Dev', subtitle: 'Python · JS · React', color: '#d88c6a' },
  { icon: '🤖', title: 'ML Projects', subtitle: 'Crop Disease AI System', color: '#8bb3ad' },
  { icon: '💻', title: 'Open Source', subtitle: 'GitHub Contributor', color: '#4a9a4a' },
  { icon: '🐍', title: 'Python Expert', subtitle: '85%+ Proficiency', color: '#3a7ebf' },
  { icon: '🔧', title: 'Backend Dev', subtitle: 'Flask · Django · Node', color: '#a87852' },
  { icon: '🌐', title: 'Web Dev', subtitle: 'HTML · CSS · React', color: '#7b68ee' },
];

// ─── Skill Proficiency Bars ────────────────────────────────────────────────────
export const SKILL_PROFICIENCY = [
  { name: 'HTML & CSS', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'Flask / Django', level: 80 },
  { name: 'Git & GitHub', level: 80 },
  { name: 'JavaScript', level: 75 },
  { name: 'Machine Learning', level: 70 },
  { name: 'React', level: 65 },
  { name: 'Java', level: 60 },
];

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// Sign up at https://emailjs.com → create a service → create a template → copy IDs below
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',     // ← replace
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',   // ← replace
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',     // ← replace
};

// ─── Currently Learning ────────────────────────────────────────────────────────
export const CURRENTLY_LEARNING = [
  { label: 'TypeScript',        icon: '🟦' },
  { label: 'Next.js',           icon: '▲' },
  { label: 'System Design',     icon: '🏗️' },
  { label: 'Docker & DevOps',   icon: '🐳' },
  { label: 'DSA & Algorithms',  icon: '🧠' },
];

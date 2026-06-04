import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomCursor   from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import PageReveal     from './components/PageReveal';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import Experience     from './components/Experience';
import Achievements   from './components/Achievements';
import Skills         from './components/Skills';
import Projects       from './components/Projects';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import NotFound       from './components/NotFound';
import BackToTop      from './components/BackToTop';
import CommandPalette from './components/CommandPalette';

const THEME_KEY = 'sg_theme';

function Portfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply / remove data-theme attribute + persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDark = () => setDarkMode((d) => !d);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette  = () => setPaletteOpen(true);
  const closePalette = () => setPaletteOpen(false);

  // Intersection Observer — scroll-reveal for all .reveal elements
  useEffect(() => {
    const reveals  = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  // Parallax drift on hero section while scrolling
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) hero.style.transform = `translateY(${window.scrollY * 0.04}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <PageReveal />
      <Navbar darkMode={darkMode} onToggleDark={toggleDark} onOpenPalette={openPalette} />

      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Achievements />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Contact />
      <Footer />
      <BackToTop />
      <CommandPalette
        onToggleDark={toggleDark}
        open={paletteOpen}
        onOpen={openPalette}
        onClose={closePalette}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Portfolio />} />
        <Route path="*"  element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

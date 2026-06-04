import React, { useEffect, useRef, useState } from 'react';

// Only show on devices that have a real pointer (no touch-only)
const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasPointer) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const setHover = () => {
      ringRef.current?.classList.add('cursor-hover');
      dotRef.current?.classList.add('cursor-hover');
    };
    const clearHover = () => {
      ringRef.current?.classList.remove('cursor-hover');
      dotRef.current?.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    raf = requestAnimationFrame(animateRing);

    // Delegate hover detection to interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .honeycomb-cell, .project-card, .social-btn, .nav-logo, .btn-resume, .theme-toggle').forEach((el) => {
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', clearHover);
      });
    };
    // Run once now and after a short delay (for dynamically added elements)
    addHoverListeners();
    const timer = setTimeout(addHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot${visible ? ' visible' : ''}`} />
      <div ref={ringRef} className={`cursor-ring${visible ? ' visible' : ''}`} />
    </>
  );
}

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { PROFILE, EMAILJS_CONFIG } from '../data/resume';

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus]   = useState('idle');
  const [copied, setCopied]   = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Check if EmailJS is configured
    if (
      EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      // Fallback: open mail client
      const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.location.href = mailto;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const magnetic = {
    onMouseMove(e) {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.35;
      const y = (e.clientY - r.top  - r.height / 2) * 0.35;
      e.currentTarget.style.transform = `translate(${x}px, ${y}px) translate(-2px, -3px)`;
    },
    onMouseLeave(e) { e.currentTarget.style.transform = ''; },
  };

  return (
    <>
      {/* Toast notification */}
      <div className={`toast ${status === 'success' ? 'show toast-success' : status === 'error' ? 'show toast-error' : ''}`}>
        {status === 'success' ? '✓ Message sent! I\'ll get back to you soon.' : '✗ Something went wrong. Please try again.'}
      </div>

      <section id="contact">
        <p className="section-label reveal" style={{ textAlign: 'center' }}>Contact</p>
        <h2 className="section-title reveal" style={{ textAlign: 'center' }}>Let&apos;s Connect</h2>
        <p className="hero-sub reveal" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '480px' }}>
          {PROFILE.objective}
        </p>

        <form ref={formRef} className="contact-form reveal" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Name"
            required
            disabled={status === 'sending'}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Email"
            required
            disabled={status === 'sending'}
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-input form-span-2"
            placeholder="Subject"
            disabled={status === 'sending'}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-input form-span-2"
            placeholder="Your Message"
            required
            disabled={status === 'sending'}
          />
          <button
            type="submit"
            className={`btn-cta ${status === 'sending' ? 'btn-sending' : ''}`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <><span className="btn-spinner" /> Sending…</>
            ) : (
              'Get in Touch →'
            )}
          </button>
        </form>

        <div className="contact-socials reveal">
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

        <p className="contact-email reveal">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <button
            className={`copy-email-btn${copied ? ' copied' : ''}`}
            onClick={copyEmail}
            title={copied ? 'Copied!' : 'Copy email'}
            aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
          >
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </button>
          {' · '}
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {' · '}
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </section>
    </>
  );
}

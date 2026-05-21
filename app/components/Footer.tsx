'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) return;
    const mailto = `mailto:bergen.celloforening@gmail.com?subject=Melding fra ${encodeURIComponent(name)}&body=${encodeURIComponent(`Navn: ${name}\nE-post: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <footer id="kontakt" className={styles.footer}>
      <div className={styles.footerContent}>

        {/* 联系信息 */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎻 Kontakt oss</h2>
          <p style={{ marginBottom: '0.5rem' }}>📧 <a href="mailto:bergen.celloforening@gmail.com" style={{ color: 'inherit' }}>bergen.celloforening@gmail.com</a></p>
          <p style={{ marginBottom: '0.5rem' }}>📍 Bergen, Norge</p>
          <p>En plass hvor unge musikere vokser og utvikler seg</p>
        </div>

        {/* 联系表单 */}
        {sent ? (
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>✅ Takk! Vi åpner e-postprogrammet ditt nå.</p>
        ) : (
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Send oss en melding</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <input
                type="text"
                placeholder="Ditt navn"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #ccc', fontSize: '0.95rem', background: 'rgba(255,255,255,0.1)', color: 'inherit' }}
              />
              <input
                type="email"
                placeholder="Din e-postadresse"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #ccc', fontSize: '0.95rem', background: 'rgba(255,255,255,0.1)', color: 'inherit' }}
              />
              <textarea
                placeholder="Din melding..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                style={{ padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #ccc', fontSize: '0.95rem', background: 'rgba(255,255,255,0.1)', color: 'inherit', resize: 'vertical' }}
              />
              <button
                onClick={handleSubmit}
                style={{ padding: '0.7rem', background: '#2a7a6f', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}
              >
                Send melding →
              </button>
            </div>
          </div>
        )}

        <p className={styles.copyright}>© 2026 Bergen Celloforeningen</p>
      </div>
    </footer>
  );
}

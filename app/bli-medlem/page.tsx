'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BliMedlem() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
    repertoire: '',
    teacherName: '',
    teacherEmail: '',
  });
  const [sent, setSent] = useState(false);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { name, age, phone, address, repertoire, teacherName, teacherEmail } = form;
    if (!name || !age || !phone || !address) return;

    const body = `
Navn: ${name}
Alder: ${age}
Telefon: ${phone}
Adresse: ${address}
Nåværende repertoar: ${repertoire}
Celloslærer: ${teacherName}
Lærerens e-post: ${teacherEmail}
    `.trim();

    const mailto = `mailto:bergen.celloforening@gmail.com?subject=Ny medlemsregistrering – ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inputStyle = {
    padding: '0.7rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    width: '100%',
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 600 as const,
    marginBottom: '0.3rem',
    display: 'block' as const,
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f5', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', background: 'white', borderRadius: '1.2rem', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        
        {/* 返回按钮 */}
        <Link href="/" style={{ fontSize: '0.9rem', color: '#2a7a6f', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Tilbake til forsiden
        </Link>

        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🎻 Bli Medlem</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Fyll ut skjemaet nedenfor for å registrere deg som medlem i Bergen Celloforeningen.</p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '2rem' }}>✅</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Takk for registreringen!</p>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Vi åpner e-postprogrammet ditt. Send e-posten for å fullføre registreringen.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.7rem 1.5rem', background: '#2a7a6f', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>
              Tilbake til forsiden
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={labelStyle}>Cellists navn *</label>
              <input style={inputStyle} type="text" placeholder="Fullt navn" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Alder *</label>
              <input style={inputStyle} type="number" placeholder="f.eks. 12" value={form.age} onChange={e => update('age', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Telefonnummer *</label>
              <input style={inputStyle} type="tel" placeholder="f.eks. 400 00 000" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Adresse *</label>
              <input style={inputStyle} type="text" placeholder="Gate, postnummer, by" value={form.address} onChange={e => update('address', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Nåværende repertoar</label>
              <input style={inputStyle} type="text" placeholder="f.eks. Bach Suite nr. 1" value={form.repertoire} onChange={e => update('repertoire', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Celloslærer</label>
              <input style={inputStyle} type="text" placeholder="Lærerens navn" value={form.teacherName} onChange={e => update('teacherName', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Lærerens e-postadresse</label>
              <input style={inputStyle} type="email" placeholder="laerer@example.com" value={form.teacherEmail} onChange={e => update('teacherEmail', e.target.value)} />
            </div>
            <button
              onClick={handleSubmit}
              style={{ padding: '0.8rem', background: '#2a7a6f', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem' }}
            >
              Send registrering →
            </button>
            <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'center' }}>* obligatoriske felt</p>
          </div>
        )}
      </div>
    </main>
  );
}
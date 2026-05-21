'use client';

import { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

interface Event {
  id: number;
  title: string;
  date: Date;
  icon: string;
}

interface StoredEvent {
  id: number;
  title: string;
  dateStr: string;
  icon: string;
}

const ICONS = ['🎪','🧁','🦄','🍦','🎨','🎬','🎻','🎵','🌟','🎉'];

const DEFAULT_EVENTS: StoredEvent[] = [
  { id: 1, title: 'Musikalsk Lekedag', dateStr: '2026-05-15', icon: '🎪' },
  { id: 2, title: 'Mini Konsert & Kaker', dateStr: '2026-05-22', icon: '🧁' },
  { id: 3, title: 'Eventyr med Cello', dateStr: '2026-05-28', icon: '🦄' },
  { id: 4, title: 'Sommer-konsert i Parken', dateStr: '2026-06-05', icon: '🍦' },
  { id: 5, title: 'Cello-workshop for Nybegynnere', dateStr: '2026-06-12', icon: '🎨' },
  { id: 6, title: 'Film Musikk Spesial', dateStr: '2026-06-19', icon: '🎬' },
];

function toEvent(s: StoredEvent): Event {
  return { ...s, date: new Date(s.dateStr) };
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [storedEvents, setStoredEvents] = useState<StoredEvent[]>(DEFAULT_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newIcon, setNewIcon] = useState('🎻');

  // 从 localStorage 读取
  useEffect(() => {
    const saved = localStorage.getItem('cello-events');
    if (saved) setStoredEvents(JSON.parse(saved));
  }, []);

  const saveEvents = (events: StoredEvent[]) => {
    setStoredEvents(events);
    localStorage.setItem('cello-events', JSON.stringify(events));
  };

  const addEvent = () => {
    if (!newTitle || !newDate) return;
    const newEvent: StoredEvent = {
      id: Date.now(),
      title: newTitle,
      dateStr: newDate,
      icon: newIcon,
    };
    saveEvents([...storedEvents, newEvent]);
    setNewTitle('');
    setNewDate('');
    setNewIcon('🎻');
    setShowForm(false);
  };

  const deleteEvent = (id: number) => {
    saveEvents(storedEvents.filter(e => e.id !== id));
  };

  const events = storedEvents.map(toEvent);

  const monthNames = ['Januar','Februar','Mars','April','Mai','Juni',
                      'Juli','August','September','Oktober','November','Desember'];
  const dayNames = ['Ma','Ti','On','To','Fr','Lø','Sø'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  const getDayEvents = (day: number) =>
    events.filter(e =>
      e.date.getDate() === day &&
      e.date.getMonth() === month &&
      e.date.getFullYear() === year
    );

  const weekdayShort = (day: number) => {
    const d = new Date(year, month, day);
    const dow = d.getDay();
    return dayNames[dow === 0 ? 6 : dow - 1];
  };

  const agendaDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    .map(day => ({ day, dayEvents: getDayEvents(day) }))
    .filter(({ dayEvents }) => dayEvents.length > 0);

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = adjustedStart - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className={`${styles.calendarDay} ${styles.otherMonth}`}>
          <div className={styles.dayNumber}>{prevMonthDays - i}</div>
        </div>
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getDayEvents(day);
      days.push(
        <div key={`current-${day}`} className={styles.calendarDay}>
          <div className={styles.dayNumber}>{day}</div>
          {dayEvents.map(event => (
            <div key={event.id} className={styles.calendarEvent} title={event.title}>
              <span className={styles.calendarEventIcon} aria-hidden>{event.icon}</span>
              <span className={styles.calendarEventLabel}>{event.title}</span>
            </div>
          ))}
        </div>
      );
    }
    const totalCells = adjustedStart + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let day = 1; day <= remainingCells; day++) {
        days.push(
          <div key={`next-${day}`} className={`${styles.calendarDay} ${styles.otherMonth}`}>
            <div className={styles.dayNumber}>{day}</div>
          </div>
        );
      }
    }
    return days;
  };

  return (
    <section id="kalender" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Aktivitetskalender</h2>
          <p className={styles.sectionSubtitle}>Hold deg oppdatert på alle våre arrangementer</p>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ marginTop: '1rem', padding: '0.5rem 1.2rem', background: '#2a7a6f', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            {showForm ? '✕ Avbryt' : '＋ Legg til aktivitet'}
          </button>
        </div>

        {/* 添加活动表单 */}
        {showForm && (
          <div style={{ background: '#f8f8f8', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Aktivitetsnavn</label>
              <input
                type="text"
                placeholder="f.eks. Konsert i Bergen"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #ccc', fontSize: '0.95rem', minWidth: '220px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Dato</label>
              <input
                type="date"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #ccc', fontSize: '0.95rem' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ikon</label>
              <select
                value={newIcon}
                onChange={e => setNewIcon(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #ccc', fontSize: '1.1rem' }}
              >
                {ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <button
              onClick={addEvent}
              style={{ padding: '0.5rem 1.2rem', background: '#2a7a6f', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', height: '2.2rem' }}
            >
              Lagre
            </button>
          </div>
        )}

        <div className={styles.calendarWrapper}>
          <div className={styles.calendarHeader}>
            <h3 className={styles.calendarMonth}>{monthNames[month]} {year}</h3>
            <div className={styles.calendarNav}>
              <button type="button" className={styles.calendarBtn} onClick={() => setCurrentDate(new Date(year, month - 1, 1))} aria-label="Forrige måned">
                <span className={styles.calendarBtnWide}>← Forrige</span>
                <span className={styles.calendarBtnNarrow} aria-hidden>‹</span>
              </button>
              <button type="button" className={styles.calendarBtn} onClick={() => setCurrentDate(new Date(year, month + 1, 1))} aria-label="Neste måned">
                <span className={styles.calendarBtnWide}>Neste →</span>
                <span className={styles.calendarBtnNarrow} aria-hidden>›</span>
              </button>
            </div>
          </div>
          <div className={styles.calendarGridPanel}>
            <div className={styles.calendarGrid}>
              {dayNames.map(day => (
                <div key={day} className={styles.calendarDayHeader}>{day}</div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>
          <div className={styles.calendarListPanel} role="region" aria-label="Aktiviteter i valgt måned">
            {agendaDays.length === 0 ? (
              <p className={styles.agendaEmpty}>Ingen aktiviteter denne måneden.</p>
            ) : (
              <ul className={styles.agendaList}>
                {agendaDays.map(({ day, dayEvents }) => (
                  <li key={day} className={styles.agendaDay}>
                    <div className={styles.agendaDateRow}>
                      <span className={styles.agendaDayNum}>{day}.</span>
                      <span className={styles.agendaWeekday}>{weekdayShort(day)}</span>
                    </div>
                    <ul className={styles.agendaEvents}>
                      {dayEvents.map(event => (
                        <li key={event.id} className={styles.agendaEventRow} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>
                            <span className={styles.agendaEventIcon} aria-hidden>{event.icon}</span>
                            <span className={styles.agendaEventTitle}>{event.title}</span>
                          </span>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '0.85rem', marginLeft: '0.5rem' }}
                            title="Slett"
                          >✕</button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
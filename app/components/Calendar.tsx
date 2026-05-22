'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  icon: string;
  type: string;
}

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

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
    events.filter(e => {
      const d = new Date(e.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = adjustedStart - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} style={{ padding: '0.4rem', minHeight: '60px', opacity: 0.3, borderRadius: '8px' }}>
          <span style={{ fontSize: '0.85rem' }}>{prevMonthDays - i}</span>
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getDayEvents(day);
      const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
      days.push(
        <div key={`current-${day}`} style={{
          padding: '0.4rem',
          minHeight: '60px',
          borderRadius: '8px',
          background: dayEvents.length > 0 ? 'rgba(42, 122, 111, 0.1)' : isToday ? 'rgba(42, 122, 111, 0.05)' : 'transparent',
          border: isToday ? '2px solid #2a7a6f' : '1px solid transparent',
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: isToday ? 700 : 400 }}>{day}</span>
          {dayEvents.map(e => (
            <div key={e.id} style={{ fontSize: '0.7rem', background: '#2a7a6f', color: 'white', borderRadius: '4px', padding: '2px 4px', marginTop: '2px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {e.icon} {e.title}
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
          <div key={`next-${day}`} style={{ padding: '0.4rem', minHeight: '60px', opacity: 0.3, borderRadius: '8px' }}>
            <span style={{ fontSize: '0.85rem' }}>{day}</span>
          </div>
        );
      }
    }
    return days;
  };

  return (
    <section id="kalender" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Aktivitetskalender</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>Medlemshelger og arrangementer</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* 左边：日历 */}
          <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#2a7a6f' }}>‹</button>
              <strong>{monthNames[month]} {year}</strong>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#2a7a6f' }}>›</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
              {dayNames.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: '#999', padding: '0.3rem 0' }}>{d}</div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>

          {/* 右边：即将到来的活动 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ margin: 0 }}>Kommende arrangementer</h3>
            {upcomingEvents.length === 0 ? (
              <p style={{ color: '#999' }}>Ingen kommende arrangementer.</p>
            ) : (
              upcomingEvents.map(event => (
                <div key={event.id} style={{ background: 'white', borderRadius: '1rem', padding: '1.2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid #2a7a6f' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{event.icon}</span>
                    <strong style={{ fontSize: '1.1rem' }}>{event.title}</strong>
                  </div>
                  <p style={{ color: '#2a7a6f', fontWeight: 600, fontSize: '0.9rem', margin: '0.2rem 0' }}>
                    📅 {new Date(event.date).toLocaleDateString('nb-NO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.2rem 0' }}>📍 {event.location}</p>
                  <p style={{ fontSize: '0.9rem', margin: '0.4rem 0 0' }}>{event.description}</p>
                </div>
              ))
            )}
            <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
              Nye arrangementer legges til fortløpende.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
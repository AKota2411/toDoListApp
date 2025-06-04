import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const pastelDayBg = '#FFFFFF';
const pastelDayBorder = '#C8D6C1';
const pastelSelected = '#E7C9A9';
const pastelEvent = '#BFD8D2';

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function getWeekDays(year: number, month: number, day: number) {
  // Returns the days for the week containing the given day (1-indexed)
  const date = new Date(year, month, day);
  const weekDay = date.getDay(); // 0 (Sun) - 6 (Sat)
  const start = day - weekDay;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const week: (number | null)[] = [];
  for (let i = 0; i < 7; i++) {
    const d = start + i;
    if (d < 1 || d > daysInMonth) {
      week.push(null);
    } else {
      week.push(d);
    }
  }
  return week;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const viewOptions = ['Daily', 'Weekly', 'Monthly'] as const;
type ViewType = typeof viewOptions[number];

// Mock events for demo
const todayDate = new Date();
const todayDay = todayDate.getDate();
const mockEvents: Record<number, { time: string; title: string }[]> = {
  1: [ { time: '9:00am', title: 'Yoga' }, { time: '2:00pm', title: 'Meeting' } ],
  2: [ { time: '10:00am', title: 'Dentist' } ],
  3: [ { time: '8:00am', title: 'Breakfast' }, { time: '6:00pm', title: 'Dinner' } ],
  5: [ { time: '1:00pm', title: 'Study' } ],
  6: [ { time: '7:00pm', title: 'Call Mom' } ],
  // Add mock events for today
  [todayDay]: [
    { time: '8:30am', title: 'Morning Run' },
    { time: '11:00am', title: 'Team Standup' },
    { time: '3:00pm', title: 'Coffee with Alex' },
    { time: '7:00pm', title: 'Read a Book' }
  ]
};

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(today.getDate());
  const [view, setView] = useState<ViewType>('Monthly');
  const history = useHistory();

  const days = getMonthDays(year, month);

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
    setSelected(null);
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
    setSelected(null);
  }

  function goToTasks(day: number) {
    history.push(`/tasks/${year}/${month + 1}/${day}`);
  }

  // Renderers for each view
  function renderMonthlyView() {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 2.5rem)',
        gap: '0.5rem',
        background: '#FFFFFF',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: '0 2px 12px rgba(191, 216, 210, 0.10)'
      }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} style={{
            textAlign: 'center',
            color: '#A89F91',
            fontWeight: 600,
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
          }}>{d}</div>
        ))}
        {days.map((d, i) => (
          <div
            key={i}
            onClick={() => d && goToTasks(d)}
            style={{
              height: '2.5rem',
              width: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: d === selected ? pastelSelected : pastelDayBg,
              border: `1.5px solid ${pastelDayBorder}`,
              borderRadius: '1.2rem',
              color: d === selected ? '#A89F91' : '#5A5A5A',
              fontWeight: 600,
              fontSize: '1.1rem',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
              cursor: d ? 'pointer' : 'default',
              opacity: d ? 1 : 0
            }}
          >
            {d || ''}
          </div>
        ))}
      </div>
    );
  }

  function renderWeeklyView() {
    const baseDay = selected || today.getDate();
    const week = getWeekDays(year, month, baseDay);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        background: '#FFFFFF',
        borderRadius: '1.5rem',
        padding: '1.5rem 0.5rem',
        boxShadow: '0 2px 12px rgba(191, 216, 210, 0.10)',
        width: '95vw',
        maxWidth: '900px',
        minWidth: '320px',
        minHeight: '50vh',
        height: '60vh',
        margin: '0 auto',
        border: `1.5px solid ${pastelDayBorder}`,
        overflowX: 'auto',
        overflowY: 'auto',
      }}>
        {week.map((d, i) => {
          // Sort events by time (assume format like '9:00am', '2:00pm')
          let events = d && mockEvents[d] ? [...mockEvents[d]] : [];
          events.sort((a, b) => {
            const to24 = (t: string) => {
              const [time, ampm] = t.split(/(am|pm)/);
              let [h, m] = time.split(':').map(Number);
              if (ampm === 'pm' && h !== 12) h += 12;
              if (ampm === 'am' && h === 12) h = 0;
              return h * 60 + (m || 0);
            };
            return to24(a.time) - to24(b.time);
          });
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.7rem 0.5rem',
                  cursor: d ? 'pointer' : 'default',
                  opacity: d ? 1 : 0.3,
                  background: d === selected ? pastelSelected : 'transparent',
                  borderRadius: '1rem',
                  transition: 'background 0.2s',
                  marginBottom: 0,
                  minWidth: '90px',
                  position: 'relative',
                  height: '100%',
                  boxSizing: 'border-box',
                  maxHeight: '100%',
                  minHeight: '0',
                  flexGrow: 1,
                  flexBasis: 0
                }}
                onClick={() => d && goToTasks(d)}
              >
                <div style={{
                  color: d === selected ? '#A89F91' : '#5A5A5A',
                  fontWeight: 700,
                  fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
                  fontSize: '1.1rem',
                  background: d === selected ? pastelDayBg : 'transparent',
                  borderRadius: '1rem',
                  marginBottom: '0.5rem',
                  padding: '0.2rem 0.8rem',
                  boxShadow: d === selected ? '0 2px 8px rgba(191, 216, 210, 0.10)' : 'none',
                  display: 'inline-block'
                }}>{d || ''}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
                  {events.length > 0 ? events.map((event, idx) => (
                    <div key={idx} style={{
                      background: pastelEvent,
                      color: '#5A5A5A',
                      borderRadius: '1.2rem',
                      padding: '0.4rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 500,
                      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
                      boxShadow: '0 1px 4px rgba(191, 216, 210, 0.10)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                      border: 'none',
                      outline: 'none',
                      display: 'block',
                      marginBottom: '0.1rem',
                    }}
                    title={event.title + ' at ' + event.time}
                    >
                      <span style={{ fontWeight: 600 }}>{event.time}</span> {event.title}
                    </div>
                  )) : (
                    <div style={{ color: '#C8D6C1', fontSize: '0.98rem', textAlign: 'center', marginTop: '0.5rem' }}>
                      No events
                    </div>
                  )}
                </div>
              </div>
              {i < week.length - 1 && (
                <div style={{
                  width: '2px',
                  background: pastelDayBorder,
                  margin: '0 0.2rem',
                  alignSelf: 'stretch',
                  position: 'relative',
                  height: '100%',
                  minHeight: '0',
                  flexShrink: 0
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  function renderDailyView() {
    // Use selected day or today if none selected
    const baseDay = selected || today.getDate();
    const events = mockEvents[baseDay] || [];
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: '1.5rem',
        padding: '2rem 2.5rem',
        boxShadow: '0 2px 12px rgba(191, 216, 210, 0.10)',
        marginTop: '1rem',
        minWidth: '200px',
        minHeight: '100px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          fontSize: '1.2rem',
          color: '#A89F91',
          fontWeight: 600,
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
          marginBottom: '1rem'
        }}>
          {monthNames[month]} {baseDay}, {year}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
          {events.length > 0 ? events.map((event, idx) => (
            <div key={idx} style={{
              background: pastelEvent,
              color: '#5A5A5A',
              borderRadius: '1.2rem',
              padding: '0.5rem 1.2rem',
              fontSize: '1.05rem',
              fontWeight: 500,
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
              boxShadow: '0 1px 4px rgba(191, 216, 210, 0.10)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              border: 'none',
              outline: 'none',
              display: 'block',
            }}
            title={event.title + ' at ' + event.time}
            >
              <span style={{ fontWeight: 600 }}>{event.time}</span> {event.title}
            </div>
          )) : (
            <div style={{ color: '#C8D6C1', fontSize: '1rem', textAlign: 'center', marginTop: '0.5rem' }}>
              No events
            </div>
          )}
        </div>
      </div>
    );
  }

  let viewContent;
  if (view === 'Monthly') viewContent = renderMonthlyView();
  else if (view === 'Weekly') viewContent = renderWeeklyView();
  else viewContent = renderDailyView();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5DC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button onClick={prevMonth} style={{
          background: '#C8D6C1',
          border: 'none',
          borderRadius: '1.5rem',
          padding: '0.5rem 1.2rem',
          fontSize: '1.2rem',
          marginRight: '1rem',
          cursor: 'pointer'
        }}>{'<'}</button>
        <h2 style={{
          color: '#A89F91',
          fontFamily: "'Baloo 2', 'Quicksand', 'Segoe UI', Arial, sans-serif",
          fontSize: '2rem',
          margin: 0
        }}>
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} style={{
          background: '#C8D6C1',
          border: 'none',
          borderRadius: '1.5rem',
          padding: '0.5rem 1.2rem',
          fontSize: '1.2rem',
          marginLeft: '1rem',
          cursor: 'pointer'
        }}>{'>'}</button>
      </div>
      {viewContent}
      {/* View Switcher at the bottom */}
      <div style={{
        display: 'flex',
        gap: '1.2rem',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '2rem',
        left: 0,
        right: 0
      }}>
        {viewOptions.map(option => (
          <button
            key={option}
            onClick={() => setView(option)}
            style={{
              background: view === option
                ? 'linear-gradient(135deg, #E7C9A9 60%, #C8D6C1 100%)'
                : '#FFFFFF',
              color: view === option ? '#A89F91' : '#5A5A5A',
              border: 'none',
              borderRadius: '2rem',
              padding: '0.9rem 2.2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: view === option
                ? '0 4px 16px rgba(191, 216, 210, 0.18)'
                : '0 2px 8px rgba(191, 216, 210, 0.08)',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
              letterSpacing: '0.5px',
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

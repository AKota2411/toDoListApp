import React, { useState } from 'react';

const pastelDayBg = '#FFFFFF';
const pastelDayBorder = '#C8D6C1';
const pastelSelected = '#E7C9A9';

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);

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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5DC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
      padding: '2rem 1rem'
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
            onClick={() => d && setSelected(d)}
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
    </div>
  );
}

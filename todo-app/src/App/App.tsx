import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Calendar from '../Calendar';

// Add more motivational quotes
const motivationalQuotes = [
  "Every day is a fresh start.",
  "Small steps every day.",
  "You are capable of amazing things.",
  "Progress, not perfection.",
  "Stay positive, work hard, make it happen.",
  "Believe in yourself and all that you are.",
  "You've got this!",
  "One thing at a time.",
  "Your only limit is your mind.",
  "Difficult roads often lead to beautiful destinations.",
  "Be gentle with yourself.",
  "You are stronger than you think.",
  "Keep going, you're getting there.",
  "Success is built on daily habits.",
  "Let today be the start of something new.",
  "You are doing better than you think.",
  "Celebrate every small victory.",
  "You can do hard things.",
  "The best time for new beginnings is now.",
  "Your future is created by what you do today."
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning!';
  if (hour >= 12 && hour < 17) return 'Good Afternoon!';
  if (hour >= 17 && hour < 22) return 'Good Evening!';
  return 'Hello!';
}

function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5DC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
      padding: '0 1rem'
    }}>
      <header style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h1 style={{
          color: '#A89F91',
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          fontWeight: 600,
          letterSpacing: '1px',
          fontFamily: "'Baloo 2', 'Quicksand', 'Segoe UI', Arial, sans-serif"
        }}>{getGreeting()}</h1>
        <p style={{
          color: '#6B7A6F', // darker sage/earth tone
          fontSize: '1.2rem',
          fontStyle: 'italic',
          marginBottom: '2rem',
          fontWeight: 500
        }}>
          "{getRandomQuote()}"
        </p>
      </header>
      <nav style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link to="/calendar" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(135deg, #C8D6C1 60%, #E7C9A9 100%)',
            color: '#5A5A5A',
            border: 'none',
            borderRadius: '2rem',
            padding: '1.1rem 2.2rem',
            fontSize: '1.15rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.1s',
            boxShadow: '0 4px 16px rgba(191, 216, 210, 0.18)',
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
            marginBottom: '0.5rem',
            letterSpacing: '0.5px'
          }}>Calendar</button>
        </Link>
        <button style={{
          background: 'linear-gradient(135deg, #C8D6C1 60%, #E7C9A9 100%)',
          color: '#5A5A5A',
          border: 'none',
          borderRadius: '2rem',
          padding: '1.1rem 2.2rem',
          fontSize: '1.15rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.1s',
          boxShadow: '0 4px 16px rgba(191, 216, 210, 0.18)',
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
          marginBottom: '0.5rem',
          letterSpacing: '0.5px'
        }}>Tasks</button>
        <button style={{
          background: 'linear-gradient(135deg, #C8D6C1 60%, #E7C9A9 100%)',
          color: '#5A5A5A',
          border: 'none',
          borderRadius: '2rem',
          padding: '1.1rem 2.2rem',
          fontSize: '1.15rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.1s',
          boxShadow: '0 4px 16px rgba(191, 216, 210, 0.18)',
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
          marginBottom: '0.5rem',
          letterSpacing: '0.5px'
        }}>Assignments</button>
        <button style={{
          background: 'linear-gradient(135deg, #C8D6C1 60%, #E7C9A9 100%)',
          color: '#5A5A5A',
          border: 'none',
          borderRadius: '2rem',
          padding: '1.1rem 2.2rem',
          fontSize: '1.15rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.1s',
          boxShadow: '0 4px 16px rgba(191, 216, 210, 0.18)',
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
          marginBottom: '0.5rem',
          letterSpacing: '0.5px'
        }}>AI Assistant</button>
      </nav>
      <section style={{
        background: '#FFFFFF',
        borderRadius: '2rem',
        boxShadow: '0 2px 12px rgba(191, 216, 210, 0.10)',
        padding: '2rem 2.5rem',
        marginTop: '1rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          color: '#A89F91',
          fontSize: '1.3rem',
          marginBottom: '1rem',
          fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
        }}>Today's Overview</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{
            color: '#5A5A5A',
            fontSize: '1.05rem',
            marginBottom: '0.7rem',
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
          }}>3 Everyday Tasks left</li>
          <li style={{
            color: '#5A5A5A',
            fontSize: '1.05rem',
            marginBottom: '0.7rem',
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
          }}>2 Day-Specific Tasks at 2pm, 4pm</li>
          <li style={{
            color: '#5A5A5A',
            fontSize: '1.05rem',
            marginBottom: '0.7rem',
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
          }}>1 Assignment due tomorrow</li>
        </ul>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </Router>
  );
}

export default App;

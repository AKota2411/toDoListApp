import React from 'react';
import styles from './App.module.css';

const motivationalQuotes = [
  "Every day is a fresh start.",
  "Small steps every day.",
  "You are capable of amazing things.",
  "Progress, not perfection.",
  "Stay positive, work hard, make it happen."
];

const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Good Morning!</h1>
        <p className={styles.quote}>"{getRandomQuote()}"</p>
      </header>
      <nav className={styles.nav}>
        <button className={styles.navButton}>Calendar</button>
        <button className={styles.navButton}>Tasks</button>
        <button className={styles.navButton}>Assignments</button>
        <button className={styles.navButton}>AI Assistant</button>
      </nav>
      <section className={styles.overview}>
        <h2>Today's Overview</h2>
        <ul>
          <li>3 Everyday Tasks left</li>
          <li>2 Day-Specific Tasks at 2pm, 4pm</li>
          <li>1 Assignment due tomorrow</li>
        </ul>
      </section>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css'
import Cards from './Card';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome, Admin</h1>
        {/* Add any additional header content as needed */}
      </header>
      <nav className={styles.nav}>
        <div className={styles.navHeader}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#club-management">Club Management</a></li>
          <li><a href="#booking-management">Booking Management</a></li>
          <li><a href="#venue-management">Venue Management</a></li>
          <li><a href="#reports-analytics">Reports & Analytics</a></li>
        </ul>
      </nav>
      <main className={styles.main}>
        {/* Add body content as needed */}

      </main>
      <footer className={styles.footer}>
        {/* Add footer content as needed */}
      </footer>
    </div>
  );
};

export default Dashboard;

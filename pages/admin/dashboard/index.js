import React, { useState } from 'react';
import styles from '../../../styles/Dashboard.module.css'
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className='text-primary'>Welcome, Admin</h1>
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

      <div className={styles.content}>
      <div className={styles.contentLeft}>
      <div><h1>Admin Dashboard</h1></div>
      </div>
      <div className={styles.contentRight}>
      <RegisterForm/>
      </div>
      </div>
        

        {/* Add body content as needed */}

      </main>
      <footer className={styles.footer}>
        {/* Add footer content as needed */}
      </footer>
    </div>
  );
};

export default Dashboard;

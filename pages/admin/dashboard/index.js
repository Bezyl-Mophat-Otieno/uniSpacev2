import React, { useState } from 'react';
import styles from '../../../styles/Dashboard.module.css'
import AdminNav from '@/components/AdminNav';
import BookingsTable from '@/components/BookingsTable';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* <h1 className='text-primary h5 mb-2'>Welcome, Admin</h1> */}
        {/* Add any additional header content as needed */}
      </header>
      <nav className={styles.nav}>
      <AdminNav/>
      </nav>
      <div className='text-start h2 ms-5 fw-bold mb-1 mt-5 text-decoration-underline'> Booking Standings</div>
      <main className={styles.main}>
      <div className={styles.content}>
      <BookingsTable/>
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

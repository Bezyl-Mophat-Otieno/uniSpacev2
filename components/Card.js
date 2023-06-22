import React from 'react';
import styles from '../styles/Card.module.css'
import org2 from '../public/org2.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Cards = () => {
  // Sample data for cards
  const cards = [
    { id: 1, title: 'Card 1', description: 'Lorem ipsum dolor sit amet.', image: org2 },
    { id: 2, title: 'Card 2', description: 'Consectetur adipiscing elit.', image: org2 },
    { id: 3, title: 'Card 3', description: 'Sed do eiusmod tempor incididunt.', image: org2 },
  ];

  return (
    <div className={styles.dashboard}>
      {/* ... Rest of the dashboard layout ... */}
      <main className={styles.main}>
        <h2>Featured Cards</h2>
        <div className={styles.cardContainer}>
          {cards.map((card) => (

    <Card style={{ width: '18rem' }}>
    <Card.Header>Venue</Card.Header>
    <Card.Body>
      <Card.Title>Venue Name</Card.Title>
      <Card.Text>
       Venu Location
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
 
          ))}
        </div>
      </main>
      {/* ... Rest of the dashboard layout ... */}
    </div>



   


  );
};

export default Cards;

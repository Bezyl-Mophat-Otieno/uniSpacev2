import React from 'react'
import styles from '../styles/VenueCard.module.css'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


function VenueCard({button,venue}) {
  return (
  <div class="col mb-5 mt-5 ">
    <Card style={{ width: '18rem' }}>
    <Card.Header>Venue Details</Card.Header>
    <Card.Body className='shadow-lg'>
      <Card.Title>{venue.name}</Card.Title>
      <Card.Text>
       {venue.location}
      </Card.Text>
    { button &&  <Button variant="primary"><Link href='/admin/booking-management/history/1' className='text-white text-decoration-none'> {button} </Link></Button>}
      {
        !button &&      <div className='d-flex justify-content-between'>
          <Button variant="success">Update</Button>
          <Button variant="danger">Remove</Button>
          </div>
      }
  </Card.Body>
  </Card>

      
    </div>
  )
}

export default VenueCard

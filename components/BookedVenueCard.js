import React, { useEffect, useState } from 'react'
import styles from '../styles/BookedVenue.module.css'
import { Button, Card } from 'react-bootstrap'
import moment from 'moment'
import  Alert  from '@/components/Alert';
import { useSelector } from 'react-redux';
import axios from 'axios';

function BookedVenueCard({booking , setCancelSuccess}) {
  const {user} = useSelector(state=>state.user)
  const handleCancelBooking = async()=>{
    const requestBody = {
      venueName: booking.venueName,
      orgName: user.name
    }
    try{
      await axios.put('http://localhost:3000/api/org/book/cancel',requestBody)
      setCancelSuccess(true)
      
      
    }catch(err){
      setCancelSuccess(false)
    }


  }

  return (
    
    booking === undefined ? <div className='d-flex justify-content-center '> <Alert message={'The Venue selected is either not Booked or Temporarily Unavailable'} color={'alert-warning'} url={'/user/dashboard'}/> </div>  :
    <div class=" d-flex justify-content-center h-100 mt-5">
    <Card className={` w-75 h-50 ${styles.card}`} >
    <Card.Header>Booking Receipt</Card.Header>
    <Card.Body className={styles.cardBody}>
      <Card.Title></Card.Title>
      <div className='fw-bolder'>Club Name</div>
      <Card.Text>
       {booking.orgName}
      </Card.Text>
      <div className='fw-bolder'>Booked Date</div>
      <Card.Text>
      {moment(booking.bookingDate).format('MMMM Do YYYY, h:mm: a')}
      </Card.Text>
      <div className='fw-bolder'>Valid Until</div>
      <Card.Text>
      {moment(booking.validUntil).format('MMMM Do YYYY, h:mm: a')}
      </Card.Text>
      { user===null ? null : user.name === booking.orgName && <Button variant='outline-danger' onClick={handleCancelBooking}> Cancel Booking</Button>}
  </Card.Body>
  </Card>

      
    </div>

  )
}

export default BookedVenueCard

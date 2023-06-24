import React, { useEffect, useState } from 'react'
import styles from '../styles/VenueCardClub.module.css'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Alert from './Alert'
import { useRouter } from 'next/router'
import axios from 'axios'
import BookingForm from './BookingForm'
import moment from 'moment'

function VenueCardClub({venue}) {
  const router = useRouter()
  const [dateSelected , setDateSelected] = useState("")
  const [displayCalender,setDisplayCalender] =useState(false)
  const [invalidDateSelecton,setinvalidDateSelecton] = useState(false)
  const today = new Date();
  const twoDaysAhead = new Date();
  twoDaysAhead.setDate(twoDaysAhead.getDate()+2)

  useEffect(()=>{
    if( dateSelected > moment(today).format('YYYY-MM-DD')  && dateSelected <= moment(twoDaysAhead).format('YYYY-MM-DD')  ){
      alert('Ok do something')

    }else{
      setinvalidDateSelecton(true)

    }



  },[dateSelected])

  const handleBook = ()=>{
    
  }


  return (
<div class="col mb-5 mt-5 ">
    <Card className={styles.card} >
    <Card.Header>Venue Details</Card.Header>
    <Card.Body className={styles.cardBody}>
      <Card.Title>{venue.name}</Card.Title>
      <Card.Text>
       {venue.location}
      </Card.Text>
      {
        //Check the booking status of the card 
        !venue.bookedStatus ? (
          // Check if the calender should be displayed 
          !displayCalender && 
          <Button variant='primary' onClick={()=>setDisplayCalender(true)}>Choose Booking Date</Button>
        ):(
          <input className={styles.input} disabled value={'Booked By...'}/>
        )
        // display the calender on the button click
      }
      
    { displayCalender && <input className={styles.input} type='date' value={dateSelected} onChange={(e)=>setDateSelected(e.target.value)} />}
   </Card.Body>
  </Card>
</div>
  )
}

export default VenueCardClub



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
import { useSelector } from 'react-redux'
import { set } from 'mongoose'

function VenueCardClub({venue}) {
  const router = useRouter()
  const [dateSelected , setDateSelected] = useState("")
  const [displayCalender,setDisplayCalender] =useState(false)
  const [invalidDateSelecton,setinvalidDateSelecton] = useState(false)
  const [bookingSuccess , setBookingSuccess] = useState(false)
  const today = new Date();
  const twoDaysAhead = new Date();
  const {user} = useSelector(state=>state.user)
  twoDaysAhead.setDate(twoDaysAhead.getDate()+2)
  const handleChange = (e)=>{
    setDateSelected(e.target.value)
  }

  useEffect(()=>{
    if( dateSelected > moment(today).format('YYYY-MM-DD')  && dateSelected <= moment(twoDaysAhead).format('YYYY-MM-DD')  ){
      setinvalidDateSelecton(false)

    }else{
      setinvalidDateSelecton(true)

    }
  },[dateSelected])
// 
  const handleBooking = async()=>{

    try {
      const requestBody = { venueName:venue.name ,orgName:user , bookingDate:dateSelected }

      await axios.put(`http://localhost:3000/api/org/book/${venue.name}`,requestBody)
      setBookingSuccess(true)
      
    } catch (error) {
      alert(error)
      setBookingSuccess(false)
      
    }
    
  }

  return (
<div class="col mb-5 mt-5 ">
{bookingSuccess && <Alert message={'Venue Booked Successfully'} color={'alert-success'}/>}
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
      
    { displayCalender && 
    <>
    <input className={styles.input} type='date' value={dateSelected} onChange={(e)=>handleChange(e)} />
    {
      !invalidDateSelecton ? <Button className={styles.input} variant='primary' onClick={handleBooking} >Book Now</Button> :
      <>
      <Button className={styles.input} variant='primary' onClick={()=>handleBooking} disabled>Book Now</Button>
      { (!dateSelected == "" && invalidDateSelecton ) && <div className='text-center text-danger fw-bold'> Invalid Date selected </div> }
      </>


    }
    </>
    }
   </Card.Body>
  </Card>
</div>
  )
}

export default VenueCardClub



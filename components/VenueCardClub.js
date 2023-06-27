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

function VenueCardClub({venue}) {
  const router = useRouter()
  const [dateSelected , setDateSelected] = useState("")
  const [displayCalender,setDisplayCalender] =useState(false)
  const [invalidDateSelecton,setinvalidDateSelecton] = useState(false)
  const {user} = useSelector(state=>state.user)

  const [bookingSuccess , setBookingSuccess] = useState(false)
  const today = new Date();
  const twoDaysAhead = new Date();
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
      const requestBody = { venueName:venue.name ,orgName:user.name , bookingDate:dateSelected }

      await axios.put(`http://localhost:3000/api/org/book/${venue._id}`,requestBody)
      setBookingSuccess(true)

      
    } catch (error) {
      alert(error)
      setBookingSuccess(false)
      
    }
    
  }



  return (
    <Link href={`http://localhost:3000/user/dashboard/booking-info/${venue.name}`}>

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
        !venue.bookedStatus === null ? "" : !venue.bookedStatus ? (
          // Check if the calender should be displayed 
          !displayCalender && (
          venue.isAvailable ?
          ( user === null ? "": !user.venueAssignment ? <Button className={styles} onClick={()=>setDisplayCalender(true)}>Choose Booking Date</Button> : <Button className={styles.bookAction} onClick={()=>setDisplayCalender(true)} disabled>Choose Booking Date</Button>):
          <Button variant=' btn-outline-secondary' className='text-center border-2 border-secondary text-secondary' disabled>Venue Temporarily Unavailable</Button>
          ) 
        ):(
          // Display the booked by name
          <input className={`text-center border-2 border-success text-success ${styles.input}`} disabled value={'Booked'}/>

          
        )
        // display the calender on the Button click
      }
      
    { displayCalender && 
    <>
    <input className={styles.input} type='date' value={dateSelected} onChange={(e)=>handleChange(e)} />
    {

      !invalidDateSelecton ? <Button className={styles} variant='primary' onClick={handleBooking} >Book Now</Button> :
      <> 
      
     <Button className={styles.bookAction} variant='primary'  onClick={()=>handleBooking} disabled>Book Now</Button>     
      
      { (!dateSelected == "" && invalidDateSelecton ) && <div className='text-center text-danger fw-bold'> Invalid Date selected </div> }
      </>


    }
    </>
    }
   </Card.Body>
  </Card>
</div>
    </Link>
  )
}

export default VenueCardClub



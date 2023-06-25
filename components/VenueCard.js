import React, { useEffect, useState } from 'react'
import styles from '../styles/VenueCard.module.css'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Alert from './Alert'
import { useRouter } from 'next/router'
import axios from 'axios'

function VenueCard({button,venue , setDeleteSuccess , setDeleteFail }) {
  const router = useRouter()
  const [enableSuccess,setEnableSuccess] = useState(false)
  const [disableSuccess,setDisableSuccess] = useState(false)
  const [venueAvailability , setVenueAvailability] = useState(venue.isAvailable)
  const handleDelete = async()=>{
    try {
      await axios.delete(`http://localhost:3000/api/admin/venues/${venue._id}`)
      setDeleteSuccess(true) 
      setDeleteFail(false)     
    } catch (error) {
      setDeleteFail(true)
      setDeleteSuccess(false) 


    }
  }
  const handleDisable = async()=>{

    try {
       await axios.put(`http://localhost:3000/api/admin/venues/disable/${venue._id}`)
       setDisableSuccess(true)
       setEnableSuccess(false)
       setVenueAvailability(!venue.isAvailable)
       
      } catch (error) {
        
      }
    }
    const handleEnable = async()=>{
      
      try {
        await axios.put(`http://localhost:3000/api/admin/venues/enable/${venue._id}`)
        setEnableSuccess(true)
        setDisableSuccess(false)
        setVenueAvailability(!venue.isAvailable)

      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    router.push('/admin/venue-management/venues')

  },[venueAvailability])


  return (
  <div class="col mb-5 mt-5 ">
    { enableSuccess && <Alert message={'Venue is now available for bookings'} color={'alert-success'}/> }
     { disableSuccess && <Alert message={'Venue is now not available for booking'} color={'alert-warning'}/> }
    <Card className={styles.card} >
    <Card.Header>Venue Details</Card.Header>
    <Card.Body className={styles.cardBody}>
      <Card.Title>{venue.name}</Card.Title>
      <Card.Text>
       {venue.location}
      </Card.Text>
    { button &&  <Button variant="primary"><Link href='/admin/booking-management/history/1' className='text-white text-decoration-none'> {button} </Link></Button>}
      {
        !button &&      <div className='d-flex justify-content-between'>
         { <Button variant="success" onClick={venueAvailability ? handleDisable : handleEnable} > { venueAvailability ? "Disable Venue" : "Enable Venue"} </Button>}
          <Button variant="danger" onClick={handleDelete}>Remove Venue</Button>
          </div>
      }
  </Card.Body>
  </Card>

      
    </div>
  )
}

export default VenueCard

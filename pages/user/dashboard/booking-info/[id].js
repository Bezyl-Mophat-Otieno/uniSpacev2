import React from 'react'
import axios from 'axios'
import UserNav from '@/components/UserNav'
import styles from '../../../../styles/BookingHistory.module.css'

import BookedVenueCard from '@/components/BookedVenueCard'

function VenueBookHistory({bookings}) {
  const arraySize = bookings.length === 1 ? 0 : bookings.length;
    return (
    <div className={styles.container} >
    <UserNav/>
    <BookedVenueCard booking={bookings[arraySize]}/>
    </div>
  )
}

export default VenueBookHistory

export async function getServerSideProps({params}) {

  try {

    const res = await axios.get(`http://localhost:3000/api/admin/bookings/${params.id}`)
    return {
      props:{
        bookings:await res.data
      }
    }
    
  } catch (error) {
    
  }


}


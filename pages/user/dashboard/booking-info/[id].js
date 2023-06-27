import React from 'react'
import axios from 'axios'
import UserNav from '@/components/UserNav'
import SingleBookingInfo from '@/components/SingleBookingInfo'

function VenueBookHistory({booking}) {
  console.log(booking)
  return (
    <div>
    <UserNav/>
    <SingleBookingInfo booking={booking}/>
    </div>
  )
}

export default VenueBookHistory

export async function getServerSideProps({params}) {

  try {

    const res = await axios.get(`http://localhost:3000/api/org/book/${params.id}`)
    return {
      props:{
        booking:await res.data
      }
    }
    
  } catch (error) {
    
  }


}


import AdminNav from '@/components/AdminNav'
import BookingHistoryTable from '@/components/BookingHistoryTable'
import React from 'react'
import axios from 'axios'

function VenueBookHistory({bookings}) {
  return (
    <div>
    <AdminNav/>
    <BookingHistoryTable  bookings={bookings}/>     
    </div>
  )
}

export default VenueBookHistory

export async function getServerSideProps(context) {
  const {params} = context;
  const myCookie = context.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination:"/",
        permanent: false,
      },
    };
  }
  

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

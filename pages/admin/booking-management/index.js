import React from 'react'
import VenueCard from '@/components/VenueCard'
import AdminNav from '@/components/AdminNav'
import axios from 'axios'
import BookingsTable from '@/components/BookingsTable'
function index({bookings}) {
  const fromDashboard = false;
  return (
    <>
    <AdminNav/>
    {/* <div className='ms-3 row row-cols-4 me-3'> */}
    <BookingsTable fromDashboard={fromDashboard} bookings={bookings}/>
    {/* </div> */}
    </>
  )
}

export default index
export const getServerSideProps = async (context)=>{
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
    const res = await axios.get("http://localhost:3000/api/admin/bookings")

    return {
      props: {
        bookings: await res.data
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}



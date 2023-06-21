import React from 'react'
import VenuesTable from '@/components/VenuesTable'
import AdminNav from '@/components/AdminNav'
import VenueCard from '@/components/VenueCard'
function index() {
  return (
    <>
      <AdminNav/>
       <div className='text-start h2 ms-5 mt-5 fw-bold mb-0 text-decoration-underline'> Venues Available For Bookings </div>
            {/* <VenuesTable/> */}
            <div className=' ms-3 row row-cols-4 me-3'>
            <VenueCard/>
            <VenueCard/>
            <VenueCard/>
            <VenueCard/>
            <VenueCard/>
            <VenueCard/>
            <VenueCard/>

            </div>
    </>

  )
}

export default index

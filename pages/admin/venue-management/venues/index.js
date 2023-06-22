import React from 'react'
import VenuesTable from '@/components/VenuesTable'
import AdminNav from '@/components/AdminNav'
import VenueCard from '@/components/VenueCard'
import axios from 'axios'
function index({venues}) {
  return (
    <>
      <AdminNav/>
       <div className='text-start h2 ms-5 mt-5 fw-bold mb-0 text-decoration-underline'> Venues Available For Bookings </div>
            {/* <VenuesTable/> */}
            <div className=' ms-3 row row-cols-4 me-3'>

            {
              venues.map((venue)=>(
                  <VenueCard venue={venue}/>
              ))
            }


            </div>
    </>

  )
}

export default index

export const getServerSideProps = async ()=>{

  try {
    const res = await axios.get("http://localhost:3000/api/admin/venues")

    return {
      props: {
        venues: await res.data
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

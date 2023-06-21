import React from 'react'
import VenueCard from '@/components/VenueCard'
import AdminNav from '@/components/AdminNav'
function index() {
  return (
    <>
    <AdminNav/>
    <div className='ms-3 row row-cols-4 me-3'>
    <VenueCard button={'View History'}/>
    <VenueCard button={'View History'}/>
    <VenueCard button={'View History'}/>
    <VenueCard button={'View History'}/>
    <VenueCard button={'View History'}/>
    <VenueCard button={'View History'}/>
    </div>
    </>
  )
}

export default index

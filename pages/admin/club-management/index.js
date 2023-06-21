import AdminNav from '@/components/AdminNav'
import ClubsTable from '@/components/ClubsTable'
import React from 'react'

function index() {
  return (
    <div>
    <AdminNav/>
    <h3 className='text-start ms-5 mt-5 mb-1 text-decoration-underline fw-bold '> Registered Clubs,Societies and Student Organizations. </h3>
    <ClubsTable/>
    </div>
  )
}

export default index

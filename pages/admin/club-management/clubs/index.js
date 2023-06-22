import AdminNav from '@/components/AdminNav'
import ClubsTable from '@/components/ClubsTable'
import React from 'react'
import axios from 'axios'

function index({clubs}) {
  return (
    <div>
    <AdminNav/>
    <h3 className='text-start ms-5 mt-5 mb-1 text-decoration-underline fw-bold '> Registered Clubs,Societies and Student Organizations. </h3>
    <ClubsTable clubs={clubs}/>
    </div>
  )
}

export default index

export const getServerSideProps = async ()=>{

  try {
    const res = await axios.get("http://localhost:3000/api/admin/register")

    return {
      props: {
        clubs: await res.data
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

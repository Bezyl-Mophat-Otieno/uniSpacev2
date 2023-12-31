import React from 'react'
import VenuesTable from '@/components/VenuesTable'
import AdminNav from '@/components/AdminNav'
import VenueCard from '@/components/VenueCard'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'

function index({venues}) {
  const router = useRouter()
  const [deleteSuccess,setDeleteSuccess] = useState(null)
  const [deletefail,setDeleteFail] = useState(null)
  const [warning ,setWarning ] = useState(null)

  useEffect(()=>{
 
    router.push('/admin/venue-management/venues')
     
   },[deleteSuccess])
  return (
    <>
      <AdminNav/>

            {
              <div className='d-flex justify-content-center '>
             {deleteSuccess && <Alert className={'w-50'} message={'Venue Removed Successfully'} color={'alert-success'}/>}
              </div>
        
      } 
        <div className='d-flex justify-content-center '>
          {  
           warning && <Alert action={setWarning} message={'Venue is Currently booked, try again later' } color={'alert-info'} url={'/admin/venue-management/venues'} />
          }
        </div>
        
       <div className='text-start h2 ms-5 mt-5  mb-0 text-decoration-underline'> Venues Available For Bookings </div>
            {/* <VenuesTable/> */}
      {
        <div className='d-flex justify-content-center w-50'>
             {deletefail && <Alert className={'w-50'} message={'Venue Deletion Failed'} color={'alert-warning'}/>}
         </div>
        
      } 
            <div className=' ms-3 row row-cols-4 me-3'>

            {
              venues.map((venue)=>(
                  <VenueCard setWarning={setWarning} setDeleteSuccess={setDeleteSuccess} setDeleteFail={setDeleteFail} venue={venue}/>
              ))
            }


            </div>
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



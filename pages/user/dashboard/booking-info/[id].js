import React, { useState } from 'react'
import axios from 'axios'
import UserNav from '@/components/UserNav'
import styles from '../../../../styles/BookingHistory.module.css'
import Alert from '@/components/Alert'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import BookedVenueCard from '@/components/BookedVenueCard'
import { useDispatch } from 'react-redux'
import { updateUser } from '@/redux/userSlice'
import { assignVenue } from '@/redux/userSlice'


function VenueBookHistory({bookings}) {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  const [cancelSuccess , setCancelSuccess] = useState(null)

  const arraySize = bookings.length >=1 ? 0 : bookings.length;

  useEffect(()=>{

    if(cancelSuccess){

      const fetchClubUpdate = async () => {
        const res = await axios.get(`http://localhost:3000/api/admin/register/${user===null?null:user._id}`)
        dispatch(updateUser( await res.data))    
      }
      
      const fetchBooking = async ()=>{
              try {
          dispatch(assignVenue(null))  
        } catch (error) {
          
        }
      }

       
     
      fetchClubUpdate()
      fetchBooking()
      

    }
  },[cancelSuccess])
    return (
    <div className={styles.container} >
    <UserNav/>
    {  cancelSuccess && 
    <div className='d-flex justify-content-center '>
    <Alert message={'Booking Cancelled Successfully '} color={'alert-success'} url={'/user/dashboard'} action={setCancelSuccess}/>
    </div>
    }
    <BookedVenueCard setCancelSuccess={setCancelSuccess} booking={bookings[arraySize]}/>
    </div>
  )
}

export default VenueBookHistory

export async function getServerSideProps(context) {

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
    const {params} = context
    const res = await axios.get(`http://localhost:3000/api/admin/bookings/${params.id}`)
    return {
      props:{
        bookings:await res.data
      }
    }
    
  } catch (error) {
    
  }


}



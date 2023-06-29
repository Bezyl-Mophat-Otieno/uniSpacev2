import AdminNav from '@/components/AdminNav'
import ClubsTable from '@/components/ClubsTable'
import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'
import{ useRouter } from 'next/router'
import Alert from '@/components/Alert'

function index({clubs}) {
  const router = useRouter()
  const [deleteSuccess,setDeleteSuccess] = useState(null)
  const [deletefail,setDeleteFail] = useState(null)
  const [enableSuccess,setEnableSuccess] = useState(false)
  const [disableSuccess,setDisableSuccess] = useState(false)
  const [warning ,setWarning ] = useState(null)
  useEffect(()=>{
 
    router.push('/admin/club-management/clubs')
     
   },[deleteSuccess,disableSuccess,enableSuccess])
  return (
    <div>
    <AdminNav/>
    <div className='d-flex justify-content-center'>
    {  
      warning && <Alert action={setWarning} message={'Currently the club has an assigned Venue , try again later' } color={'alert-info'} url={'/admin/club-management/clubs'} />
    }
    {  
      enableSuccess && <Alert action={setEnableSuccess} message={'Enabled Successfully , This club can now book a venue.' } color={'alert-success'} url={'/admin/club-management/clubs'} />
    }
    {  
      deleteSuccess && <Alert action={setDeleteSuccess} message={'Club Deleted Successfully' } color={'alert-danger'}/>
    }
    {  
      disableSuccess && <Alert action={setDisableSuccess} message={'Disabled Successfully , This club would not be allowed to book a venue.' } color={'alert-success'}/>
    }
    </div>
    <h3 className='text-start ms-5 mt-5 mb-1 text-decoration-underline'> Registered Clubs,Societies and Student Organizations. </h3>
    <ClubsTable setWarning={setWarning} enableSucces={enableSuccess} deleteSuccess={deleteSuccess} disableSuccess={disableSuccess}  setDisableSuccess={setDisableSuccess} setEnableSuccess={setEnableSuccess} deletefail={deletefail} setDeleteFail={setDeleteFail} setDeleteSuccess={setDeleteSuccess}  clubs={clubs}/>
    </div>
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



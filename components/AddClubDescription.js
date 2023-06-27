import React, { useEffect } from 'react'
import styles from '@/styles/SetPassword.module.css'
import Alert from './Alert'
import { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { updateUser } from '@/redux/userSlice'
import { useSelector } from 'react-redux'

function AddClubDescription({user , setLoggedInUser }) {

    const [clubDesc,setClubDesc] = useState("")
    const [success,setSuccess]= useState(null)
    const [error,setError]= useState(null)
    const router=useRouter()
    const dispatch = useDispatch()
   
    const handleAddDesc =async ()=>{
      try {
        const requestBody = {clubDesc}
  
        await axios.put(`http://localhost:3000/api/admin/register/${user._id}`, requestBody)
        setSuccess(true)
        setError(false)
        router.push('/user/dashboard')
        
      } catch (error) {
  
        setSuccess(false)
        setError(true)
        
      }
  
  
    }

    useEffect(()=>{
      if(success){

        const fetchClubUpdate = async () => {
          const res = await axios.get(`http://localhost:3000/api/admin/register/${user._id}`)
          dispatch(updateUser(res.data)) 
          setLoggedInUser(res.data)   
        }
        fetchClubUpdate()
      }
    },[success])
  return (
    <div>
    {success && <Alert message={'Club Description Added Successfully'} color={'alert-success'}/>}
    { error &&<Alert message={'Club Description Added Successfully'} color={'alert-warning'}/>}
    <div className={styles.formGroup}>
            <textarea type="text" row={3} className={styles.input} id="description" placeholder="Add Club`s Description" onChange={(e)=>setClubDesc(e.target.value)}/>
           { clubDesc && <Button onClick={handleAddDesc}>Add Description</Button> }
    </div>
    </div>
  )
}

export default AddClubDescription

import React from 'react'
import Link from 'next/link'
import styles from '../styles/ClubsTable.module.css'
import { Table } from 'react-bootstrap'
import { useRouter } from 'next/router';
import { useState , useEffect } from 'react';
import axios from 'axios';

function ClubsTable({clubs , setDeleteSuccess , deleteSuccess ,disableSuccess , setWarning,enableSuccess , setDisableSuccess ,setEnableSuccess, setDeleteFail }) {

  const router = useRouter()
  
  const [venueAvailability , setVenueAvailability] = useState(null)
  const handleDelete = async(club)=>{

    try {
      await axios.delete(`http://localhost:3000/api/admin/clubs/${club._id}`)
      setDeleteSuccess(true) 
      setDeleteFail(false)     
    } catch (error) {
      alert(error)
      setDeleteFail(true)
      setDeleteSuccess(false) 


    }
  }
  const handleDisable = async(club)=>{

    try {
       await axios.put(`http://localhost:3000/api/admin/clubs/disable/${club._id}`)
       setDisableSuccess(true)
       setEnableSuccess(false)
       setVenueAvailability(!club.isActive)
       
      } catch (error) {
        alert(error)
        
      }
    }
    const handleEnable = async(club)=>{
      
      try {
        await axios.put(`http://localhost:3000/api/admin/clubs/enable/${club._id}`)
        setEnableSuccess(true)
        setDisableSuccess(false)
        setVenueAvailability(!club.isActive)

      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    router.push('/admin/club-management/clubs')

  },[  enableSuccess , disableSuccess , deleteSuccess])

  return (
<div className={styles.container}>
<div className={styles.wrapper}>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Unique Identifier</th>
          <th>Passkey</th>
          <th>Club Name</th>
          <th>Registered Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
        clubs.map((club,index)=>(
        <tr>
          <td>{index}</td>
          <td>{club._id}</td>
          <td>{club.passkey}</td>
          <td>{club.name}</td>
          <td>{club.role}</td>
          {
            club.venueAssignment? 
        (<div className='d-flex justify-content-between'>
         { <button  className={`disabled ${styles.btnAction}`} onClick={club.isActive ? ()=>setWarning(true):()=>setWarning(true)} > { club.isActive ? "Disable Venue" : "Enable Venue"} </button>}
          <button   className={`${styles.btnDelete}`} onClick={()=>setWarning(true) }>Delete Club</button>
          </div>)

           : (<div className='d-flex justify-content-between'>
         { <button   className={styles.btnAction} onClick={club.isActive ? ()=>handleDisable(club) :()=>handleEnable(club)} > { club.isActive ? "Disable Venue" : "Enable Venue"} </button>}
          <button   className={`${styles.btnDelete}`} onClick={()=>handleDelete(club) }>Delete Club</button>
          </div>)
      }
          
        </tr>
        ))
      }
      </tbody>
    </Table>
</div>
</div>
  )
}

export default ClubsTable

import React from 'react'
import styles from '../styles/RegisterVenue.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Alert from './Alert'

function RegisterVenue() {
  const router = useRouter();
    const [name,setName]=useState("")
    const [location,setLocation]=useState("")
    const [capacity,setCapacity]=useState(0)
    const [error , setError] = useState(null)
    const [success , setSuccess] = useState(null)

    const handleAddVenue = ()=>{
      const requestBody = {
        name,location,capacity
      }
        try {
          const res = axios.post('http://localhost:3000/api/admin/venues',requestBody)
          res.data && setSuccess(true)
          success && router.push('/admin/venue-management/venues')
        } catch (error) {
          console.log(error)
          error &&  router.push('/admin/venue-management/addVenue')
          setError(true)
          
        }

    }
  return (
    <div>

<div className={styles.formContainer}>
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Venue Registration</h3>
        { success && <Alert message={'Venue added successfully'} color={'alert-success'} />}
        { error && <Alert message={'Something went wrong , Venue not added'} color={'alert-warning'} />}
      </div>
      <div className={styles.cardBody}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="venueName" className={styles.label}>Venue Name</label>
            <input type="text" className={styles.input} id="venueName" placeholder="Enter venue name" onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="capacity" className={styles.label}>Capacity</label>
            <input type="number" className={styles.input} id="capacity" placeholder="Venue capacity"  onChange={(e)=>{setCapacity(e.target.value)}}  />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>Location</label>
            <input type="text" className={styles.input} id="location" placeholder="Venue location"  onChange={(e)=>{setLocation(e.target.value)}}  />
          </div>
        </form>
          <button type="submit" className={styles.buttonLog} onClick={handleAddVenue}>Add Venue</button>
          <div className={'d-flex justify-content-center flex-row text-center'}>
          </div>
      </div>
    </div>

    </div>
      
    </div>
  )
}

export default RegisterVenue

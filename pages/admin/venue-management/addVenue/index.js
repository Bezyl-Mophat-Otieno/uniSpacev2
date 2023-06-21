import RegisterVenue from '@/components/RegisterVenue'
import styles from '../../../../styles/addVenuePage.module.css'

import React from 'react'
import AdminNav from '@/components/AdminNav'

function AddVenuePage() {
  return (
    <>
    <AdminNav/>
    <div className={styles.container}>
    <RegisterVenue/>   
    </div>
    </>
  )
}

export default AddVenuePage

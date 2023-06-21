import React from 'react'
import styles from '../styles/VenueCard.module.css'
import Link from 'next/link'

function VenueCard({button}) {
  return (
  <div class="col mb-5 mt-5">
    <div class={`${styles.card} card text-center w-100 shadow-lg`}>
      <div class="card-body">
        <h5 class="card-title">Name</h5>
        <p class="card-text">Location</p>
        <a href="#" class="btn btn-primary">{button ? <Link href='/admin/booking-management/history/1' className='text-white text-decoration-none'> {button} </Link>: "Status" }</a>
      </div>

  </div>
      
    </div>
  )
}

export default VenueCard

import React from 'react'
import styles from '../styles/BookingsTable.module.css'
import Link from 'next/link'
import { Table } from 'react-bootstrap'
function BookingsTable({bookings}) {
  return (
<div className={styles.container}>
<div className={styles.wrapper}>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Venue Name</th>
          <th>Club Name</th>
          <th>Booking Date</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
      {
        bookings.map((booking,index)=>(

        <tr>
          <td>{index}</td>
          <td>{booking.venueName}</td>
          <td>{booking.orgName}</td>
          <td>{booking.bookingDate}</td>
          <td>{booking.validUntil}</td>
        </tr>
        ))
      }

      </tbody>
    </Table>
</div>
</div>
  )
}

export default BookingsTable

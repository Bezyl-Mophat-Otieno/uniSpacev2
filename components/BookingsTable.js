import React from 'react'
import styles from '../styles/BookingsTable.module.css'
import Link from 'next/link'
import moment from 'moment'
import { Badge, Table ,Button } from 'react-bootstrap'

function BookingsTable({bookings ,fromDashboard}) {

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
          {/* {alert('June 23rd 2023, 12:01am'<'June 23rd 2023, 12:00pm')} */}
          <td>{index}</td>
          <td>{booking.venueName}</td>
          <td>{booking.orgName}</td>
          <td>{moment(booking.bookingDate).format('MMMM Do YYYY, h:mm: a')}</td>
          <td className='position-relative'>{ moment(booking.validUntil).format('MMMM Do YYYY, h:mm: a')}
          {
            moment(new Date()) < moment(booking.validUntil) && (
                <span class="position-absolute top-0 start-100 translate-middle p-0 bg-success border border-light rounded-pill">
                <span class=" badge rounded-pill">active</span>
                </span>

            )
          }
      {    fromDashboard ? "" : <td className='d-flex justify-content-between'>
          <Link href={`/admin/booking-management/history/${booking.venueName}`}>  <Button variant="primary">View History</Button></Link>
          </td>
}
          </td>
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

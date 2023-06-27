import React from 'react'
import styles from '../styles/BookingHistory.module.css'
import Link from 'next/link'
import moment from 'moment'
import { Table , Button } from 'react-bootstrap'

function BookingHistoryTable({booking}) {
  //TODO : Implement the booking history by looking into the booking collection and getting documents for a specific Venue and then looping through and picking necessary information.
  //TODO:Update Venue information
  //TODO:Check into the isAvaisable property.

  return (
<div className={styles.container}>
<div className={styles.wrapper}>
<div className='btn btn-primary'>{booking.venueName}</div>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Club Name</th>
          <th>Booked Date</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>

      {
        <tr>
          <td>{index}</td>
          <td>{booking.orgName}</td>
          <td>{moment(booking.validUntil).format('MMMM Do YYYY, h:mm: a')}</td>
                    <td className='position-relative'>{ moment(booking.validUntil).format('MMMM Do YYYY, h:mm: a')}
          {
            moment(new Date()).format('MMMM Do YYYY, h:mm: a') < moment(booking.validUntil).format('MMMM Do YYYY, h:mm: a') && (
                <span class="position-absolute top-0 start-100 translate-middle p-0 bg-success border border-light rounded-pill">
                <span class=" badge rounded-pill">active</span>
                </span>

            )
          }
          <td className='d-flex justify-content-between'>
          <Link href={`/admin/booking-management/history/${booking.venueName}`}>  <Button variant="primary">View History</Button></Link>
          </td>
          </td>
        </tr>

      }
       
      </tbody>
    </Table>
</div>
</div>
  )
}

export default BookingHistoryTable

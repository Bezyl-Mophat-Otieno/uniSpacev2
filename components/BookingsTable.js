import React from 'react'
import styles from '../styles/BookingsTable.module.css'
import Link from 'next/link'
function BookingsTable() {
  return (
<div className={styles.container}>
<div className={styles.wrapper}>
<table class="table table-striped table-hover table-bordered border-black">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <div className='d-flex justify-content-between' >
        <Link href='#' className='btn btn-outline-success '> Edit </Link>
        <Link href='#' className=' btn btn-outline-danger '> Delete </Link>
     </div>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <div className='d-flex justify-content-between' >
        <Link href='#' className='btn btn-outline-success '> Edit </Link>
        <Link href='#' className=' btn btn-outline-danger '> Delete </Link>
     </div>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td >Larry the Bird</td>
      <td >Haroun</td>
      <td>@twitter</td>
      <div className='d-flex justify-content-between' >
        <Link href='#' className='btn btn-outline-success '> Edit </Link>
        <Link href='#' className=' btn btn-outline-danger '> Delete </Link>
     </div>
    </tr>
  </tbody>
</table>
</div>
</div>
  )
}

export default BookingsTable

import React from 'react'
import Link from 'next/link'
import styles from '../styles/ClubsTable.module.css'
import { Table } from 'react-bootstrap'
import index from '../pages/admin/booking-management/index';
import {Button} from 'react-bootstrap';

function ClubsTable({clubs}) {
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
          <td className='d-flex justify-content-between'>
          <Button variant="outline-success">Edit</Button>{' '}
          <Button variant="outline-danger">Delete</Button>{' '}
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

export default ClubsTable

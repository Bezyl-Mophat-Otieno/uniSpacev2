import React, { useState } from 'react'
import Link from 'next/link'
import { logout } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import Alert from './Alert';







function AdminNav() {
  const [logoutSuccess , setLogoutSuccess] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const handleLogout  = async()=>{
      await axios.get('/api/logout')
      dispatch(logout())
      setLogoutSuccess(true)
      router.push('/')
    }
  return (
<>
<div className='d-flex justify-content-center'>
 { logoutSuccess && <Alert message={'You are successfully logged-out'} color={'alert-success'}/>}
</div>
<Navbar bg="light" expand="lg">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bolder mb-3 fs-5 "  href="/">uniSpace</Link>
    <Navbar.Toggle aria-controls="navbarSupportedContent" />
    <Navbar.Collapse id="navbarSupportedContent">
      <Nav className="me-auto mb-2 mb-lg-0">
      <Link  href={'/admin/dashboard'}  className='m-2 fw-light fs-5 p-3 text-decoration-none text-secondary'>
        <Nav.Item  activeClassName="active">Dashboard</Nav.Item>
      </Link>
      <Link href={'/admin/booking-management'}  className='m-2 fw-light fs-5 p-3 text-decoration-none text-secondary' >
        <Nav.Item >Booking Management</Nav.Item>
      </Link>
      <NavDropdown title="Club Management" id="navbarDropdown"  className='mb-3 fw-light fs-5 p-3 text-decoration-none text-secondary'>
        <NavDropdown.Item ><Link href={'/admin/club-management/addClub'} className='text-decoration-none text-secondary '>Add Club</Link></NavDropdown.Item>
          <NavDropdown.Divider/>
          <NavDropdown.Item ><Link href={'/admin/club-management/clubs'} className='text-decoration-none text-secondary '>View Clubs</Link></NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Venue Management" id="navbarDropdown"  className='mb-3 fw-light fs-5 p-3 text-decoration-none text-secondary'>
        <NavDropdown.Item ><Link href={'/admin/venue-management/addVenue'} className='text-decoration-none text-secondary ' >Add Venues</Link></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item ><Link href={'/admin/venue-management/venues'} className='text-decoration-none text-secondary ' >View Venues</Link></NavDropdown.Item>
        </NavDropdown>
        <Link href={'#'}  className='m-2 fw-light fs-5 p-3 text-decoration-none text-secondary'>
        <Nav.Item disabled >Reports and Analytics</Nav.Item>
        </Link>
      </Nav>
    </Navbar.Collapse>
  <span> <Button variant='outline-danger' className='text-end mb-3 me-0' onClick={handleLogout}> Logout </Button></span>
  </div>
       
</Navbar>
</>

  )
}

export default AdminNav


// {
// DRIBBLE,BEHANCE, FREEPICK

// }
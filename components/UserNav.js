import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react'
import {Button} from 'react-bootstrap';
import axios from 'axios';
import Alert from './Alert';
import { logout } from '@/redux/userSlice';

const UserNav = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [logoutSuccess,setLogoutSuccess] = useState()
  const {user} = useSelector(state=>state.user)
  const {bookedVenue} = useSelector(state=>state.user)
  const handleLogout  = async()=>{
    await axios.get('/api/logout')
    dispatch(logout())
    setLogoutSuccess(true)
    router.push('/')
  }
  return (
    <>
<div className='d-flex justify-content-center mt-3'>
 { logoutSuccess && <Alert message={'You are successfully logged-out'} color={'alert-success'}/>}
</div>

    <Container  className='w-100'  fluid>
      {/* Header */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#"> <Link className='text-decoration-none text-secondary' href={'/user/dashboard'}> Club Dashboard</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link href="#"> <Link className='text-decoration-none text-secondary btn ' href={'/user/dashboard/setPassword'}> Set Passkey </Link> </Nav.Link>
            <Nav.Link href="#"> <Link className='text-decoration-none text-secondary btn ' href={'/user/dashboard/add-exec'}> Add Executives </Link> </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      <span> <Button variant='outline-danger' className='text-end mb-3 me-0' onClick={handleLogout}> Logout </Button></span>
      {
       
      user===null?"": user.venueAssignment ? <span> <Button variant='outline-success ms-5' className='text-end mb-3 me-5' > {`Assigned Venue: ${bookedVenue} `} </Button></span> : ""

      } 
      </Navbar>
  </Container>

    </>
  )
}

export default UserNav


// {
// DRIBBLE,BEHANCE, FREEPICK

// }
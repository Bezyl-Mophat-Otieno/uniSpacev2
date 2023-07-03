import UserNav from '@/components/UserNav';
import Link from 'next/link';
import styles from '../../../styles/clubDashboard.module.css'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import VenueCardClub from '@/components/VenueCardClub';
import { useSelector } from 'react-redux';
import AddClubDescription from '@/components/AddClubDescription';
import Alert from '@/components/Alert';


const ClubDashboard = ({venues}) => {
  const [updateVenues,setupdateVenues] = useState(venues)
  
  const {user} = useSelector(state=>state.user)
  const [executives,setExecutives] = useState(user === null ? [] : user.executives)
  const [loggedInUser,setLoggedInUser] = useState(user)
  const [active , setActive] = useState(user === null ? null: user.isActive)

  return (
    <Container className={styles.background} fluid >
      {/* Header */}
      <UserNav/>
 
      {/* Content Section */}
      <section className='mt-5'>
        <div className="row">
          <div className="col-lg-3">
      <div className='d-flex justify-content-center mt-1'>
      { !active && <Alert message={'You are currently not allowed to make any bookings, please contact the Deens Office for assistance.'}  color={'alert-info'} url={'/user/dashboard'} />}
      </div>
            {/* Sidebar */}
            <div className="card">
              <div className="card-body">
                {/* Club Information */}
                <h5 className="card-title">{user == null ? "":user.name }</h5>
                {/* Club Members */}
                <h6 className={`card-subtitle ${styles.sideCard} mb-2 text-muted`}>Executive Officials</h6>
                <Link className='text-decoration-none' href={'/user/dashboard/add-exec'} passHref >
                <Button variant='primary'>Add Executive Officials</Button>                 
                </Link>
                <ul className="list-group">
                { 
                  user === null ? null:user.executives.length !== 0 &&

                <div className='d-flex justify-content-center '>
                     <li className="list-group-item btn btn-outline-warning fw-bold w-100 text-start "> Executive Possition</li>
                     <li className="list-group-item btn btn-outline-success fw-bold w-100 text-start">Full Name</li>
                    </div>
                }
                {
                  
                  executives.map((executive)=>(
                    <div className='d-flex justify-content-center '>
                     <li className="list-group-item btn btn-outline-warning  w-100 text-start ">{executive.title}</li>
                     <li className="list-group-item btn btn-outline-success  w-100 text-start">{executive.name}</li>
                    </div>
                  ))

                }
                  {/* ... */}
                </ul>
              </div>
            </div>
          </div>
          <div className={`col-lg-9 `} >
            {/* Main Content */}
            <div className="card">
              <div className="card-body ">
                {/* Club Dashboard Content */}
                <h5 className="card-title">Welcome {user == null? "": user.name} to the Club Dashboard</h5>
                 {user===null? "": loggedInUser.clubDesc === undefined ? <AddClubDescription user={user} setLoggedInUser={setLoggedInUser} /> : loggedInUser.clubDesc }

                                
                <div className={`row row-cols-3 `}>
                {
                  updateVenues.map((venue)=>{
                    return <VenueCardClub active={active} setupdateVenues={setupdateVenues} venue={venue}/>
                  })
                }
                  </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ClubDashboard;


export const getServerSideProps = async (context)=>{

  const myCookie = context.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination:"/",
        permanent: false,
      },
    };
  }


  try {
    const res = await axios.get("http://localhost:3000/api/admin/venues")
    
    return {
      props: {
        venues: await res.data,

      }
    }
  } catch (error) {
    console.log(error.message)
  }
}


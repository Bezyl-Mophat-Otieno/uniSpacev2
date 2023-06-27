import UserNav from '@/components/UserNav';
import Link from 'next/link';
import styles from '../../../styles/clubDashboard.module.css'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import VenueCardClub from '@/components/VenueCardClub';
import { useSelector } from 'react-redux';
import AddClubDescription from '@/components/AddClubDescription';
import socket from '@/components/socketClientConnect';


const ClubDashboard = ({venues}) => {
  const [displayField, setDisplayField] = useState(false)
  const [updateVenues,setupdateVenues] = useState(venues)
  
  const {user} = useSelector(state=>state.user)
  const [executives,setExecutives] = useState(user === null ? [] : user.executives)
  const [loggedInUser,setLoggedInUser] = useState(user)

  return (
    <Container className={styles.background} fluid >
      {/* Header */}
      <UserNav/>
      {/* Content Section */}
      <section className='mt-5'>
        <div className="row">
          <div className="col-lg-3">
            {/* Sidebar */}
            <div className="card">
              <div className="card-body">
                {/* Club Information */}
                <h5 className="card-title">{user == null ? "":user.name }</h5>
                {/* Club Members */}
                <h6 className={`card-subtitle ${styles.sideCard} mb-2 text-muted`}>Executive Officials</h6>
                <ul className="list-group">
                {
                  executives.map((executive)=>(
                    <div className='d-flex justify-content-center '>
                     <li className="list-group-item btn btn-outline-warning  w-100 text-start fw-bolder">{executive.title}</li>
                     <li className="list-group-item btn btn-outline-success  w-100 text-start">{executive.name}</li>
                    </div>
                  ))

                }
                  {/* ... */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            {/* Main Content */}
            <div className="card">
              <div className="card-body ">
                {/* Club Dashboard Content */}
                <h5 className="card-title">Welcome {user == null? "": user.name} to the Club Dashboard</h5>
                 {user===null? "": loggedInUser.clubDesc === undefined ? <AddClubDescription user={user} setLoggedInUser={setLoggedInUser} /> : loggedInUser.clubDesc }

            

                <div className='row row-cols-3'>
                {
                  updateVenues.map((venue)=>{
                    return <VenueCardClub setupdateVenues={setupdateVenues} venue={venue}/>
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


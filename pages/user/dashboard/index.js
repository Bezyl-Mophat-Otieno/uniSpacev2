import UserNav from '@/components/UserNav';
import styles from '@/styles/SetPassword.module.css'
import Link from 'next/link';
import axios from 'axios'
import { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import VenueCardClub from '@/components/VenueCardClub';
import { useSelector } from 'react-redux';


const ClubDashboard = ({venues}) => {
  const [displayField, setDisplayField] = useState(false)
  const [updateVenues,setupdateVenues] = useState([])

  const {user} = useSelector(state=>state.user)
  const executives = user?.executives;

  // useEffect(() => {
  //   // WebSocket connection
  //   const socket = new WebSocket('ws://localhost:3000/api/websocket');

  //   socket.addEventListener('message', (event) => {
  //     // Handle incoming message
  //     const message = JSON.parse(event.data);
  //     // Update the venues state with the received data
  //     setupdateVenues(message.venues);
  //   });

  //   return () => {
  //     // Clean up the WebSocket connection on component unmount
  //     socket.close();
  //   };
  // }, []);
  return (
    <Container fluid >
      {/* Header */}
      <UserNav/>
      {/* Content Section */}
      <section>
        <div className="row">
          <div className="col-lg-3">
            {/* Sidebar */}
            <div className="card">
              <div className="card-body">
                {/* Club Information */}
                <h5 className="card-title">{user.name}</h5>
                {/* Club Members */}
                <h6 className="card-subtitle mb-2 text-muted">Executive Officials</h6>
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
                <h5 className="card-title">Welcome {user?.name} to the Club Dashboard</h5>
            <div className={styles.formGroup}>
            <textarea type="text" row={3} className={styles.input} id="description" placeholder="Add Club`s Description" onChange={(e)=>setDescription(e.target.value)}/>
            </div> 

                <div className='row row-cols-3'>
                {
                  venues.map((venue)=>{
                    return <VenueCardClub venue={venue}/>
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


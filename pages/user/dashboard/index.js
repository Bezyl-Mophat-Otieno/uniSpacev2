import UserNav from '@/components/UserNav';
import Link from 'next/link';
import axios from 'axios'
import { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import VenueCardClub from '@/components/VenueCardClub';
import { useSelector } from 'react-redux';

const ClubDashboard = ({venues}) => {
  const [updateVenues,setupdateVenues] = useState([])

  const {user} = useSelector(state=>state.user)

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
                <h5 className="card-title">Club Name</h5>
                <p className="card-text">Club Description</p>
                {/* Club Members */}
                <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                <ul className="list-group">
                  <li className="list-group-item">Member 1</li>
                  <li className="list-group-item">Member 2</li>
                  <li className="list-group-item">Member 3</li>
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
                <h5 className="card-title">Welcome {user.name} to the Club Dashboard</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

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


export const getServerSideProps = async ()=>{

  try {
    const res = await axios.get("http://localhost:3000/api/admin/venues")

    return {
      props: {
        venues: await res.data
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}


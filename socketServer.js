const express = require ('express')
const http = require ('http')
const app = express()
const server = http.createServer(app)
const axios = require('axios')
const Venue = require('./models/venue')
const StudentOrganization = require('./models/studentOrganization')
const Booking = require('./models/booking')
const {Server} = require('socket.io')
const io = new Server (server,{
  cors:{
    origin:"*"
  }
})



const cron = require('node-cron');
const Venue = require('./models/Venue');
const Club = require('./models/Club');

cron.schedule('0 * * * *', async () => {
   // Get the current date and time
   const currentDate = new Date();
   try{
// Find the expired bookings and extract the venue names
   const expiredBookings = await Booking.find({ validUntil: { $lt: currentDate } });
   const expiredVenueNames = expiredBookings.map(booking => booking.venueName);

   // Update the venues with the extracted names
   await Venue.updateMany(
     { name: { $in: expiredVenueNames } },
     { $set: { bookedStatus: false, bookedBy: "" } }
   );

   // Extract the student organizations' names from the expired bookings
   const expiredOrganizationNames = expiredBookings.map(booking => booking.orgName);

   // Update the venueAssignment attribute for each organization
   await StudentOrganization.updateMany(
     { orgName: { $in: expiredOrganizationNames } },
     { $set: { venueAssignment: false } }
   );

   console.log('Venues and organizations updated successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }

});



// Web sockets connection to listen for events from the client

io.on("connection",(socket)=>{
  console.log("client  connected Successfully")
  socket.on("addExecutive",(clubId)=>{
    console.log("addExecutive event recieved " + clubId)
    const fetchClub = async()=>{
      const res = await axios.get(`http://localhost:3000/api/admin/register/${clubId}`)
      const club = await res.data
      socket.emit("updatedClubExecutives",club)
    }
    fetchClub()
  })
  

  
})

server.listen(3001,()=>{
  console.log("socket server listening on port 3001")
})

// socket.emit('addExecutive',user._id)   

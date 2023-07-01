const  express = require('express');
const  http = require('http')
const app = express()
const server = http.createServer(app)
const  axios = require('axios');
const  cron = require('node-cron')
const Booking = require('./models/booking.js')
const StudentOrganization = require('./models/studentOrganization.js')
const Venue = require('./models/venue.js')
const {Server} = require('socket.io')
const dbConnect = require('./utils/mongodb.js')


const io = new Server (server,{
  cors:{
    origin:"*"
  }
})

console.log()



cron.schedule('* * * * * ', async () => {
  // Get the current date and time
  const currentDate = new Date();
  try{
  await dbConnect()
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
     { name: { $in: expiredOrganizationNames } },
     { $set: { venueAssignment: false  }} , { new:true , runValidators:true}
   );

   console.log('Venues and organizations updated successfully.');
  } catch (error) {
    console.error( error);
  }
  
  
  
  // // Web sockets connection to listen for events from the client
  // io.on("connection",(socket)=>{
  //   console.log("client  connected Successfully")
  //   // socket.on("addExecutive",(clubId)=>{
  //   //   console.log("addExecutive event recieved " + clubId)
  //   //   const fetchClub = async()=>{
  //   //     const res = await axios.get(`http://localhost:3000/api/admin/register/${clubId}`)
  //   //     const club = await res.data
  //   //     socket.emit("updatedClubExecutives",club)
  //   //   }
  //   //   fetchClub()
  //   // })
    
  
    
  // })
  
      server.listen(3001,()=>{
        console.log("socket server listening on port 3001")
      })

});


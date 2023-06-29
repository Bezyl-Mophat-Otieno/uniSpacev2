import dbConnect from "@/utils/mongodb";
import Venue from "@/models/venue";
import Booking from "@/models/booking";
import studentOrganization from "@/models/studentOrganization";
// Bookings

export default async function handler(req, res) {

    const {method,query:{id}} = req;
    // Creating a connection
    await dbConnect();

   //Booking a venue
   if(method === "PUT"){
    const {venueName , orgName } = req.body

    const changedBookedStatus = {bookedStatus:false,bookedBy:""}
    const VenueAssignStatus = {venueAssignment:false}
    
       try {
        
        // Handle Venue update 
        const venue = await Venue.findOne({name:venueName})
        venue && await Venue.findOneAndUpdate({name:venueName},changedBookedStatus,{
            new:true,
            runValidators:true
        }) 
        // Handle Organization 
        const org = await studentOrganization.findOne({name:orgName})
        org &&  await studentOrganization.findOneAndUpdate({name:orgName},VenueAssignStatus,{
            new:true,
            runValidators:true
          })

        // Handle Booking
        const now = new Date()

        const booking = (await Booking.findOneAndDelete({orgName:orgName,validUntil:{$gt:now}}))
        console.log(booking)
        res.status(200).json("All operations carried out successfully")

            } catch (error) {
            res.status(500).json(error.message)
            }
   }

   if(method === "GET"){
    try {
        const venueBooking = await Booking.findOne({orgName:id})
        res.status(200).json(venueBooking) 
   
    } catch (error) {
        res.status(error.statusCode).json(error.message)   
    }
    
   }
    

  }
  
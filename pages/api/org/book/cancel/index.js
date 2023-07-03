import dbConnect from "@/utils/mongodb";
import Venue from "@/models/venue";
import Booking from "@/models/booking";
import studentOrganization from "@/models/studentOrganization";
// Bookings

export default async function handler(req, res) {

    const {method,query:{id}} = req;
    // Creating a connection
    await dbConnect();

   //Cancelling  a venue Booking 
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
     
        res.status(200).json("Cancellation was successfull")

            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    

  }
  
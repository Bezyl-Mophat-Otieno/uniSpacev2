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
    const {venueName , orgName , bookingDate} = req.body

    const changedBookedStatus = {bookedStatus:true}
    const VenueAssignStatus = {venueAssignment:true}
    
       try {
        
        // I will validate on the front end to ensure that a booked venue request for booking cannot  be sent
        await Venue.findByIdAndUpdate(id,changedBookedStatus,{
            new:true,
            runValidators:true
        })
        await studentOrganization.findOneAndUpdate({name:orgName},VenueAssignStatus,{
          new:true,
          runValidators:true
        })
        

          const bookingReceipt = await Booking.create({venueName,orgName,bookingDate})
            res.status(201).json(bookingReceipt)    
            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    

  }
  
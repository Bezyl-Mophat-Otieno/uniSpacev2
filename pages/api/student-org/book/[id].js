import dbConnect from "../../../../utils/mongodb";
import Booking from '../../../../models/booking'
import Venue from '../../../../models/venue'

// Login
export default async function handler(req, res) {

    const {method,query:{id}} = req;
    // Creating a connection
    await dbConnect();

   //Register a Venue
   if(method === "PUT"){
    const {venueName , orgName , bookingDate} = req.body

    const changedStatus = {bookedStatus:true}
    
       try {
        // I will validate on the front end to ensure that a booked venue request for booking cannot  be sent
        await Venue.findByIdAndUpdate(id,changedStatus,{
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
  
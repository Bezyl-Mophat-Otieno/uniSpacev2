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

    const changedBookedStatus = {bookedStatus:true,bookedBy:orgName}
    const VenueAssignStatus = {venueAssignment:true}
    
       try {
        
        // I will validate on the front end to ensure that a booked venue request for booking cannot  be sent
        const venue = await Venue.findById(id)
        // Ensuring in the server side a venue can only be booked once 
        if ( venue.bookedStatus) {
          return res.status(401).json("Venue is already booked ")
        }else{

          await Venue.findByIdAndUpdate(id,changedBookedStatus,{
              new:true,
              runValidators:true
          }) 

        }


        // Assigning a venue to a club 
        const org = await studentOrganization.findOne({name:orgName})
        if(org.venueAssignment ){
          (res.status(401).json("You are already assigned a venue"))
          
        }else{
          await studentOrganization.findOneAndUpdate({name:orgName},VenueAssignStatus,{
            new:true,
            runValidators:true
          })
          const bookingReceipt = await Booking.create({venueName,orgName,bookingDate})
            res.status(201).json(bookingReceipt)    

        }     
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
  
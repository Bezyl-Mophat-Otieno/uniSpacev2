import Booking from "@/models/booking";
import dbConnect from "@/utils/mongodb";
export  default async function handler  (req,res){

   const {method,query:{id}} = req;

   await dbConnect()

   // Getting all the list of venue booked with the name provided in the booking table to server as history
   if(method === "GET"){
    try {
        const venueBookings = await Booking.find({venueName:id})
        res.status(200).json(venueBookings) 
   
    } catch (error) {
        res.status(error.statusCode).json(error.message)   
    }
    
   }

   // Clearing  Venue booking History 
      if(method === "DELETE"){

        try {
            await Booking.findByIdAndDelete(id)
            res.status(200).json({message:"History Cleared Successfully"})

        } catch (error) {
            res.status(error.statusCode).json(error.message)
            
        }
        
       }
    


}
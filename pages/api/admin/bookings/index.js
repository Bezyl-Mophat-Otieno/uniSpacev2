import dbConnect from "@/utils/mongodb";
import Booking from "@/models/booking";


export default async function handler(req, res) {

    const {method} = req;
    // Creating a connection
    await dbConnect();
    

    // Fetch all the Bookings Made 
    if(method === 'GET'){
        try {
         const allBookings = await Booking.find()
         res.status(200).json(allBookings)

        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }

  }
  
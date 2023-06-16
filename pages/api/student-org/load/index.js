import cron from 'node-cron';
import dbConnect from '../../../../utils/mongodb'
import Venue from '../../../../models/venue'
export  default async function handler  (req,res){

   const {method} = req;

   await dbConnect()


    // updating a Organization information by the Representative
   if(method === "GET"){
     try {

       async function releaseVenue(venueName) {
            const venue = await Venue.findOneAndUpdate({name:venueName})
            venue.bookedStatus = false; // Set the status to false to indicate it's released
            venue.save(); // Save the updated venue in the database
          }


        cron.schedule('0 0 * * *', async () => {
            const today = new Date();
          
            // Find all bookings with a valid until date earlier than today
            const expiredBookings = await Booking.find({ validUntil: { $lt: today } });
          
            // Update the status of the associated venues
            for (const booking of expiredBookings) {
              releaseVenue(booking.venueName);
            }
          });


     } catch (error) {
        res.status(error.status).json({message:error.message})
     }
    
   }


}
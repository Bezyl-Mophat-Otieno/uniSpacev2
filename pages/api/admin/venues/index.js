import dbConnect from '../../../../utils/mongodb'
import Venue from '../../../../models/venue';



export default async function handler(req, res) {

    const {method} = req;
    // Creating a connection
    await dbConnect();

   //Register a Venue
   if(method === "POST"){

    
       try {
        console.log(req.body)
           const venueAdded = await Venue.create(req.body)
            res.status(200).json(venueAdded);
            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    
    

    // Fetch all the registered Venues
    if(method === 'GET'){
        try {
         const allVenues = await Venue.find()
         res.status(200).json(allVenues)

        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }

  }
  
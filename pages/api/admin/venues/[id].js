import dbConnect from '../../../../utils/mongodb'
import Venue from '../../../../models/venue'
export  default async function handler  (req,res){

   const {method,query:{id}} = req;

   await dbConnect()


    // updating a Venue information
   if(method === "PUT"){
     try {

        await Venue.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        })    
        res.status(200).json({message:"Venue Information Updated successfully"})
     } catch (error) {
        res.status(error.status).json({message:error.message})
     }
    
   }


   // getting single Venue information
   if(method === "GET"){
    try {
        const venue = await Venue.findById(id)
        res.status(200).json(venue)
    } catch (error) {
        res.status(error.statusCode).json(error.message)   
    }
    
   }

   // Removing an Organization information
      if(method === "DELETE"){

        try {
            await Venue.findByIdAndDelete(id)
            res.status(200).json({message:"Venue Deleted successfully"})

        } catch (error) {
            res.status(error.statusCode).json(error.message)
            
        }
        
       }
    


}
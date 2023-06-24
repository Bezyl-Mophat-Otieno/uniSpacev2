import Venue from "@/models/venue";
import dbConnect from "@/utils/mongodb";


export  default async function handler  (req,res){

   const {method,query:{id}} = req;

   await dbConnect()


    // DIsbling a venue not to allow  bookings 
   if(method === "PUT"){
     try {
        const isAvailable = {
            isAvailable:true
        }

        await Venue.findByIdAndUpdate(id,isAvailable,{
            new:true,
            runValidators:true
        })    
        res.status(200).json({message:"Venue disabled successfully"})
     } catch (error) {
        res.status(error.status).json({message:error.message})
     }
    
   }



    


}
import dbConnect from "@/utils/mongodb";
import StudentOrganization from "@/models/studentOrganization";


export  default async function handler  (req,res){

   const {method,query:{id}} = req;

   await dbConnect()


    // Disabling a Registered Club not to allowed to make bookings 
   if(method === "PUT"){
     try {
        const isActive = {
         isActive:false
        }

        await StudentOrganization.findByIdAndUpdate(id,isActive,{
            new:true,
            runValidators:true
        })    
        res.status(200).json({message:"Student Club disabled successfully"})
     } catch (error) {
        res.status(error.status).json({message:error.message})
     }
    
   }

}
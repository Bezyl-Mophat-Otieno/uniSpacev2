import dbConnect from "@/utils/mongodb";
import StudentOrganization from "@/models/studentOrganization";
export  default async function handler  (req,res){

   const {method,query:{id}} = req;

   await dbConnect()


    // updating a Venue information
   if(method === "PUT"){
     try {

        await StudentOrganization.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        })    
        res.status(200).json({message:"Student Information Updated successfully"})
     } catch (error) {
        res.status(error.status).json({message:error.message})
     }
    
   }


   // getting single STudent Organization/Club
   if(method === "GET"){
    try {
        const student = await StudentOrganization.findById(id)
        res.status(200).json(student)
    } catch (error) {
        res.status(error.statusCode).json(error.message)   
    }
    
   }

   // Removing an Organization information
      if(method === "DELETE"){

        try {
            await StudentOrganization.findByIdAndDelete(id)
            res.status(200).json({message:"Club Deleted successfully"})

        } catch (error) {
            res.status(error.statusCode).json(error.message)
            
        }
        
       }
    


}
import StudentOrganization from '../../../../models/studentOrganization'
import dbConnect from '../../../../utils/mongodb'
export  default async function handler  (req,res){

   const {method,query:{id}} = req;

   await dbConnect()


    // updating a Organization information by the Representative
   if(method === "PUT"){
     try {

        await StudentOrganization.findByIdAndUpdate(id,{
         $push:{executives:req.body}
        },{
            new:true,
            runValidators:true
        })    
        res.status(200).json({message:"Executive Added successfully"})
     } catch (error) {
        res.status(error.status).json({message:error.message})
     }
    
   }


}
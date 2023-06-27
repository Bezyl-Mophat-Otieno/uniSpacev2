import StudentOrganization from '@/models/studentOrganization';
import dbConnect from '@/utils/mongodb';
export  default async function handler  (req,res){
    const {method,query:{id}} = req;
    // Creating a connection
    await dbConnect();
    if(method === 'PUT'){

        
        try {

    await StudentOrganization.findByIdAndUpdate(
        id,
        {$push:{executives:req.body}})
        res.status(200).json('Executives Added Successfully')

    
  } catch (error) {
      res.status(400).json('Error Adding the executives')
      
    }
    
}
        }

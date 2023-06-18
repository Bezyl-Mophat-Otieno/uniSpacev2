import Admin from '@/models/admin';
import dbConnect from '@/utils/mongodb';


export default async function handler(req, res) {

    const {method} = req;
    // Creating a connection
    await dbConnect();

   //Admin Added in the database by the database administrator. 
   if(method === "POST"){
       
       try {
        const admin = await Admin.create(req.body)
        res.status(201).json(admin)
            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    
    

    // Fetch all the Registered admins
    if(method === 'GET'){
        try {
            const allAdmins = await Admin.find();
            res.status(200).json(allOrgs); 
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }

  }
  
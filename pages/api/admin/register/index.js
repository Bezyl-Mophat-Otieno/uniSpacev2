import studentOrganization from "../../../../models/studentOrganization";
import dbConnect from '../../../../utils/mongodb'
import crypto from 'crypto';


export default async function handler(req, res) {

    const {method} = req;
    // Creating a connection
    await dbConnect();

   //Register an Organization
   if(method === "POST"){
       
       try {
           const {name} = req.body;
            const data = name;
            const hash = crypto.createHash('sha256');
            hash.update(data);

            const passkey = hash.digest('hex');
            const addedOrg = await studentOrganization.create({name, passkey});
            res.status(200).json(addedOrg);
            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    
    

    // Fetch all the Registered Organizations
    if(method === 'GET'){
        try {
            const allOrgs = await studentOrganization.find();
            res.status(200).json(allOrgs); 
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }

  }
  
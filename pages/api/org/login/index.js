import dbConnect from "../../../../utils/mongodb";
import StudentOrganization from "../../../../models/studentOrganization";
import Admin from "@/models/admin";


// Login
export default async function handler(req, res) {

    const {method} = req;
    // Creating a connection
    await dbConnect();

   //Register a Venue
   if(method === "POST"){
    
       try {


                const {passkey,name} = req.body;
                //Getting an organization by the passed passkey from the request
                const orgUser = await StudentOrganization.findOne({name:name})
                if(!orgUser) {
                    const orgAdmin = await Admin.findOne({name:name})
                        if(!orgAdmin){
                            res.status(404).json("The User is Yet to be registered, kindly contact the Deens Office");
                        }else{

                            if(name === orgAdmin.name){
                            res.status(200).json(orgAdmin);
    
                            }else{
                            res.status(404).json("Invalid credentials");
                            }
                        }

                }else{

                    if(name === orgUser.name){
                        res.status(200).json(orgUser);

                        }else{
                        res.status(404).json("Invalid credentials");
                        }

                }
            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    

  }
  
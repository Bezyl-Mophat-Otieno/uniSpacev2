import dbConnect from "../../../../utils/mongodb";
import StudentOrganization from "../../../../models/studentOrganization";


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
                const org = await StudentOrganization.findOne({passkey:passkey})
                if(name === org.name){
                    res.status(200).json("You have successfully Logged In");

                }else{
                 res.status(404).json("Invalid credentials");
                }
            } catch (error) {
            res.status(500).json(error.message)
            }
   }
    

  }
  
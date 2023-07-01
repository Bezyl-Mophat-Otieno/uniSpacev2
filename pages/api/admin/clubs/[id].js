import dbConnect from "@/utils/mongodb";
import StudentOrganization from "@/models/studentOrganization";
import Booking from "@/models/booking";
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
            const changedVenueStatus = {bookedStatus:false,bookedBy:""}

            await StudentOrganization.findByIdAndDelete(id)
            const deletedClub = await StudentOrganization.findById(id)
            // Change The booking status of the venue that was held .
            Venue.findOneAndUpdate(
                { name: deletedClub.name }, // Specify the query to find the document
                { $set: changedVenueStatus}, // Specify the data to update
                { new: true , runValidators:true }, // Set the `new` option to return the updated document
                function(err, updatedDocument) {
                  if (err) {
                    console.log('Error updating document:', err);
                    return;
                  }
          
                  console.log('Updated document:', updatedDocument);
          
                }
              );
              
              // Delete the Booking  documents matching the query
              const query = {orgName:deletedClub.name}
                Booking.deleteMany(query, function(err, result) {
                        if (err) {
                        console.log('Error deleting documents:', err);
                        return;
                        }
                        console.log(`${result.deletedCount} document(s) deleted successfully`)
                    });
  
            
            res.status(200).json({message:"Student Organization Deleted successfully"})
        } catch (error) {
            res.status(error.statusCode).json(error.message)
            
        }
        
       }
    


}
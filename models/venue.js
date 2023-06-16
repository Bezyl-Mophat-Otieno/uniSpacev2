import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({

    name:{
        type: String,   
        required: true,
        unique: true
    },  
    capacity:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
      },
     isAvailable: {
        type: Boolean,
        default: true,
      },
     bookedStatus: {
        type: Boolean,
        default: false,
      },

})

export default mongoose.models.Venue || mongoose.model('Venue',venueSchema)
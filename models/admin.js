import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

    name:{
        type: String,   
        required: true,
        unique: true
    },  
    role:{
        type:String,
        default:"user"
    
    },
    passkey:{
        type:String,
        required:true,
        unique:true

    }
})

export default mongoose.models.Admin || mongoose.model('Admin',adminSchema)
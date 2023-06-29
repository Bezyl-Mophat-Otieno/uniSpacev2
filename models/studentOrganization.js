import mongoose from 'mongoose'
//TODO: Add more fields later which is information provided by the representative of the student organization
//TODO: Add field for mission 
//TODO: Add field for vission
//TODO: Add field for total members
//TODO: Add field for registration fees per member



const studentOrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:"user"
    },
    clubDesc:{
        type:String,
    },
    venueAssignment:{
        type:Boolean,
        default:false
    },
    passkey: {  
        type: String,
        required: true,
    },
    executives:{
        type:[{name:{type:String, required:true},regNo:{type:String, required:true},title:{type:String, required:true},phoneNo:{type:String, required:true}}],
        default:[]
    },
    isActive:{
        type:Boolean,
        default:true
    }


})

export default mongoose.models.StudentOrganization || mongoose.model('StudentOrganization', studentOrganizationSchema)
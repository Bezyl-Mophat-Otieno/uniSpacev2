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
    passkey: {  
        type: String,
        required: true,
    }
})

export default mongoose.models.StudentOrganization || mongoose.model('StudentOrganization', studentOrganizationSchema)
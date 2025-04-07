import mongoose from "mongoose"


const companySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [2, "minimum length is 3 characters"],
    },
    location: {
        type: String,
        required: [true, "name is required"],
        minLength: [2, "minimum length is 3 characters"],
    }
}, { timestamps: true })


const companyModel = mongoose.model("Company" , companySchema)

export default companyModel
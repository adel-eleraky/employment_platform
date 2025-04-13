import mongoose from "mongoose"


const employerSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "minimum length is 3 characters"],
        maxLength: [25, "max length is 25 characters"]
    },
    title: {
        type: String,
        required: [true, "title is required"]
    },
    national_ID: {
        type: Number,
        unique: [true, "National ID must be unique"],
        required: [true, "national ID is required"]
    },
    email: {
        type: String,
        unique: [true, "email must be unique"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        minLength: [8, "minimum length is 8"],
        select: false
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true , "company is required"],
        ref: "Company"
    }
}, { timestamps: true })



const employerModel = mongoose.model("Employer" , employerSchema)

export default employerModel
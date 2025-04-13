import mongoose from "mongoose"


const jobSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "title is required"],
        minLength: [2, "minimum length is 2 characters"]
    },
    location: {
        type: String,
        required: [true, "location ID is required"],
        enum: ["On-Site" , "Remote" , "Hybrid"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
        minLength: [16, "minimum length is 16 characters"]
    },
    experience_level: {
        type: String,
        required: [true, "experience level is required"],
        enum: ["junior" , "mid" , "senior"]
    },
    salary: {
        type: Number,
        required: [ true , "Salary is required"]
    },
    skills: {
        type: Array,
        required: [true , "skills is required"]
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
        required: [ true, "Employer is required"]
    }
} , { timestamps: true})


const jobModel = mongoose.model("Job" , jobSchema)

export default jobModel
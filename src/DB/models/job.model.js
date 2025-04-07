import mongoose from "mongoose"


const jobSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "title is required"],
        minLength: [2, "minimum length is 2 characters"]
    },
    location: {
        type: String,
        required: [true, "location ID is required"]
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
    }
} , { timestamps: true})


const jobModel = mongoose.model("Job" , jobSchema)

export default jobModel
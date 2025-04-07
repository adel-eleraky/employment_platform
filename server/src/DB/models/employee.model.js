import mongoose from "mongoose"


const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "minimum length is 3 characters"],
        maxLength: [25, "max length is 25 characters"]
    },
    title: {
        type: String,
        required: [true, "title is required"],
        minLength: [2, "minimum length is 3 characters"],
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
        minLength: [8, "minimum length is 8"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    bio: {
        type: String,
        required: [true, "bio is required"],
        minLength: [16 , "minimum length is 16 characters"]
    },
    experience_level: {
        type: String,
        required: [true, "experience level is required"],
        enum: ["junior" , "mid" , "senior"]
    },
    programming_langs: {
        type: Array,
        required: [true , "programming languages is required"]
    }
}, { timestamps: true })



const employeeModel = mongoose.model("Employee" , employeeSchema)

export default employeeModel
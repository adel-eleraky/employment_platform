import mongoose from "mongoose"


const applySchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "employee is required"],
        ref: "Employee"
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "job is required"],
        ref: "Job"
    },

}, { timestamps: true })


const applyModel = mongoose.model("Apply", applySchema)

export default applyModel
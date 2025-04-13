import mongoose from "mongoose"


const proposalSchema = new mongoose.Schema({

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
    status: {
        type: String,
        enum: ["pending" , "accepted" , "rejected"],
        default: "pending"
    }

}, { timestamps: true })


const proposalModel = mongoose.model("Proposal", proposalSchema)

export default proposalModel
import mongoose from "mongoose"


const viewsSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "employee is required"],
        ref: "Employee"
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "employer is required"],
        ref: "employer"
    },

}, { timestamps: true })


const viewModel = mongoose.model("View", viewsSchema)

export default viewModel
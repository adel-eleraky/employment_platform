
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    message: {
        type: String,
        required: [true , "message is required"]
    },
    isRead: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const notificationModel = mongoose.model("Notification", notificationSchema);

export default notificationModel
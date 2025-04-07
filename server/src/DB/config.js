import mongoose from "mongoose";

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL).then(conn => {
        console.log("database connected successfully")
    }).catch(err => {
        console.log("database connection failed" + err)
    })
}

export default connectDB
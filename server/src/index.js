import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./DB/config.js"
import employeeRouter from "./routes/employee.routes.js"
import employerRouter from "./routes/employer.routes.js"
import jobRouter from "./routes/job.routes.js"
import authRouter from "./routes/auth.routes.js"
import globalError from "./middlewares/globalError.js"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/employee", employeeRouter)
app.use("/api/v1/employer", employerRouter)
app.use("/api/v1/job", jobRouter)

app.use(globalError)

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started successfully on port 3000")
})
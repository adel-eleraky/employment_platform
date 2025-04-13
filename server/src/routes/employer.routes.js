import express from "express"
import { AuthMiddleware, restrictTo } from "../middlewares/AuthMiddleware.js"
import { viewEmployee } from "../controllers/employer.controller.js"


const router = express.Router()


router.post("/view/:empId" , AuthMiddleware , restrictTo("Employer") , viewEmployee)

export default router
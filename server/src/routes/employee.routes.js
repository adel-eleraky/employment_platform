import express from "express"
import { AuthMiddleware, restrictTo } from "../middlewares/AuthMiddleware.js"
import { getViews, getNotifications, updateEmployee } from "../controllers/employee.controller.js"
import { updateEmployeeSchema, validate } from "../middlewares/validation/update.validation.js"


const router = express.Router()

router.get("/views" , AuthMiddleware , getViews)

router.get("/notifications" , AuthMiddleware , getNotifications)

router.put("/update" , AuthMiddleware , restrictTo("Employee"), validate(updateEmployeeSchema) , updateEmployee)
export default router
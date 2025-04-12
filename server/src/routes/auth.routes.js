import express from "express"
import { getLoggedInUser, login, logout, register } from "../controllers/auth.controller.js"
import { loginSchema, registerSchema, validate } from "../middlewares/validation/auth.validation.js"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"


const router = express.Router()

router.post("/register" , validate(registerSchema), register)
router.post("/login" , validate(loginSchema), login)
router.get("/logout" , logout)
router.get("/me" , AuthMiddleware , getLoggedInUser)

export default router
import express from "express"
import { login, register } from "../controllers/auth.controller.js"
import { loginSchema, registerSchema, validate } from "../middlewares/validation/auth.validation.js"


const router = express.Router()

router.post("/register" , validate(registerSchema), register)
router.post("/login" , validate(loginSchema), login)

export default router
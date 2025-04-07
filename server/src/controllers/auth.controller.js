import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import * as Roles from './../utils/roles.js';
import saveTokenInCookie from "../utils/token.js";
import bcrypt from 'bcryptjs';

export const register = asyncHandler(async (req ,res, next) => {

    const { role } = req.body

    let roleClass = new Roles[role](req.body)
    let newUser = await roleClass.create()

    const token = jwt.sign({email: newUser.email , role} , process.env.JWT_SECRET)
    saveTokenInCookie(res, token)

    return res.status(200).json({
        status: "success",
        message: `${role} registered successfully`,
        data: newUser
    })
})


export const login = asyncHandler(async (req, res, next) => {

    const { role, email, password } = req.body

    const user = await Roles.availableRoles[role].findOne({ email })
    
    if(!user) {
        return res.status(404).json({
            status: "fail",
            errors: {
                email: "Email not found"
            }
        })
    }

    if(! await bcrypt.compare(password, user.password)) {
        return res.status(404).json({
            status: "fail",
            errors: {
                password: "Incorrect password"
            }
        })
    }

    const token = jwt.sign({email: user.email , role} , process.env.JWT_SECRET)
    saveTokenInCookie(res, token)

    return res.status(200).json({
        status: "success",
        message: `${role} logged-in successfully`,
        data: user
    })
})
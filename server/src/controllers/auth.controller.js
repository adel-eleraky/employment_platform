import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import * as Roles from './../utils/roles.js';
import saveTokenInCookie from "../utils/token.js";
import bcrypt from 'bcryptjs';

export const register = asyncHandler(async (req, res, next) => {

    const { role } = req.body

    let roleClass = new Roles[role](req.body)
    let newUser = await roleClass.create()

    const token = jwt.sign({ id: user.id , email: newUser.email, role }, process.env.JWT_SECRET, { expiresIn: "90d" })
    saveTokenInCookie(res, token)

    const UserObject = newUser.toObject()
    UserObject.role = role

    return res.status(200).json({
        status: "success",
        message: `${role} registered successfully`,
        data: UserObject
    })
})


export const login = asyncHandler(async (req, res, next) => {

    const { role, email, password } = req.body

    const user = await Roles.availableRoles[role].findOne({ email })

    if (!user) {
        return res.status(404).json({
            status: "fail",
            errors: {
                email: "Email not found"
            }
        })
    }

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(404).json({
            status: "fail",
            errors: {
                password: "Incorrect password"
            }
        })
    }

    const token = jwt.sign({ id: user.id , email: user.email, role }, process.env.JWT_SECRET, { expiresIn: "90d" })
    saveTokenInCookie(res, token)

    const UserObject = user.toObject()
    UserObject.role = role

    return res.status(200).json({
        status: "success",
        message: `${role} logged-in successfully`,
        data: UserObject
    })
})

export const logout = asyncHandler(async (req, res, next) => {

    res.cookie("jwt", "logout", {
        expires: new Date(Date.now() + 10 * 1000),
    })

    return res.status(200).json({
        status: "success",
        message: "logout successfully"
    })
})

export const getLoggedInUser = asyncHandler(async (req, res , next) => {

    return res.status(200).json({
        status: "success",
        data: req.user
    })
}) 
import jwt from "jsonwebtoken"
import { availableRoles } from "../utils/roles.js"

export const AuthMiddleware = async (req, res, next) => {

    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You must login first"
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, role } = decoded

        const user = await availableRoles[role].findById(id)

        let userObject = user.toObject()
        userObject.role = role

        req.user = userObject

    } catch (err) {
        return res.status(401).json({
            status: "fail",
            message: "You must login first"
        })
    }

    next()
}


export const restrictTo = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                status: "fail",
                message: "You don't have permission to do this action"
            })
        }

        next()
    }
}
import Employee from "../DB/models/employee.model.js";
import Notification from "../DB/models/notification.model.js";
import View from "../DB/models/views.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import saveTokenInCookie from "../utils/token.js";
import jwt from "jsonwebtoken";


export const getViews = asyncHandler(async (req, res, next) => {

    const { _id } = req.user

    const views = await View.find({ employee: _id })

    return res.status(200).json({
        status: "success",
        data: views
    })
})


export const getNotifications = asyncHandler(async (req, res, next) => {

    const { _id } = req.user

    const notifications = await Notification.find({ employee: _id })

    return res.status(200).json({
        status: "success",
        data: notifications
    })
})


export const updateEmployee = asyncHandler(async (req, res, next) => {

    const { _id, role } = req.user;

    const updatedEmployee = await Employee.findByIdAndUpdate(_id, req.body, { new: true })

    const token = jwt.sign({ id: updatedEmployee._id , email: updatedEmployee.email, role }, process.env.JWT_SECRET, { expiresIn: "90d" })
    saveTokenInCookie(res, token)


    res.status(200).json({
        status: "success",
        message: "employee updated successfully",
        data: updatedEmployee
    });


})

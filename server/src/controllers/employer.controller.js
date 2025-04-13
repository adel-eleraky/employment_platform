import Proposal from "../DB/models/proposal.model.js";
import View from "../DB/models/views.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const viewEmployee = asyncHandler(async (req, res, next) => {

    const { _id } = req.user
    const { empId } = req.params

    const existView = await View.findOne({ employer: _id, employee: empId })

    if (existView) {
        return res.status(200).json({
            status: "success",
            data: existView
        })
    }

    const newView = await View.create({ employer: _id, employee: empId })

    return res.status(200).json({
        status: "success",
        data: newView
    })
})


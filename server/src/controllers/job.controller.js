import Apply from "../DB/models/apply.model.js";
import Job from "../DB/models/job.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllJobs = asyncHandler(async (req, res, next) => {

    const jobs = await Job.find().populate({
        path: "employer",
        select: "name company",
        populate: {
            path: "company"
        } 
    })

    return res.status(200).json({
        status: "success",
        message: "Jobs data fetched successfully",
        data: jobs
    })
})


export const createJob = asyncHandler(async (req, res, next) => {

    const { _id } = req.user

    const newJob = await Job.create({ ...req.body, employer: _id })

    return res.status(200).json({
        status: "success",
        message: "New Job created successfully",
        data: newJob
    })
})


export const getEmployerJobs = asyncHandler(async (req, res, next) => {

    const { _id } = req.user

    const jobs = await Job.find({ employer: _id })

    return res.status(200).json({
        status: "success",
        data: jobs
    })
})


export const applyForJob = asyncHandler(async (req, res, next) => {

    const { _id } = req.user
    const { jobId } = req.body


    // check if job not found
    const job = await Job.findById(jobId)

    if(!job) {
        return res.status(404).json({
            status: "fail",
            message: "job not found"
        })
    }


    const newApply = await Apply.create({ employee: _id , job: jobId})

    return res.status(200).json({
        status: "success",
        message: "Application submitted successfully",
        data: newApply
    })

})


export const appliedJob = asyncHandler(async (req, res, next) => {

    const applied = await Apply.find({ employee: req.user._id }).populate("job")

    return res.status(200).json({
        status: "success",
        data: applied
    })
})
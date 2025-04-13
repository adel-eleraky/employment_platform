import Proposal from "../DB/models/proposal.model.js";
import Job from "../DB/models/job.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { saveNotification } from "./notification.controller.js";
import stringSimilarity from "string-similarity";

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

    if (!job) {
        return res.status(404).json({
            status: "fail",
            message: "job not found"
        })
    }


    const newApply = await Proposal.create({ employee: _id, job: jobId })

    return res.status(200).json({
        status: "success",
        message: "Application submitted successfully",
        data: newApply
    })

})


export const appliedJob = asyncHandler(async (req, res, next) => {

    const applied = await Proposal.find({ employee: req.user._id }).populate({
        path: "job",
        populate: {
            path: "employer",
            populate: {
                path: "company"
            }
        }
    })

    return res.status(200).json({
        status: "success",
        data: applied
    })
})


export const getJobProposals = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const proposals = await Proposal.find({ job: id }).populate("employee")

    return res.status(200).json({
        status: "success",
        data: proposals
    })
})

export const acceptProposal = asyncHandler(async (req, res, next) => {

    const { jobId, empId } = req.params
    const proposal = await Proposal.findOne({ job: jobId, employee: empId }).populate("job")

    proposal.status = "accepted"
    await proposal.save()

    await saveNotification(empId, `your proposal on ${proposal.job.title} got accepted`)

    return res.status(200).json({
        status: "success",
        message: "proposal accepted",
        data: proposal
    })
})


export const rejectProposal = asyncHandler(async (req, res, next) => {

    const { jobId, empId } = req.params
    const proposal = await Proposal.findOne({ job: jobId, employee: empId }).populate("job")

    proposal.status = "rejected"
    await proposal.save()

    await saveNotification(empId, `your proposal on ${proposal.job.title} got rejected`)

    return res.status(200).json({
        status: "success",
        message: "proposal rejected",
        data: proposal
    })
})



export const getBestMatch = asyncHandler(async (req, res, next) => {

    const { jobId } = req.params;

    const allProposals = await Proposal.find({ job: jobId }).populate("employee").populate("job");

    const scoredProposals = allProposals.map(proposal => {
        const { employee, job } = proposal;

        const similarity = stringSimilarity.compareTwoStrings(
            (job.description || "").toLowerCase(),
            (employee.bio || "").toLowerCase()
        );

        return {
            ...proposal._doc,
            similarity,
        };
    });

    const sortedProposals = scoredProposals.sort((a, b) => b.similarity - a.similarity);

    return res.status(200).json({
        status: "success",
        data: scoredProposals
    });
});

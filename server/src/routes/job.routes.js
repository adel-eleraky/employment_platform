import express from "express"
import { AuthMiddleware, restrictTo } from "../middlewares/AuthMiddleware.js"
import { createJobSchema, validate } from "../middlewares/validation/job.validation.js"
import { applyForJob, createJob, getAllJobs, getEmployerJobs, appliedJob } from "../controllers/job.controller.js"


const router = express.Router()

// get all jobs
router.get("/" , getAllJobs) 

// create new job
router.post("/" , AuthMiddleware , restrictTo("Employer")  , validate(createJobSchema) , createJob)

// get jobs created by logged-in employer
router.get("/employer" , AuthMiddleware , restrictTo("Employer") , getEmployerJobs)


// apply for job
router.post("/apply" , AuthMiddleware , restrictTo("Employee") , applyForJob )

// get applied jobs for logged-in user
router.get("/applied" , AuthMiddleware , restrictTo("Employee") , appliedJob )

export default router
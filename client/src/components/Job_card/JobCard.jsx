import React, { useEffect, useRef } from 'react'
import "./JobCard.css"
import formatDate from '../../utils/date'
import { useDispatch, useSelector } from 'react-redux'
import { applyForJob } from '../../rtk/features/jobSlice'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function JobCard({ job }) {

    const { _id, title, description, salary, location, experience_level, createdAt, employer } = job
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    let { applyMessage, appliedJobs } = useSelector(state => state.job)
    const dispatch = useDispatch()

    const handleApply = (id) => {

        if (!user) return navigate("/login")
        if (user.role != "Employee") {
            toast.error(`You are not Employee`);
            return;
        }

        dispatch(applyForJob(id))
    }


    const isApplied = appliedJobs.length > 0 && appliedJobs.some(
        apply => apply.job?._id == _id
    );


    return (
        <div className='job_card mb-4 py-3 px-4 border bg-white rounded'>
            <div className="title fw-bold fs-4 mb-3"> {title} </div>
            <div className="details mb-3">
                <div className="company mb-3 d-flex justify-content-between align-items-center">
                    <div className="name d-flex align-items-center">
                        <i className="fa-solid fa-building"></i>
                        <span className='ms-2'> {employer?.company?.name} </span>
                    </div>
                    <div className="location d-flex align-items-center">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className='ms-2'>  {employer?.company?.location} </span>
                    </div>
                </div>
                <div className="salary mb-3"> <span className='fw-bold'> Salary: </span> ${salary} </div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className="job_location py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {location} </div>
                    <div className="experience  py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {experience_level} </div>
                </div>
                <div className="description mb-3">
                    {description}
                </div>
                <div className="employer d-flex align-items-center justify-content-between">
                    <div> Posted By:  <span className='name'> {employer.name} </span> </div>
                    <div className="post_date"> Date: {formatDate(createdAt)} </div>
                </div>
            </div>
            <button
                onClick={() => handleApply(_id)}
                className='btn d-block w-100 fw-bold text-white'
                style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" , opacity: isApplied ? ".5" : "1" }}
            >
                {isApplied ? "Application submitted" : "Apply"}
            </button>
        </div>
    )
}

export default JobCard

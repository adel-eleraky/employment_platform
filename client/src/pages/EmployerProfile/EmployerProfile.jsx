import React, { useEffect } from 'react'
import EmployerInfo from './EmployerInfoForm'
import JobCard from '../../components/Job_card/JobCard'
import { Link, useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployerJobs } from '../../rtk/features/jobSlice'
import formatDate from '../../utils/date'

function EmployerProfile() {

    const dispatch = useDispatch()
    const location = useLocation();
    let message = location.state?.message;
    const { employerJobs } = useSelector(state => state.job)

    useEffect(() => {
        if (message) {
            toast.success(`${message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            message = ""
        }
    }, [message]);


    console.log("jobs", employerJobs)

    const JobCards = employerJobs && employerJobs.map(job => {

        const { title, description, experience_level, location, salary, createdAt } = job

        return (
            <div key={job._id} className="col-12 col-md-6 col-lg-4">
                <div className='job_card mb-4 py-3 px-4 border bg-white rounded'>
                    <div className="title fw-bold fs-4 mb-3"> {title} </div>
                    <div className="details mb-3">
                        {/* <div className="company mb-3 d-flex justify-content-between align-items-center">
                            <div className="name d-flex align-items-center">
                                <i className="fa-solid fa-building"></i>
                                <span className='ms-2'> company name </span>
                            </div>
                            <div className="location d-flex align-items-center">
                                <i className="fa-solid fa-location-dot"></i>
                                <span className='ms-2'> company location </span>
                            </div>
                        </div> */}
                        <div className="salary mb-3"> <span className='fw-bold'> Salary: </span> ${salary} </div>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <div className="job_location py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {location} </div>
                            <div className="experience  py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {experience_level} </div>
                        </div>
                        <div className="description mb-3">
                            {description}
                        </div>
                        <div className="employer d-flex align-items-center justify-content-between">
                            {/* <div> Posted By:  <span className='name'> {employer.name} </span> </div> */}
                            <div className="post_date"> Date: {formatDate(createdAt)} </div>
                        </div>
                    </div>
                    <button className='btn d-block w-100 fw-bold text-white' style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> View Proposals </button>
                </div>
            </div>
        )
    })


    useEffect(() => {
        dispatch(getEmployerJobs())
    }, [])

    return (
        <div className='employer_profile' >
            <div className="container">
                <div className="info_section bg-white rounded border p-3 mb-5">
                    <h3>Employer Dashboard</h3>
                    <hr />
                    <EmployerInfo />
                </div>
                <Link className='btn btn-success mb-3' to="create-job" > Create New Job</Link>
                {/* <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <JobCard />
                    </div>
                </div> */}
                <div className="row">
                    {JobCards}
                </div>
            </div>
        </div>
    )
}

export default EmployerProfile

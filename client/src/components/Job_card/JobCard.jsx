import React from 'react'
import "./JobCard.css"

function JobCard() {
    return (
        <div className='job_card mb-4 p-3 border'>
            <div className="title fw-bold fs-4 mb-3"> job 1</div>
            <div className="details mb-3">
                <div className="company mb-3 d-flex justify-content-between align-items-center">
                    <div className="name d-flex align-items-center">
                        <i className="fa-solid fa-building"></i>
                        <span className='ms-2'> company name </span>
                    </div>
                    <div className="location d-flex align-items-center">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className='ms-2'> company location </span>
                    </div>
                </div>
                <div className="salary mb-3"> <span className='fw-bold'> Salary: </span> $2000 </div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className="job_location py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)"}}> Remote </div>
                    <div className="experience  py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)"}}> junior </div>
                </div>
                <div className="employer">
                    <p> Posted By:  <span className='name'> employer 1 </span> </p>
                    <div className="post_date"> 2025 - 4 - 18 </div>
                </div>
            </div>
            <button className='btn d-block w-100 fw-bold text-white' style={{ backgroundColor: "rgba(5, 72, 25, 0.52)"}}> Apply </button>
        </div>
    )
}

export default JobCard

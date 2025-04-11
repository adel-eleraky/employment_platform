import React from 'react'
import JobCard from '../../components/Job_card/JobCard'

function JobList() {
    return (
        <div className='job_list' style={{ marginTop: "150px" }}>
            <div className="container">
                <div className="row">
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
                </div>
            </div>
        </div>
    )
}

export default JobList

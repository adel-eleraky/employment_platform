import React, { useEffect, useRef } from 'react'
import JobCard from '../../components/Job_card/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs, getAppliedJobs } from '../../rtk/features/jobSlice'
import { toast } from 'react-toastify'

function JobList() {

    const dispatch = useDispatch()
    const { jobs, applyMessage, applyLoading } = useSelector(state => state.job)
    const { user } = useSelector(state => state.auth)
    
    const JobsElements = jobs && jobs.map(job => {
        return (
            <div key={job._id} className="col-12 col-md-6 col-lg-4">
                <JobCard job={job} />
            </div>
        )
    })


    useEffect(() => {
        dispatch(getAllJobs())
    }, [])


    useEffect(() => {

        if (applyMessage ) {
            toast.success(`${applyMessage}`);
        }

    }, [applyMessage])


    useEffect(() => {
        dispatch(getAppliedJobs())
    }, [user])
    
    return (
        <div className='job_list' >
            <div className="container">
                <div className="row">
                    {JobsElements}
                </div>
            </div>
        </div>
    )
}

export default JobList

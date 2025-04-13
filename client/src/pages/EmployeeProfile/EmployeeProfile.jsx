import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getAppliedJobs } from '../../rtk/features/jobSlice';
import EmployeeInfoForm from './EmployeeInfoForm';
import JobCard from '../../components/Job_card/JobCard';
import { getViews } from '../../rtk/features/viewSlice';

function EmployeeProfile() {

    const dispatch = useDispatch()
    const location = useLocation();
    const { user } = useSelector(state => state.auth)
    const { appliedJobs } = useSelector(state => state.job)
    const { employeeViews } = useSelector(state => state.views)

    const JobCards = appliedJobs && appliedJobs.map(job => {

        return (
            <div key={job._id} className="col-12 col-md-6 col-lg-4">
                <JobCard job={job.job} status={job.status} />
            </div>
        )
    })


    useEffect(() => {
        dispatch(getAppliedJobs())
        dispatch(getViews())
    }, [user])

    return (
        <div className='employee_profile'>
            <div className="container">
                <div className="info_section bg-white rounded border p-3 mb-5">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3>Employee Dashboard</h3>
                        <h5> Profile Views: { employeeViews.length } </h5>
                    </div>
                    <hr />
                    <EmployeeInfoForm />
                </div>

                <div className="row">
                    {appliedJobs.length != 0 ? JobCards : <div className='fw-bold fs-2 text-center pb-5'> No Applied Jobs Yet</div>}
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile

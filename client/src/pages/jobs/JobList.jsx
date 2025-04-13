import React, { useEffect, useState } from 'react'
import JobCard from '../../components/Job_card/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs, getAppliedJobs } from '../../rtk/features/jobSlice'
import { toast } from 'react-toastify'
import JobFilter from '../../utils/JobFilter'

function JobList() {
    const dispatch = useDispatch()
    const { jobs, applyMessage, applyLoading } = useSelector(state => state.job)
    const { user } = useSelector(state => state.auth)

    const [location, setLocation] = useState("")
    const [experience, setExperience] = useState("")
    const [language, setLanguage] = useState("")


    const getFilteredJobs = () => {
        const jobFilter = new JobFilter(jobs)

        return jobFilter
            .filterByExperience(experience)
            .filterByLangs(language)
            .filterByLocation(location)
            .createJobsCards()
    }

    const filteredJobs = getFilteredJobs()


    useEffect(() => {
        dispatch(getAllJobs())
    }, [])


    useEffect(() => {
        dispatch(getAppliedJobs())
    }, [user])


    useEffect(() => {
        if (applyMessage) {
            toast.success(`${applyMessage}`, {
                position: "top-center"
            })
        }
    }, [applyMessage, applyLoading])

    return (
        <div className='job_list'>
            <div className="container">
                <div className="row">
                    <div className="filters col-12 mb-4">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="locationFilter" className="form-label">Location</label>
                                <select
                                    id="locationFilter"
                                    className="form-select"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">All Locations</option>
                                    <option value="Remote">Remote</option>
                                    <option value="On-Site">Onsite</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="experienceFilter" className="form-label">Experience Level</label>
                                <select
                                    id="experienceFilter"
                                    className="form-select"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                >
                                    <option value="">All Levels</option>
                                    <option value="junior">Junior</option>
                                    <option value="mid">Mid</option>
                                    <option value="senior">Senior</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="languageFilter" className="form-label">Programming Languages</label>
                                <select
                                    id="languageFilter"
                                    className="form-select"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="">All Languages</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="c#">C#</option>
                                    <option value="go">Go</option>
                                    <option value="typescript">TypeScript</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {filteredJobs?.length > 0 ? (
                        filteredJobs
                    ) : (
                        <div className="text-center py-5">No jobs found with current filters.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobList

import JobCard from "../components/Job_card/JobCard"

class JobFilter {

    constructor(jobs) {
        this.jobs = jobs
    }


    filterByExperience(level) {
        this.jobs = level ? this.jobs.filter(job => job.experience_level === level) : this.jobs
        return this
    }

    filterByLocation(location) {
        this.jobs = location ? this.jobs.filter(job => job.location === location) : this.jobs
        return this
    }

    filterByLangs(language) {
        this.jobs = language ? this.jobs.filter(job => job.skills.includes(language)) : this.jobs
        return this
    }
    createJobsCards() {
        return this.jobs?.map(job => {
            return (
                <div key={job._id} className="col-12 col-md-6 col-lg-4">
                    <JobCard job={job} />
                </div>
            )
        })
    }
}

export default JobFilter
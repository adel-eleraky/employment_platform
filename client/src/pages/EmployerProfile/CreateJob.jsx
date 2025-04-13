import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"
import { createJob, resetJob } from '../../rtk/features/jobSlice'
import { Navigate, useNavigate } from 'react-router'

function CreateJob() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { newJob, message, createLoading, errors: serverErrors } = useSelector(state => state.job)

    console.log("server", serverErrors)

    useEffect(() => {
        if (newJob) {
            dispatch(resetJob())
            return navigate("..", { state: { message } })
        }
    }, [newJob, createLoading])

    const initialValues = {
        title: "",
        location: "",
        experience_level: "",
        salary: "",
        description: "",
        skills: []
    }


    const validationSchema = Yup.object().shape({

        title: Yup.string()
            .min(2, "Minimum length is 2 characters")
            .matches(/^[A-Za-z0-9+#. ]+$/, "title must only contain letters, numbers, space and specific symbols (+, #, .)")
            .required("Title is required"),

        location: Yup.string()
            .oneOf(["On-Site", "Remote", "Hybrid"], "Location must be one of on-site, remote, hybrid")
            .required("Location is required"),

        experience_level: Yup.string()
            .oneOf(["junior", "mid", "senior"], "Experience level must be one of junior, mid, or senior")
            .required("experience level is required"),

        salary: Yup.number()
            .min(50, "minimum is 50")
            .required("Salary is required"),

        description: Yup.string()
            .min(16, "Description must be at least 16 characters")
            .matches(/^[A-Za-z0-9\s.,'"!?()-]+$/, "description must contain only characters and numbers but not #, %, @, /, *")
            .required("Description is required"),

        skills: Yup.array()
            .min(1, "At least one skill is required")
            .of(Yup.string()
                .matches(/^[A-Za-z0-9+#. ]+$/, "skills must only contain letters, numbers, space and specific symbols (+, #, .)")
                .required())

    })


    const submitHandler = (values) => {
        dispatch(createJob(values))
    }

    return (
        <div className='create_job'>
            <div className="container">
                <div className="row">
                    <div className="info_section bg-white rounded border p-3 mb-5">
                        <h3>Create New Job</h3>
                        <hr />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={submitHandler}
                        >
                            {({ value, errors, touched }) => {
                                return (
                                    <Form method="post" className="needs-validation" noValidate >
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="title" className="form-label">Title</label>
                                                <div className="input-group has-validation mb-4">
                                                    <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                                                        <i className="fa-solid fa-user-tie"></i>
                                                    </span>
                                                    <Field
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        className={`form-control ${touched.title && errors.title && "is-invalid"} rounded-0 rounded-end`}
                                                        placeholder="Enter your title"
                                                    />
                                                    <ErrorMessage
                                                        name="title"
                                                        component="div"
                                                        className="invalid-feedback d-block fs-6 fw-bold"
                                                    />
                                                    {serverErrors && serverErrors.title && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.title} </div>}

                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="location" className="form-label">Location</label>
                                                <div className="input-group has-validation mb-4">
                                                    <Field
                                                        as="select"
                                                        id="location"
                                                        name="location"
                                                        className={`form-control ${touched.location && errors.location && "is-invalid"}`}>
                                                        <option value="">Select Job location</option>
                                                        <option value="On-Site">On-Site</option>
                                                        <option value="Remote">Remote</option>
                                                        <option value="Hybrid">Hybrid</option>
                                                    </Field>
                                                    <ErrorMessage name="location" component="div" className="invalid-feedback d-block fs-6 fw-bold" />
                                                    {serverErrors && serverErrors.location && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.location} </div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="experience_level" className="form-label">Experience Level</label>
                                                <div className="input-group has-validation mb-4">
                                                    <Field
                                                        as="select"
                                                        id="experience_level"
                                                        name="experience_level"
                                                        className={`form-control ${touched.experience_level && errors.experience_level && "is-invalid"}`}>
                                                        <option value="">Select experience level</option>
                                                        <option value="junior">Junior</option>
                                                        <option value="mid">Mid</option>
                                                        <option value="senior">Senior</option>
                                                    </Field>
                                                    <ErrorMessage name="experience_level" component="div" className="invalid-feedback d-block fs-6 fw-bold" />
                                                    {serverErrors && serverErrors.experience_level && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.experience_level} </div>}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="salary" className="form-label fw-bold">Salary</label>
                                                <div className="input-group has-validation mb-4">
                                                    <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                                                        <i className="fa-solid fa-money-bill-1-wave"></i>
                                                    </span>
                                                    <Field
                                                        type="number"
                                                        id="salary"
                                                        name="salary"
                                                        className={`form-control ${touched.salary && errors.salary && "is-invalid"} rounded-0 rounded-end`}
                                                        placeholder="Enter job salary"
                                                    />
                                                    <ErrorMessage
                                                        name="salary"
                                                        component="div"
                                                        className="invalid-feedback d-block fs-6 fw-bold"
                                                    />
                                                    {serverErrors && serverErrors.salary && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.salary} </div>}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <div className="input-group has-validation mb-4">
                                                    <Field
                                                        as="textarea"
                                                        id="description"
                                                        name="description"
                                                        className={`form-control ${touched.description && errors.description && "is-invalid"}`} />
                                                    <ErrorMessage name="description" component="div" className="invalid-feedback d-block fs-6 fw-bold" />
                                                    {serverErrors && serverErrors.description && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.description} </div>}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <FieldArray name="skills">
                                                {({ push, remove, form }) => (
                                                    <div className="mb-4">
                                                        <label className="form-label fw-bold mb-3">
                                                            <i className="bi bi-lightbulb-fill text-success me-2"></i>
                                                            skills
                                                        </label>
                                                        <div className="input-group shadow-sm">
                                                            <input
                                                                type="text"
                                                                className={`form-control ${touched.skills && errors.skills && "is-invalid"}`}
                                                                placeholder="Type a skill and press Enter to add"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter" && e.target.value.trim()) {
                                                                        push(e.target.value.trim());
                                                                        e.target.value = "";
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        <ErrorMessage
                                                            name="skills"
                                                            component="div"
                                                            className="invalid-feedback d-block fs-6 fw-bold "
                                                        />
                                                        {serverErrors && serverErrors.skills && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.skills} </div>}

                                                        <div className="skills-container mt-3 p-4 border rounded-3 bg-light shadow-sm">
                                                            {form.values.skills.length === 0 ? (
                                                                <div className="text-center py-4">
                                                                    <i className="bi bi-lightbulb text-muted fs-1 mb-3"></i>
                                                                    <p className="text-muted mb-0">No skills added yet.</p>
                                                                </div>
                                                            ) : (
                                                                <div className="d-flex flex-wrap gap-2">
                                                                    {form.values.skills.map((item, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="badge bg-success py-2 px-3 fs-6 shadow-sm"
                                                                        >
                                                                            {item}
                                                                            <button
                                                                                type="button"
                                                                                className="btn-close btn-close-white ms-2"
                                                                                aria-label="Remove"
                                                                                onClick={() => remove(index)}
                                                                            ></button>
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                        <button
                                            className="text-white submit-btn btn d-block w-50 py-2 mb-4 mx-auto fs-4"
                                            type="submit"
                                            style={{ backgroundColor: "rgb(5 72 25 / 52%)" }}
                                        >
                                            Save
                                        </button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateJob

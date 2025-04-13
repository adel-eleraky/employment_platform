import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

function EmployeeInfoForm() {

    const { user } = useSelector(state => state.auth)

    const initialValues = {
        name: user.name || "",
        title: user.title || "",
        email: user.email || "",
        national_ID: user.national_ID || "",
        city: user.city || "",
        programming_langs: user.programming_langs || [],
        experience_level: user.experience_level || "",
        bio: user.bio || "",
        role: "Employee",
    }

    const submitHandler = (values) => {

    }
    return (

        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
        >
            {({ value, errors, touched }) => {
                return (
                    <Form method="post" className="needs-validation" noValidate >
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label htmlFor="email" className="form-label fw-bold">
                                    Name
                                </label>
                                <div className="input-group has-validation mb-4">
                                    <span
                                        className="input-group-text  rounded-0 rounded-start"
                                        id="basic-addon1"
                                    >
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`form-control ${touched.name && errors.name && "is-invalid"
                                            } rounded-0 rounded-end`}
                                        placeholder="Enter your name"
                                        aria-describedby="basic-addon1"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="invalid-feedback d-block fs-6 fw-bold"
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="title" className="form-label fw-bold">Title</label>
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
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label htmlFor="national_ID" className="form-label fw-bold">National ID</label>
                                <div className="input-group has-validation mb-4">
                                    <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                                        <i className="fa-solid fa-id-card"></i>
                                    </span>
                                    <Field
                                        type="text"
                                        id="national_ID"
                                        name="national_ID"
                                        className={`form-control ${touched.national_ID && errors.national_ID && "is-invalid"} rounded-0 rounded-end`}
                                        placeholder="Enter national ID"
                                    />
                                    <ErrorMessage
                                        name="national_ID"
                                        component="div"
                                        className="invalid-feedback d-block fs-6 fw-bold"
                                    />
                                    {/* {serverErrors && serverErrors.national_ID && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.national_ID} </div>} */}
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="city" className="form-label fw-bold">City</label>
                                <div className="input-group has-validation mb-4">
                                    <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                                        <i className="fa-solid fa-city"></i>
                                    </span>
                                    <Field
                                        type="text"
                                        id="city"
                                        name="city"
                                        className={`form-control ${touched.city && errors.city && "is-invalid"} rounded-0 rounded-end`}
                                        placeholder="Enter your city"
                                    />
                                    <ErrorMessage
                                        name="city"
                                        component="div"
                                        className="invalid-feedback d-block fs-6 fw-bold"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label htmlFor="email" className="form-label fw-bold">
                                    Email
                                </label>
                                <div className="input-group has-validation mb-4">
                                    <span
                                        className="input-group-text  rounded-0 rounded-start"
                                        id="basic-addon1"
                                    >
                                        <i className="fa-regular fa-envelope"></i>
                                    </span>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${touched.email && errors.email && "is-invalid"
                                            } rounded-0 rounded-end`}
                                        placeholder="Enter your email"
                                        aria-describedby="basic-addon1"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback d-block fs-6 fw-bold"
                                    />
                                    {/* {serverErrors && serverErrors.email && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.email} </div>} */}
                                </div>
                            </div>
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
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <div className="input-group has-validation mb-4">
                                    <Field
                                        as="textarea"
                                        id="bio"
                                        name="bio"
                                        className={`form-control ${touched.bio && errors.bio && "is-invalid"}`} />
                                    <ErrorMessage name="bio" component="div" className="invalid-feedback d-block fs-6 fw-bold" />
                                </div>
                            </div>
                            <div className="col-12 ">
                                <FieldArray name="programming_langs">
                                    {({ push, remove, form }) => (
                                        <div className="mb-4">
                                            <label className="form-label fw-bold mb-3">
                                                <i className="bi bi-lightbulb-fill text-success me-2"></i>
                                                Programming Languages
                                            </label>
                                            <div className="input-group shadow-sm">
                                                <input
                                                    type="text"
                                                    className={`form-control ${touched.programming_langs && errors.programming_langs && "is-invalid"}`}
                                                    placeholder="Type a programming language and press Enter to add"
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
                                                name="programming_langs"
                                                component="div"
                                                className="invalid-feedback d-block fs-6 fw-bold "
                                            />

                                            <div className="programming_langs-container mt-3 p-4 border rounded-3 bg-light shadow-sm">
                                                {form.values.programming_langs.length === 0 ? (
                                                    <div className="text-center py-4">
                                                        <i className="bi bi-lightbulb text-muted fs-1 mb-3"></i>
                                                        <p className="text-muted mb-0">No programming language added yet.</p>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {form.values.programming_langs.map((item, index) => (
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
    )
}

export default EmployeeInfoForm

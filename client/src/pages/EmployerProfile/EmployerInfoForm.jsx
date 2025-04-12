import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

function EmployerInfoForm() {


    const { user } = useSelector(state => state.auth)

    const initialValues = {
        name: user.name || "",
        title: user.title || "",
        email: user.email || "",
        national_ID: user.national_ID || "",
        city: user.city || "",
        company_name: user.company_name || "",
        company_location: user.company_location || "",
        role: "Employer",
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

export default EmployerInfoForm

import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import React from 'react'
import { useSelector } from "react-redux";

function RegisterEmployer({ touched, errors }) {

    const { setFieldValue } = useFormikContext()
    let { errors: serverErrors } = useSelector(state => state.auth)

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <label htmlFor="company_name" className="form-label">Company Name</label>
                    <div className="input-group has-validation mb-4">
                        <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                            <i className="fa-solid fa-building"></i>
                        </span>
                        <Field
                            type="text"
                            id="company_name"
                            name="company_name"
                            className={`form-control ${touched.company_name && errors.company_name && "is-invalid"} rounded-0 rounded-end`}
                            placeholder="Enter company name"
                        />
                        <ErrorMessage
                            name="company_name"
                            component="div"
                            className="invalid-feedback d-block fs-6 fw-bold"
                        />
                        {serverErrors && serverErrors.company_name && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.company_name} </div>}

                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="company_location" className="form-label">Company Location</label>
                    <div className="input-group has-validation mb-4">
                        <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                            <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <Field
                            type="text"
                            id="company_location"
                            name="company_location"
                            className={`form-control ${touched.company_location && errors.company_location && "is-invalid"} rounded-0 rounded-end`}
                            placeholder="Enter company location"
                        />
                        <ErrorMessage
                            name="company_location"
                            component="div"
                            className="invalid-feedback d-block fs-6 fw-bold"
                        />
                        {serverErrors && serverErrors.company_location && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.company_location} </div>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default RegisterEmployer

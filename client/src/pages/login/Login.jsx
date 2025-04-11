import React from 'react'
import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { login } from '../../rtk/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {

    let dispatch = useDispatch()
    const { errors: serverErrors } = useSelector(state => state.auth)

    const initialValues = {
        email: "",
        password: "",
        role: "Employee"
    };

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Invalid Email")
            .matches(/^[^\s@]+@[^\s@]+\.(com|org|net)$/, "Email must end with .com, .org, or .net")
            .required("Email is required"),

        password: Yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Weak Password"
            )
            .required("Password is required"),
    });

    const submitHandler = (values) => {
        dispatch(login(values))
    };

    return (
        <div className="login-page" style={{ marginTop: "150px"}}>
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                >
                    {({ values, errors, touched, setFieldValue }) => {
                        return (
                            <Form method="post" className="needs-validation w-50 m-auto p-5 rounded shadow mt-5" noValidate >
                                <div className="d-flex mb-4 border-bottom position-relative">
                                    <button
                                        type="button"
                                        className={`w-50 btn border-0 py-2 px-4 fw-semibold ${values.role === "Employee" ? "text-dark border-bottom border-3 border-success" : "text-secondary"}`}
                                        onClick={() => setFieldValue("role", "Employee")}
                                    >
                                        I'm an Employee
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-50 btn border-0 py-2 px-4 fw-semibold ${values.role === "Employer" ? "text-dark border-bottom border-3 border-success" : "text-secondary"}`}
                                        onClick={() => setFieldValue("role", "Employer")}
                                    >
                                        I'm an Employer
                                    </button>
                                </div>
                                <label htmlFor="email" className="form-label">
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
                                    {serverErrors && serverErrors.email && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.email} </div>}
                                </div>
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="input-group has-validation mb-4">
                                    <span
                                        className="input-group-text  rounded-0 rounded-start"
                                        id="basic-addon1"
                                    >
                                        <i className="fa-solid fa-lock"></i>
                                    </span>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`form-control ${touched.password && errors.password && "is-invalid"
                                            } rounded-0 rounded-end`}
                                        placeholder="Enter your password"
                                        aria-describedby="basic-addon1"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback d-block fs-6 fw-bold"
                                    />
                                    {serverErrors && serverErrors.password && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.password} </div>}
                                </div>
                                <button
                                    className="text-white submit-btn btn d-block w-50 py-2 mb-4 mx-auto fs-4"
                                    type="submit"
                                    style={{ backgroundColor: "rgb(5 72 25 / 52%)" }}
                                >
                                    Login
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Login

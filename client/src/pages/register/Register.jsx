import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import RegisterEmployee from "./RegisterEmployee";
import RegisterEmployer from "./RegisterEmployer";
import { register } from "../../rtk/features/authSlice";

function Register() {

    const dispatch = useDispatch()
    const [role, setRole] = useState("Employee")
    let { errors: serverErrors } = useSelector(state => state.auth)

    const initialValues = {
        name: "",
        title: "",
        email: "",
        password: "",
        confirmPassword: "",
        national_ID: "",
        city: "",
        role: "Employee",
        bio: "",
        experience_level: "",
        programming_langs: [],
        company_name: "",
        company_location: "",
    };

    let validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Minimum length is 3 characters")
            .max(25, "Maximum length is 25 characters")
            .matches(/^[A-Za-z]+$/, "name must only contain letters")
            .required("Name is required"),

        title: Yup.string()
            .min(2, "Minimum length is 2 characters")
            .matches(/^[A-Za-z]+$/, "title must only contain letters")
            .required("Title is required"),

        email: Yup.string()
            .email("Invalid email")
            .matches(/^[^\s@]+@[^\s@]+\.(com|org|net)$/, "Email must end with .com, .org, or .net")
            .required("Email is required"),

        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character."
            )
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Confirm password must match password")
            .required("Confirm password is required"),

        national_ID: Yup.string()
            .matches(/^[0-9]{14}$/, "National ID must be 14 digits")
            .required("National ID is required"),

        city: Yup.string()
            .min(2, "Minimum length is 2 characters")
            .matches(/^[A-Za-z]+$/, "city must only contain letters").required("City is required"),

        role: Yup.string().oneOf(["Employee", "Employer"]).required("Role is required"),


    });

    if (role == "Employee") {
        validationSchema = validationSchema.concat(
            Yup.object().shape({

                bio: Yup.string()
                    .min(16, "Bio must be at least 16 characters")
                    .matches(/^[A-Za-z0-9\s.,'"!?()-]+$/, "bio must contain only characters and numbers but not #, %, @, /, *")
                    .required("Bio is required"),

                experience_level: Yup.string()
                    .oneOf(["junior", "mid", "senior"])
                    .required("Experience level is required"),

                programming_langs: Yup.array()
                    .min(1, "At least one programming language is required")
                    .of(
                        Yup.string()
                            .matches(/^[A-Za-z0-9+#. ]+$/, "skills must only contain letters, numbers, space and specific symbols (+, #, .)")
                            .required()
                    )
            })
        )
    }

    if (role == "Employer") {
        validationSchema = validationSchema.concat(
            Yup.object().shape({
                company_name: Yup.string()
                    .min(3, "Company name must be at least 2 characters")
                    .matches(/^[A-Za-z]+$/, "company name must only contain letters")
                    .required("company name is required"),

                company_location: Yup.string()
                    .min(2, "Company location must be at least 2 characters")
                    .matches(/^[A-Za-z]+$/, "company location must only contain letters")
                    .required("company location is required")
            })
        )
    }

    const submitHandler = (values) => {
        if (values.role === "Employee") {
            delete values.company_name;
            delete values.company_location;
        } else if (values.role = "Employer") {
            delete values.bio;
            delete values.programming_langs;
            delete values.experience_level;
        }
        console.log(values)
        dispatch(register(values))
    };

    return (
        <div className="register-page" style={{ paddingBottom: "30px" }}>
            <div className="container">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                >
                    {({ values, errors, touched, setFieldValue }) => {

                        return (
                            <Form method="post" className="needs-validation w-75 m-auto p-5 rounded shadow mt-5 bg-white" noValidate >
                                <div className="d-flex mb-4 border-bottom position-relative">
                                    <button
                                        type="button"
                                        className={`w-50 btn border-0 py-2 px-4 fw-semibold ${values.role === "Employee" ? "text-dark border-bottom border-3 border-success" : "text-secondary"}`}
                                        onClick={() => { setFieldValue("role", "Employee"); setRole("Employee") }}
                                    >
                                        I'm an Employee
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-50 btn border-0 py-2 px-4 fw-semibold ${values.role === "Employer" ? "text-dark border-bottom border-3 border-success" : "text-secondary"}`}
                                        onClick={() => { setFieldValue("role", "Employer"); setRole("Employer") }}
                                    >
                                        I'm an Employer
                                    </button>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="email" className="form-label">
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
                                            {serverErrors && serverErrors.name && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.name} </div>}

                                        </div>
                                    </div>
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
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="national_ID" className="form-label">National ID</label>
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
                                            {serverErrors && serverErrors.national_ID && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.national_ID} </div>}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="city" className="form-label">City</label>
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
                                            {serverErrors && serverErrors.city && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.city} </div>}
                                        </div>
                                    </div>
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

                                <div className="row">
                                    <div className="col-16 col-md-6">

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
                                    </div>
                                    <div className="col-16 col-md-6">
                                        <label htmlFor="password" className="form-label">
                                            Confirm Password
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
                                                id="confirmPass"
                                                name="confirmPassword"
                                                className={`form-control ${touched.confirmPassword && errors.confirmPassword && "is-invalid"
                                                    } rounded-0 rounded-end`}
                                                placeholder="Confirm Password"
                                                aria-describedby="basic-addon1"
                                            />
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="invalid-feedback d-block fs-6 fw-bold"
                                            />
                                            {serverErrors && serverErrors.confirmPassword && <div className='invalid-feedback d-block fs-6 fw-bold'> {serverErrors?.confirmPassword} </div>}
                                        </div>
                                    </div>
                                </div>



                                {values.role === "Employee" && (
                                    <RegisterEmployee values={values} touched={touched} errors={errors} />
                                )}
                                {values.role === "Employer" && (
                                    <RegisterEmployer touched={touched} errors={errors} />
                                )}

                                <button
                                    className="text-white submit-btn btn d-block w-50 py-2 mb-4 mx-auto fs-4"
                                    type="submit"
                                    style={{ backgroundColor: "rgb(5 72 25 / 52%)" }}
                                >
                                    Register
                                </button>
                            </Form>
                        );
                    }}
                </Formik>

            </div>
        </div>
    )
}

export default Register

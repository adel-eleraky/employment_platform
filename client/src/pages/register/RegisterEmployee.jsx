import React, { useState } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext } from "formik";

function RegisterEmployee({ values, touched, errors }) {

    const { setFieldValue } = useFormikContext()

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <div className="input-group has-validation mb-4">
                        <Field
                            type="text"
                            id="bio"
                            name="bio"
                            className={`form-control ${touched.bio && errors.bio && "is-invalid"}`} />
                        <ErrorMessage name="bio" component="div" className="invalid-feedback d-block fs-6 fw-bold" />
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

            {/* <label htmlFor="programming_langs" className="form-label">Programming Languages</label>
            <div className="input-group has-validation mb-4">
                <Field as="select" id="programming_langs" name="programming_langs" multiple className="form-control">
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Ruby">Ruby</option>
                </Field>
                <ErrorMessage name="programming_langs" component="div" className="invalid-feedback" />
            </div> */}

            <div>
                <div className="mb-4">
                    {/* <label htmlFor="programming_langs" className="form-label fw-bold mb-3">
                        <i className="bi bi-lightbulb-fill text-success me-2"></i>
                        Programming languages
                    </label> */}
                    {/* <div className="input-group mb-3 shadow-sm">

                        <Field
                            type="text"
                            name="programming_langs[]"
                            className="form-control form-control-lg"
                            id="programming_langs"
                            placeholder="Type a programming language and press Enter to add"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.target.value.trim()) {
                                    setFieldValue("programming_langs", [
                                        ...values.programming_langs,
                                        e.target.value.trim(),
                                    ]);
                                    e.target.value = "";
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                    <ErrorMessage name="programming_langs" component="div" className="invalid-feedback" />
                    <div className="programming_langs-container p-4 border rounded-3 bg-light shadow-sm">
                        {values.programming_langs.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="bi bi-lightbulb text-muted fs-1 mb-3"></i>
                                <p className="text-muted mb-0">
                                    No programming language added yet.
                                </p>
                            </div>
                        ) : (
                            <div className="d-flex flex-wrap gap-2">
                                {values.programming_langs.map((item, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-success py-2 px-3 fs-6 shadow-sm"
                                        style={{ transition: "all 0.2s ease" }}
                                    >
                                        {item}
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white ms-2"
                                            aria-label="Remove"
                                            onClick={() =>
                                                setFieldValue(
                                                    "programming_langs",
                                                    values.programming_langs.filter((_, i) => i !== index)
                                                )
                                            }
                                        ></button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div> */}

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
        </>
    )
}

export default RegisterEmployee

import Joi from "joi"
import { availableRoles } from "../../utils/roles.js"


export const registerSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(25)
        .required()
        .messages({
            "any.required": "name is required",
            "string.min": "minimum length is 3 characters",
            "string.max": "max length is 25 characters",
            "string.empty": "name can't be empty"
        })
    ,


    title: Joi.string()
        .min(2)
        .required()
        .messages({
            "any.required": "title is required",
            "string.min": "minimum length is 2 characters",
            "string.empty": "title can't be empty"
        })
    ,


    email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required()
        .external(async (value, helpers) => {
            const { role } = helpers.prefs.context

            const existingEmail = await availableRoles[role].findOne({ email: value })
            if (existingEmail) {
                throw new Joi.ValidationError("email is already exist", [
                    {
                        message: "email is already exist",
                        path: ["email"],
                    },
                ]);
            }
        })
        .messages({
            "any.required": "email is required",
            "string.email": "Invalid email",
            "string.empty": "email can't be empty"
        })
    ,


    password: Joi.string()
        .pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;\"'`~<>,.?/\\\\|]).{8,}$"))
        .required()
        .messages({
            "any.required": "password is required",
            "string.pattern.base": "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.",
            "string.empty": "password can't be empty"
        })
    ,


    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.required": "confirm password is required",
            "any.only": "confirm password must match password",
            "string.empty": "confirm password can't be empty"
        }),


    national_ID: Joi.string()
        .pattern(new RegExp(/[0-9]{14}/))
        .required()
        .external(async (value, helpers) => {
            const { role } = helpers.prefs.context

            const existingNationalId = await availableRoles[role].findOne({ national_ID: value })
            if (existingNationalId) {
                throw new Joi.ValidationError("national ID is already exist", [
                    {
                        message: "national ID is already exist",
                        path: ["national_ID"],
                    },
                ]);
            }
        })
        .messages({
            "any.required": "national ID is required",
            "string.pattern.base": "national ID must be 14 numbers",
            "string.empty": "national ID can't be empty"
        })
    ,


    city: Joi.string()
        .required()
        .messages({
            "any.required": "city is required",
            "string.empty": "city can't be empty"
        }),


    role: Joi.string()
        .valid("Employee", "Employer")
        .required()
        .messages({
            "any.required": "role is required",
            "any.only": "role must be one of [Employee, Employer]",
            "string.empty": "role can't be empty"
        })
    ,


    bio: Joi.string()
        .min(16)
        .when("role", {
            is: "Employee",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        })
        .messages({
            "any.required": "bio is required",
            "string.min": "minimum length is 16 characters",
            "string.empty": "bio can't be empty"
        }),


    experience_level: Joi.string()
        .valid("junior", "mid", "senior")
        .when("role", {
            is: "Employee",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        })
        .messages({
            "any.required": "experience level is required",
            "any.only": "experience level must be one of [junior, mid, senior]",
            "string.empty": "experience level can't be empty"
        }),


    programming_langs: Joi.array()
        .items(Joi.string())
        .when("role", {
            is: "Employee",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        })
        .messages({
            "any.required": "programming languages is required",
            "array.base": "programming languages must be array",
            "string.empty": "programming langs can't be empty"
        }),


    company_name: Joi.string()
        .min(2)
        .when("role", {
            is: "Employer",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        })
        .messages({
            "any.required": "company name is required",
            "string.min": "minimum length is 2 characters",
            "string.empty": "company name can't be empty"
        }),


    company_location: Joi.string()
        .min(2)
        .when("role", {
            is: "Employer",
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        })
        .messages({
            "any.required": "company location is required",
            "string.min": "minimum length is 2 characters",
            "string.empty": "company location can't be empty"
        }),
})


export const loginSchema = Joi.object({

    email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required()
        .messages({
            "any.required": "email is required",
            "string.email": "Invalid email",
            "string.empty": "email can't be empty"
        }),

    password: Joi.string()
        .pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;\"'`~<>,.?/\\\\|]).{8,}$"))
        .required()
        .messages({
            "any.required": "password is required",
            "string.pattern.base": "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.",
            "string.empty": "password can't be empty"
        })
    ,

    role: Joi.string()
        .valid("Employee", "Employer")
        .required()
        .messages({
            "any.required": "role is required",
            "any.only": "role must be one of [Employee, Employer]",
            "string.empty": "role can't be empty"
        })
    ,
})

export const validate = (schema) => {
    return async (req, res, next) => {
        try {

            await schema.validateAsync(req.body, { abortEarly: false, context: req.body })
            next()
        } catch (error) {

            if (error.isJoi) {

                const errors = {};
                for (let err of error.details) {
                    errors[err.path[0]] = err.message;
                }
                return res.status(400).json({
                    status: "fail",
                    message: "validation error",
                    errors,
                });
            }
        }
    }
}
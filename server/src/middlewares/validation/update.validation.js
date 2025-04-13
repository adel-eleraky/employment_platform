import Joi from "joi";
import { availableRoles } from "../../utils/roles.js"


export const updateEmployeeSchema = Joi.object({
    name: Joi.string()
        .optional()
        .min(3)
        .max(25)
        .pattern(new RegExp(/^[A-Za-z]+$/))
        .messages({
            "string.min": "minimum length is 3 characters",
            "string.max": "max length is 25 characters",
            "string.pattern.base": "name must only contain letters"
        }),

    title: Joi.string()
        .min(2)
        .pattern(new RegExp(/^[A-Za-z]+$/))
        .optional()
        .messages({
            "string.min": "minimum length is 2 characters",
            "string.pattern.base": "title must only contain letters"
        })
    ,

    email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .optional()
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
            "string.email": "Invalid email",
        })
    ,

    national_ID: Joi.string()
        .pattern(new RegExp(/[0-9]{14}/))
        .optional()
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
            "string.pattern.base": "national ID must be 14 numbers",
        })
    ,

    city: Joi.string()
        .pattern(new RegExp(/^[A-Za-z]+$/))
        .optional()
        .messages({
            "string.pattern.base": "city must only contain letters"
        }),

    bio: Joi.string()
        .min(16)
        .pattern(new RegExp(/^[A-Za-z0-9\s.,'"!?()-]+$/))
        .optional()
        .messages({
            "string.min": "minimum length is 16 characters",
            "string.pattern.base": "bio must contain only characters and numbers but not #, %, @, /, *"
        }),

    experience_level: Joi.string()
        .valid("junior", "mid", "senior")
        .messages({
            "any.only": "experience level must be one of [junior, mid, senior]",
        }),


    programming_langs: Joi.array()
        .items(Joi.string().pattern(new RegExp(/^[A-Za-z0-9+#.]+$/)).required().messages({
            "string.base": "Each skill must be a string",
            "string.pattern.base": "Programming languages must only contain letters"
        }))
        .optional()
        .messages({
            "array.base": "programming languages must be array",
        }),
});



export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false, context: req.user });
        next()
    } catch (error) {

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
};
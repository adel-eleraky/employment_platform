import Joi from "joi"


export const createJobSchema = Joi.object({

    title: Joi.string()
        .min(2)
        .pattern(new RegExp(/^[A-Za-z0-9+#. ]+$/))
        .required()
        .messages({
            'string.min': 'Minimum length is 2 characters',
            'any.required': 'Title is required',
            "string.pattern.base": "title must only contain letters, numbers, space and specific symbols (+, #, .)"
        }),

    location: Joi.string()
        .valid('On-Site', 'Remote', 'Hybrid')
        .required()
        .messages({
            'any.required': 'Location is required',
            'any.only': 'Location must be one of on-site, remote, hybrid',
        }),

    experience_level: Joi.string()
        .valid('junior', 'mid', 'senior')
        .required()
        .messages({
            'any.only': 'Experience level must be one of junior, mid, or senior',
            'any.required': 'Experience level is required'
        }),

    salary: Joi.number()
        .min(50)
        .required()
        .messages({
            'number.min': 'minimum is 50',
            'any.required': 'Salary is required'
        }),

    description: Joi.string()
        .min(16)
        .pattern(new RegExp(/^[A-Za-z0-9\s.,'"!?()-]+$/))
        .required()
        .messages({
            'string.min': 'Description must be at least 16 characters',
            'any.required': 'Description is required',
            "string.pattern.base": "bio must contain only characters and numbers but not #, %, @, /, *"
        }),

    skills: Joi.array()
        .items(Joi.string().pattern(new RegExp(/^[A-Za-z0-9+#.]+$/)).required())
        .min(1)
        .required()
        .messages({
            "any.required": "Skills is required",
            "array.base": "Skills must be an array",
            "array.min": "At least one skill is required",
        })
});


export const validate = (schema) => {
    return async (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {

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

        next()
    }
}
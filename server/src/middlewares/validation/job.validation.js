import Joi from "joi"


export const createJobSchema = Joi.object({

    title: Joi.string()
        .min(2)
        .required()
        .messages({
            'string.min': 'Minimum length is 2 characters',
            'any.required': 'Title is required'
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
        .min(1)
        .required()
        .messages({
            'number.min': 'Enter positive number',
            'any.required': 'Salary is required'
        }),

    description: Joi.string()
        .min(16)
        .required()
        .messages({
            'string.min': 'Description must be at least 16 characters',
            'any.required': 'Description is required'
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
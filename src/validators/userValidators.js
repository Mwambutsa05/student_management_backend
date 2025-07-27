const Joi = require('joi');

// User Registration Validation Schema
const registerSchema = Joi.object({
    fullName: Joi.string().required().messages({
        'string.empty': 'Full name is required',
        'any.required': 'Full name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    }),
    username: Joi.string().alphanum().min(3).max(30).optional().messages({
        'string.alphanum': 'Username must only contain letters and numbers',
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username cannot be longer than 30 characters'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.pattern.base': 'Phone number must be between 10-15 digits'
    }),
    dateOfBirth: Joi.date().max('now').optional().messages({
        'date.max': 'Date of birth cannot be in the future'
    })
});

// User Login Validation Schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    })
});

// Profile Update Validation Schema
const updateProfileSchema = Joi.object({
    fullName: Joi.string().optional().messages({
        'string.empty': 'Full name cannot be empty'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.pattern.base': 'Phone number must be between 10-15 digits'
    }),
    dateOfBirth: Joi.date().max('now').optional().messages({
        'date.max': 'Date of birth cannot be in the future'
    })
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema
};
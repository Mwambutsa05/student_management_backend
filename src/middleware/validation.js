const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false, // Show all validation errors
            allowUnknown: true, // Allow unknown fields (can be set to false if strict validation needed)
            stripUnknown: true // Remove unknown fields from req.body
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        next();
    };
};

module.exports = validation;
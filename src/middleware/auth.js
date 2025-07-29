const jwt = require('jsonwebtoken');
const userRepository = require('../entities/user/UserRepository');

const auth = (requiredRoles = []) => {
    return async (req, res, next) => {
        try {
            // Get token from Authorization header
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. No token provided.'
                });
            }

            const token = authHeader.split(' ')[1]; // Bearer TOKEN

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. Invalid token format.'
                });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from database
            const user = await userRepository.findById(decoded.id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. User not found.'
                });
            }

            // Check if user is active
            if (user.status !== 'active') {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. Account is not active.'
                });
            }

            // Check role-based access if roles are specified
            if (requiredRoles.length > 0) {
                if (!requiredRoles.includes(user.role)) {
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied. Insufficient permissions.'
                    });
                }
            }

            // Add user to request object
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status
            };

            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. Invalid token.'
                });
            }

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. Token expired.'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Internal server error during authentication.'
            });
        }
    };
};

module.exports = auth;
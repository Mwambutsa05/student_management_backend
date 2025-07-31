const { verifyToken, extractTokenFromHeader } = require('../config/jwt');
const userRepository = require('../entities/user/UserRepository');

function auth(allowedRoles = []) {
    return async (req, res, next) => {
        try {
            console.log('🔐 Auth middleware triggered for:', req.method, req.path);

            // Extract token from Authorization header
            const authHeader = req.headers.authorization;
            const token = extractTokenFromHeader(authHeader);

            if (!token) {
                console.log('❌ No token provided');
                return res.status(401).json({
                    success: false,
                    message: 'Access denied. No token provided.'
                });
            }

            // Verify token
            const decoded = verifyToken(token);
            console.log('✅ Token verified for user:', decoded.id);

            // Handle default admin case
            if (decoded.id === 'admin') {
                if (allowedRoles.length > 0 && !allowedRoles.includes('admin')) {
                    console.log('❌ Default admin access denied. Required roles:', allowedRoles);
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied. Insufficient permissions.'
                    });
                }

                req.user = {
                    id: 'admin',
                    email: decoded.email,
                    fullName: decoded.fullName,
                    role: 'admin',
                    status: 'active'
                };

                console.log('✅ Default admin auth successful');
                return next();
            }

            // For regular users, fetch from database
            const user = await userRepository.findById(decoded.id);
            if (!user) {
                console.log('❌ User not found in database:', decoded.id);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token. User not found.'
                });
            }

            // Check if user is active (using the correct status values)
            if (user.status !== 'active') {
                console.log('❌ User is not active:', user.id, 'Status:', user.status);
                return res.status(403).json({
                    success: false,
                    message: 'Account is not active. Please contact administrator.'
                });
            }

            // Check role-based access
            if (allowedRoles.length > 0) {
                const userRole = user.role || 'user';
                if (!allowedRoles.includes(userRole)) {
                    console.log('❌ Insufficient permissions. Required:', allowedRoles, 'Has:', userRole);
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied. Insufficient permissions.'
                    });
                }
            }

            req.user = {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                role: user.role || 'user',
                status: user.status
            };

            console.log('✅ Auth successful for user:', req.user.id, 'Role:', req.user.role);
            next();

        } catch (error) {
            console.error('❌ Auth middleware error:', error.message);

            if (error.message.includes('Invalid or expired token') ||
                error.name === 'JsonWebTokenError' ||
                error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired token'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Authentication error'
            });
        }
    };
}

// Optional: Middleware for optional authentication (user can be logged in or not)
function optionalAuth() {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const token = extractTokenFromHeader(authHeader);

            if (token) {
                const decoded = verifyToken(token);
                
                // Handle default admin case
                if (decoded.id === 'admin') {
                    req.user = {
                        id: 'admin',
                        email: decoded.email,
                        fullName: decoded.fullName,
                        role: 'admin',
                        status: 'active'
                    };
                } else {
                    // For regular users, fetch from database
                    const user = await userRepository.findById(decoded.id);

                    if (user && user.status === 'active') {
                        req.user = {
                            id: user.id,
                            email: user.email,
                            fullName: user.full_name,
                            role: user.role || 'user',
                            status: user.status
                        };
                    }
                }
            }

            next();
        } catch (error) {
            // For optional auth, we don't return errors, just continue without user
            console.log('⚠️ Optional auth failed:', error.message);
            next();
        }
    };
}

module.exports = auth;
module.exports.optionalAuth = optionalAuth;
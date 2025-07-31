const userService = require('../user/UserService');

class AuthController {
    async register(req, res, next) {
        try {
            console.log(' Register request received:', { email: req.body.email });

            const { fullName, email, password, phoneNumber, dateOfBirth, username } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, email, and password are required'
                });
            }

            const result = await userService.register({
                fullName,
                email,
                password,
                phoneNumber,
                dateOfBirth,
                username
            });

            console.log(' Registration successful for:', email);

            res.status(201).json(result);
        } catch (error) {
            console.error(' Registration error:', error.message);

            // Handle specific errors
            if (error.message.includes('already exists')) {
                return res.status(409).json({
                    success: false,
                    message: error.message
                });
            }

            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors.map(err => ({
                        field: err.path,
                        message: err.message
                    }))
                });
            }

            next(error);
        }
    }

    async login(req, res, next) {
        try {
            console.log(' Login request received:', { email: req.body.email });

            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const result = await userService.login(email, password);

            console.log('Login successful for:', email);
            console.log(' Token generated:', result.token ? 'Yes' : 'No');

            res.status(200).json(result);
        } catch (error) {
            console.error(' Login error:', error.message);

            // Handle specific errors
            if (error.message.includes('Invalid email or password') ||
                error.message.includes('blocked')) {
                return res.status(401).json({
                    success: false,
                    message: error.message
                });
            }

            next(error);
        }
    }

    async getProfile(req, res, next) {
        try {
            console.log(' Get profile request for user:', req.user?.id);

            const userId = req.user.id;
            const result = await userService.getProfile(userId);

            res.status(200).json(result);
        } catch (error) {
            console.error('Get profile error:', error.message);
            next(error);
        }
    }

    async logout(req, res) {
        try {
            console.log('User logged out:', req.user?.id);

            res.status(200).json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error(' Logout error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
    }
}

module.exports = new AuthController();
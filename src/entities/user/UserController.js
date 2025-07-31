const userRepository = require('./UserRepository');
const RegistrationResponseDTO = require('./RegistrationResponseDTO');
const LoginResponseDTO = require('./LoginResponseDTO');
const ProfileDTO = require('./ProfileDTO'); // Fixed import
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env');

class UserController {
    // ==================== PUBLIC USER ROUTES ====================

    async register(req, res, next) {
        try {
            console.log('👤 User registration request received:', { email: req.body.email });

            const { fullName, email, password, phoneNumber, dateOfBirth } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, email, and password are required'
                });
            }

            // Prevent registration of admin email
            if (email === 'mwambutsadaryce@gmail.com') {
                return res.status(403).json({
                    success: false,
                    message: 'Cannot register as admin. Admin is already set.'
                });
            }

            // Check if user already exists
            const existingUser = await userRepository.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists'
                });
            }

            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user with role 'user' by default
            const userData = {
                full_name: fullName,
                email,
                password: hashedPassword,
                phoneNumber,
                dateOfBirth,
                role: 'user',
                status: 'active'
            };

            const user = await userRepository.create(userData);

            console.log('✅ User registration successful:', email);

            res.status(201).json({
                success: true,
                data: new RegistrationResponseDTO(user),
                message: 'User registered successfully'
            });
        } catch (error) {
            console.error('❌ User registration error:', error.message);
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            console.log('👤 User login request received:', { email: req.body.email });

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Only allow login for non-admin users here
            if (email === 'mwambutsadaryce@gmail.com') {
                return res.status(403).json({
                    success: false,
                    message: 'Admin must login via /auth/admin/login'
                });
            }

            // Find user by email
            const user = await userRepository.findByEmail(email);
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Check if user is active
            if (user.status !== 'active') {
                return res.status(401).json({
                    success: false,
                    message: 'Account is not active'
                });
            }

            // Create user token
            const userPayload = {
                id: user.id,
                email: user.email,
                role: user.role,
                fullName: user.full_name
            };

            const token = jwt.sign(userPayload, JWT_SECRET, {
                expiresIn: '1d',
                issuer: 'student-management-api',
                audience: 'student-management-client'
            });

            console.log('✅ User login successful:', email);

            res.status(200).json({
                success: true,
                data: new LoginResponseDTO(user, token),
                message: 'Login successful'
            });
        } catch (error) {
            console.error('❌ User login error:', error.message);
            next(error);
        }
    }

    // ==================== AUTHENTICATED USER ROUTES ====================

    async getProfile(req, res, next) {
        try {
            console.log('👤 Get user profile request for user:', req.user?.id);

            const user = await userRepository.findById(req.user.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: new ProfileDTO(user)
            });
        } catch (error) {
            console.error('❌ Get user profile error:', error.message);
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            console.log('👤 Update user profile request for user:', req.user?.id);

            const user = await userRepository.update(
                req.user.id,
                req.body,
                req.user.role
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: new ProfileDTO(user),
                message: 'Profile updated successfully'
            });
        } catch (error) {
            console.error('❌ Update user profile error:', error.message);
            next(error);
        }
    }

    async updateProfileImage(req, res, next) {
        try {
            console.log('👤 Update user profile image request for user:', req.user?.id);

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No image file provided'
                });
            }

            // Assuming the upload middleware stores the file URL in req.file.path or req.file.secure_url
            const imageUrl = req.file.secure_url || req.file.path;

            const user = await userRepository.updateProfileImage(req.user.id, imageUrl);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: new ProfileDTO(user),
                message: 'Profile image updated successfully'
            });
        } catch (error) {
            console.error('❌ Update user profile image error:', error.message);
            next(error);
        }
    }

    async logout(req, res) {
        try {
            console.log('👋 User logged out:', req.user?.id);

            res.status(200).json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('❌ User logout error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
    }
}

module.exports = new UserController();
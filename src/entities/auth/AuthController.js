const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env');
const User = require('../user/User');

class AuthController {
    // Default admin credentials
    static ADMIN_EMAIL = 'mwambutsadaryce@gmail.com';
    static ADMIN_PASSWORD = 'Ineza2005';

    async adminLogin(req, res, next) {
        try {
            console.log('🔐 Admin login request received:', { email: req.body.email });

            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Check if it's the default admin
            if (email === AuthController.ADMIN_EMAIL) {
                if (password === AuthController.ADMIN_PASSWORD) {
                    // Create admin token
                    const adminPayload = {
                        id: 'admin',
                        email: AuthController.ADMIN_EMAIL,
                        role: 'admin',
                        fullName: 'System Administrator'
                    };

                    const token = jwt.sign(adminPayload, JWT_SECRET, {
                        expiresIn: '1d',
                        issuer: 'student-management-api',
                        audience: 'student-management-client'
                    });

                    console.log('✅ Admin login successful:', email);

                    return res.status(200).json({
                        success: true,
                        data: {
                            user: adminPayload,
                            token: token
                        },
                        message: 'Admin login successful'
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid admin credentials'
                    });
                }
            }

            // Check if user exists and is admin
            const user = await User.findOne({ where: { email, role: 'admin' } });
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid admin credentials'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid admin credentials'
                });
            }

            // Check if user is active
            if (user.status !== 'active') {
                return res.status(401).json({
                    success: false,
                    message: 'Account is not active'
                });
            }

            // Create admin token
            const adminPayload = {
                id: user.id,
                email: user.email,
                role: user.role,
                fullName: user.full_name
            };

            const token = jwt.sign(adminPayload, JWT_SECRET, {
                expiresIn: '1d',
                issuer: 'student-management-api',
                audience: 'student-management-client'
            });

            console.log('✅ Admin login successful:', email);

            res.status(200).json({
                success: true,
                data: {
                    user: adminPayload,
                    token: token
                },
                message: 'Admin login successful'
            });
        } catch (error) {
            console.error('❌ Admin login error:', error.message);
            next(error);
        }
    }

    async adminRegister(req, res, next) {
        try {
            console.log('🔐 Admin registration request received:', { email: req.body.email });

            const { fullName, email, password, phoneNumber } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, email, and password are required'
                });
            }

            // Check if admin already exists
            const existingAdmin = await User.findOne({ 
                where: { 
                    email,
                    role: 'admin'
                } 
            });

            if (existingAdmin) {
                return res.status(409).json({
                    success: false,
                    message: 'Admin with this email already exists'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create admin user
            const adminUser = await User.create({
                full_name: fullName,
                email: email,
                password: hashedPassword,
                role: 'admin',
                status: 'active'
            });

            // Create admin token
            const adminPayload = {
                id: adminUser.id,
                email: adminUser.email,
                role: adminUser.role,
                fullName: adminUser.full_name
            };

            const token = jwt.sign(adminPayload, JWT_SECRET, {
                expiresIn: '1d',
                issuer: 'student-management-api',
                audience: 'student-management-client'
            });

            console.log('✅ Admin registration successful:', email);

            res.status(201).json({
                success: true,
                data: {
                    user: adminPayload,
                    token: token
                },
                message: 'Admin registered successfully'
            });
        } catch (error) {
            console.error('❌ Admin registration error:', error.message);
            next(error);
        }
    }

    async getAdminProfile(req, res, next) {
        try {
            console.log('👤 Get admin profile request for admin:', req.user?.id);

            const adminId = req.user.id;
            
            // If it's the default admin
            if (adminId === 'admin') {
                return res.status(200).json({
                    success: true,
                    data: {
                        id: 'admin',
                        email: AuthController.ADMIN_EMAIL,
                        role: 'admin',
                        fullName: 'System Administrator',
                        status: 'active'
                    }
                });
            }

            // Get admin from database
            const admin = await User.findByPk(adminId);
            
            if (!admin || admin.role !== 'admin') {
                return res.status(404).json({
                    success: false,
                    message: 'Admin not found'
                });
            }

            res.status(200).json({
                success: true,
                data: {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role,
                    fullName: admin.full_name,
                    status: admin.status
                }
            });
        } catch (error) {
            console.error('❌ Get admin profile error:', error.message);
            next(error);
        }
    }

    async adminLogout(req, res) {
        try {
            console.log('👋 Admin logged out:', req.user?.id);

            res.status(200).json({
                success: true,
                message: 'Admin logged out successfully'
            });
        } catch (error) {
            console.error('❌ Admin logout error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
    }
}

module.exports = new AuthController();
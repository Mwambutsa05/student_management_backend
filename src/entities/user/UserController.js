const userRepository = require('./UserRepository');
const RegistrationResponseDTO = require('./RegistrationResponseDTO');
const LoginResponseDTO = require('./LoginResponseDTO');
const ProfileDTO = require('./Upload'); // Note: This should probably be a ProfileDTO file, not Upload

class UserController {
    // ==================== PUBLIC ROUTES ====================

    async register(req, res, next) {
        try {
            const user = await userRepository.create(req.body);
            res.status(201).json({
                success: true,
                data: new RegistrationResponseDTO(user),
                message: 'User registered successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await userRepository.authenticate(email, password);

            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            res.status(200).json({
                success: true,
                data: new LoginResponseDTO(result.user, result.token),
                message: 'Login successful'
            });
        } catch (error) {
            next(error);
        }
    }

    // ==================== AUTHENTICATED USER ROUTES ====================

    async getProfile(req, res, next) {
        try {
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
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
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
            next(error);
        }
    }

    async updateProfileImage(req, res, next) {
        try {
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
            next(error);
        }
    }

    // ==================== ADMIN-ONLY ROUTES ====================

    async getAllUsers(req, res, next) {
        try {
            const users = await userRepository.findAll();
            res.status(200).json({
                success: true,
                data: users.map(user => new ProfileDTO(user)),
                count: users.length
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userRepository.findById(id);

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
            next(error);
        }
    }

    async updateUserStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const user = await userRepository.updateStatus(
                id,
                status,
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
                message: 'User status updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await userRepository.delete(id, req.user.role);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // ==================== SPECIAL ADMIN ROUTES ====================

    async createUserByAdmin(req, res, next) {
        try {
            // Admin can create users with specific roles
            const userData = {
                ...req.body,
                createdBy: req.user.id
            };

            const user = await userRepository.createByAdmin(userData);

            res.status(201).json({
                success: true,
                data: new RegistrationResponseDTO(user),
                message: 'User created successfully by admin'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
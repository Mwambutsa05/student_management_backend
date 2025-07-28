const userRepository = require('./UserRepository');
const RegistrationResponseDTO = require('./RegistrationResponseDTO');
const ProfileDTO = require('./Upload');

class UserController {
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

    async getProfile(req, res, next) {
        try {
            const user = await userRepository.findById(req.user.id);
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
            res.status(200).json({
                success: true,
                data: new ProfileDTO(user),
                message: 'Profile updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // ADMIN ONLY ROUTES
    async getAllUsers(req, res, next) {
        try {
            const users = await userRepository.findAll();
            res.status(200).json({
                success: true,
                data: users.map(user => new ProfileDTO(user))
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
            await userRepository.delete(id, req.user.role);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
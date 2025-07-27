const userService = require('./UserService');

class UserController {
    async register(req, res, next) {
        try {
            const result = await userService.register(req.body);
            res.status(201).json({
                success: true,
                data: result,
                message: 'User registered successfully'
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const result = await userService.login(req.body);
            res.status(200).json({
                success: true,
                data: result,
                message: 'Login successful'
            });
        } catch (err) {
            next(err);
        }
    }

    async getProfile(req, res, next) {
        try {
            const result = await userService.getProfile(req.user.id);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const result = await userService.updateProfile(req.user.id, req.body);
            res.status(200).json({
                success: true,
                data: result,
                message: 'Profile updated successfully'
            });
        } catch (err) {
            next(err);
        }
    }

    async updateProfileImage(req, res, next) {
        try {
            if (!req.file) {
                throw new Error('No image file provided');
            }
            const result = await userService.updateProfileImage(
                req.user.id,
                req.file.path
            );
            res.status(200).json({
                success: true,
                data: result,
                message: 'Profile image updated successfully'
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
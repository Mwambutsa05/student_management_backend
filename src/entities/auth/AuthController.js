const userService = require('../user/UserService');

class AuthController {
    async register(req, res, next) {
        try {
            const result = await userService.register(req.body);
            res.status(201).json({ success: true, data: result, message: 'User registered' });
        } catch (err) { next(err); }
    }

    async login(req, res, next) {
        try {
            const result = await userService.login(req.body);
            res.status(200).json({ success: true, data: result, message: 'Login successful' });
        } catch (err) { next(err); }
    }
}
module.exports = new AuthController();

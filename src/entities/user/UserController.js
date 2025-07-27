const userService = require('./UserService');
const responseHandler = require('../../utils/responseHandler');

class UserController {
    async register(req, res, next) {
        try {
            const result = await userService.register(req.body);
            responseHandler(res, 201, result, 'User registered successfully');
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const result = await userService.login(req.body);
            responseHandler(res, 200, result, 'Login successful');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();

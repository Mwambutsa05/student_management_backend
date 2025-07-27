const bcrypt = require('bcrypt');
const authRepository = require('./AuthRepository');
const { generateToken } = require('../../config/jwt');
const RegistrationDTO = require('../user/RegistrationDTO');
const LoginDTO = require('../user/LoginDTO');
const UserRepository = require('../user/UserRepository');

class AuthService {
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await UserRepository.create({ ...data, password: hashedPassword });
        return new RegistrationDTO(user);
    }

    async login(data) {
        const user = await authRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        const token = generateToken({ id: user.id, email: user.email });
        return new LoginDTO(user, token);
    }
}
module.exports = new AuthService();
const bcrypt = require('bcrypt');
const userRepository = require('./UserRepository');
const { generateToken } = require('../../config/jwt');

class UserService {
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userRepository.create({ ...data, password: hashedPassword });
        return { token: generateToken({ id: user.id, email: user.email }) };
    }

    async login(data) {
        const user = await userRepository.findByEmail(data.email);
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return { token: generateToken({ id: user.id, email: user.email }) };
    }
}

module.exports = new UserService();

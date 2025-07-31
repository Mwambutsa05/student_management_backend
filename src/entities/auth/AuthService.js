const bcrypt = require('bcryptjs');
const { generateToken } = require('../../config/jwt');
const User = require('../user/User');

class AuthService {
    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        if (user.status !== 'active') {
            throw new Error('Account is not active');
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role
            },
            token: generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            })
        };
    }
}

module.exports = new AuthService();
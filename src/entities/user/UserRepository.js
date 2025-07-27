const User = require('./User');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }
}

module.exports = new UserRepository();

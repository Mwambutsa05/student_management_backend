const User = require('./User');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findByUsername(username) {
        return await User.findOne({ where: { username } });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async update(id, updateData) {
        const user = await this.findById(id);
        if (!user) return null;
        return await user.update(updateData);
    }
}

module.exports = new UserRepository();
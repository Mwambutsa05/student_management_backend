const User = require('./User');
const bcrypt = require('bcryptjs');

class UserRepository {
    async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await User.create({
            ...userData,
            password: hashedPassword,
            role: userData.role || 'user',
            status: userData.status || 'active'
        });
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async findAll() {
        return await User.findAll();
    }

    async update(id, updateData, currentUserRole) {
        if (currentUserRole !== 'admin') {
            delete updateData.role;
            delete updateData.status;
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const [affectedCount] = await User.update(updateData, { where: { id } });
        return affectedCount > 0 ? this.findById(id) : null;
    }

    async delete(id, currentUserRole) {
        if (currentUserRole !== 'admin') {
            throw new Error('Only admin can delete users');
        }
        return await User.destroy({ where: { id } });
    }

    async updateStatus(id, status, currentUserRole) {
        if (currentUserRole !== 'admin') {
            throw new Error('Only admin can change user status');
        }
        return this.update(id, { status });
    }

    async updateProfileImage(userId, imageUrl) {
        return this.update(userId, { profileImage: imageUrl });
    }
}

module.exports = new UserRepository();
const UserRepository = require('../user/UserRepository');

class AuthRepository {
    async findByEmail(email) {
        return await UserRepository.findByEmail(email);
    }
}
module.exports = new AuthRepository();

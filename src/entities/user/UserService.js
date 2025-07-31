const bcrypt = require('bcrypt');
const userRepository = require('./UserRepository');
const { generateToken } = require('../../config/jwt');
const cloudinary = require('cloudinary').v2;

class UserService {

    async updateProfileImage(userId, imagePath) {
        let imageUrl = imagePath;
        if (!imagePath.startsWith('http')) {
            const result = await cloudinary.uploader.upload(imagePath);
            imageUrl = result.secure_url;
        }

        return await userRepository.update(userId, { profileImage: imageUrl });
    }
}

module.exports = new UserService();
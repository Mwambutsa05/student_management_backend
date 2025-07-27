const bcrypt = require('bcrypt');
const userRepository = require('./UserRepository');
const { generateToken } = require('../../config/jwt');
const cloudinary = require('cloudinary').v2;

class UserService {
    // ... [keep existing methods]

    async updateProfileImage(userId, imagePath) {
        // Upload to Cloudinary if not already a URL
        let imageUrl = imagePath;
        if (!imagePath.startsWith('http')) {
            const result = await cloudinary.uploader.upload(imagePath);
            imageUrl = result.secure_url;
        }

        return await userRepository.update(userId, { profileImage: imageUrl });
    }
}

module.exports = new UserService();
const cloudinary = require('cloudinary').v2;
const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = require('./env');

// ==================== DEBUG LOG ====================
console.log(
    'Cloudinary ENV:',
    CLOUDINARY_CLOUD_NAME || 'MISSING CLOUD NAME',
    CLOUDINARY_API_KEY || 'MISSING API KEY',
    CLOUDINARY_API_SECRET ? 'API secret present' : 'MISSING SECRET'
);

// ==================== CLOUDINARY CONFIG ====================
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

// ==================== EXPORT ====================
module.exports = cloudinary;

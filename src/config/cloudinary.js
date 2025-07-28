const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./env');

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

module.exports = cloudinary;

// CLOUDINARY_CLOUD_NAME=dkfucvz0t
// CLOUDINARY_API_KEY=757888636394479
// CLOUDINARY_API_SECRET=**********
// CLOUDINARY_URL=cloudinary://757888636394479:**********@dkfucvz0t
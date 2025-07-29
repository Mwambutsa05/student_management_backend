const express = require('express');
const router = express.Router();
const { v2: cloudinary } = require('cloudinary');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config/env');

// Cloudinary setup
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

// Routes
const userRoutes = require('../entities/user/userRoutes');
const courseRoutes = require('../entities/course/courseRoutes');
const enrollmentRoutes = require('../entities/enrollment/enrollmentRoutes');
const authRoutes = require('../entities/auth/authRoutes');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/auth', authRoutes);

// Test cloudinary
(async () => {
    try {
        await cloudinary.api.ping();
        console.log('Cloudinary connection verified');
    } catch (error) {
        console.error('Cloudinary connection failed:', error.message);
    }
})();

module.exports = router;

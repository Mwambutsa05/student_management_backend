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
console.log('🔄 Loading routes...');

try {
    const userRoutes = require('../entities/user/userRoutes');
    console.log('✅ User routes loaded');
    router.use('/users', userRoutes);
} catch (error) {
    console.error('❌ Error loading user routes:', error.message);
}

try {
    const courseRoutes = require('../entities/course/courseRoutes');
    console.log('✅ Course routes loaded');
    router.use('/courses', courseRoutes);
} catch (error) {
    console.error('❌ Error loading course routes:', error.message);
}

try {
    const enrollmentRoutes = require('../entities/enrollment/enrollmentRoutes');
    console.log('✅ Enrollment routes loaded');
    router.use('/enrollments', enrollmentRoutes);
} catch (error) {
    console.error('❌ Error loading enrollment routes:', error.message);
}

try {
    const authRoutes = require('../entities/auth/authRoutes');
    console.log('✅ Auth routes loaded');
    router.use('/auth', authRoutes);
} catch (error) {
    console.error('❌ Error loading auth routes:', error.message);
}

console.log('✅ All routes loaded successfully');

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

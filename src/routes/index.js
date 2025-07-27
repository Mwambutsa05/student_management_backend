const express = require('express');
const router = express.Router();

const userRoutes = require('../entities/user/userRoutes');
const courseRoutes = require('../entities/course/courseRoutes');
const enrollmentRoutes = require('../entities/enrollment/enrollmentRoutes');
const authRoutes = require('../entities/auth/authRoutes');

router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/auth', authRoutes);

module.exports = router;

import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({
        cloud_name: 'dkfucvz0t',
        api_key: '757888636394479',
        api_secret: '<your_api_secret>'
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                public_id: 'shoes',
            }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    console.log(autoCropUrl);
})();
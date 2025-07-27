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

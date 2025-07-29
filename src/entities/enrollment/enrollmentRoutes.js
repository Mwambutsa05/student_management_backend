const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const controller = require('./EnrollmentController');

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Manage enrollments
 */

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get('/', auth(), controller.findAll);

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created
 */
router.post('/', auth(), controller.enroll);

module.exports = router;

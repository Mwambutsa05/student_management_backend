const express = require('express');
const controller = require('./AuthController');
const auth = require('../../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Authentication
 *   description: Admin authentication and management
 */

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLogin'
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Missing required fields
 */
router.post('/admin/login', (req, res, next) => controller.adminLogin(req, res, next));

/**
 * @swagger
 * /auth/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminRegister'
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       409:
 *         description: Admin already exists
 *       400:
 *         description: Missing required fields
 */
router.post('/admin/register', (req, res, next) => controller.adminRegister(req, res, next));

/**
 * @swagger
 * /auth/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     status:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 */
router.get('/admin/profile', auth(['admin']), (req, res, next) => controller.getAdminProfile(req, res, next));

/**
 * @swagger
 * /auth/admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/admin/logout', auth(['admin']), (req, res, next) => controller.adminLogout(req, res, next));

module.exports = router;

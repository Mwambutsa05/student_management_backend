const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');
const userController = require('../entities/user/UserController');
const {
    registerSchema,
    updateProfileSchema,
    updateStatusSchema
} = require('../validators/userValidators');

// Public routes
router.post('/register', validate(registerSchema), userController.register);

// Protected user routes
router.get('/profile', auth(), userController.getProfile);
router.put('/profile', auth(), validate(updateProfileSchema), userController.updateProfile);

// Admin-only routes
router.get('/', auth(['admin']), userController.getAllUsers);
router.patch('/:id/status', auth(['admin']), validate(updateStatusSchema), userController.updateUserStatus);
router.delete('/:id', auth(['admin']), userController.deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('./UserController');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const validate = require('../../middleware/validation');
const {
    registerSchema,
    loginSchema,
    updateProfileSchema
} = require('../../validators/userValidators');

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/profile', auth, controller.getProfile);
router.put('/profile', auth, validate(updateProfileSchema), controller.updateProfile);
router.patch('/profile/image', auth, upload.single('profileImage'), controller.updateProfileImage);

module.exports = router;
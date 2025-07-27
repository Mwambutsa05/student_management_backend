const express = require('express');
const controller = require('./UserController');
const validation = require('../../middleware/validation');
const { registerValidator, loginValidator } = require('../../utils/validators');

const router = express.Router();

router.post('/register', validation(registerValidator), (req, res, next) => controller.register(req, res, next));
router.post('/login', validation(loginValidator), (req, res, next) => controller.login(req, res, next));

module.exports = router;

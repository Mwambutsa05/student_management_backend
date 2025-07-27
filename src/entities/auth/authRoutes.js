const express = require('express');
const controller = require('./AuthController');

const router = express.Router();
router.post('/register', (req, res, next) => controller.register(req, res, next));
router.post('/login', (req, res, next) => controller.login(req, res, next));

module.exports = router;

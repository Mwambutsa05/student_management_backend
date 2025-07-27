const express = require('express');
const controller = require('./EnrollmentController');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', auth, (req, res, next) => controller.enroll(req, res, next));
router.get('/', auth, (req, res, next) => controller.findAll(req, res, next));

module.exports = router;

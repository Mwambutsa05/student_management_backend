const express = require('express');
const controller = require('./CourseController');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/', auth, (req, res, next) => controller.create(req, res, next));
router.get('/', (req, res, next) => controller.findAll(req, res, next));
router.get('/:id', (req, res, next) => controller.findOne(req, res, next));
router.delete('/:id', auth, (req, res, next) => controller.delete(req, res, next));

module.exports = router;

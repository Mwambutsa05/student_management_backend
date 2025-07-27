const enrollmentService = require('./EnrollmentService');

class EnrollmentController {
    async enroll(req, res, next) {
        try {
            const { userId, courseId } = req.body;
            const data = await enrollmentService.enrollUser(userId, courseId);
            res.status(201).json({ success: true, data, message: 'User enrolled successfully' });
        } catch (err) { next(err); }
    }

    async findAll(req, res, next) {
        try {
            const data = await enrollmentService.getAllEnrollments();
            res.status(200).json({ success: true, data });
        } catch (err) { next(err); }
    }
}
module.exports = new EnrollmentController();

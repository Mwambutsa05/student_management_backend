const Enrollment = require('./Enrollment');

class EnrollmentRepository {
    async enroll(userId, courseId) {
        return await Enrollment.create({ userId, courseId });
    }

    async findAll() {
        return await Enrollment.findAll({ include: ['User', 'Course'] });
    }
}
module.exports = new EnrollmentRepository();

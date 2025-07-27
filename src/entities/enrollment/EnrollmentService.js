const enrollmentRepository = require('./EnrollmentRepository');
const EnrollmentDTO = require('./EnrollmentDTO');

class EnrollmentService {
    async enrollUser(userId, courseId) {
        const enrollment = await enrollmentRepository.enroll(userId, courseId);
        return new EnrollmentDTO(enrollment);
    }

    async getAllEnrollments() {
        const enrollments = await enrollmentRepository.findAll();
        return enrollments.map((e) => new EnrollmentDTO(e));
    }
}
module.exports = new EnrollmentService();

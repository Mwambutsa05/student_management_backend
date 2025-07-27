class EnrollmentDTO {
    constructor(enrollment) {
        this.id = enrollment.id;
        this.userId = enrollment.userId;
        this.courseId = enrollment.courseId;
        this.enrolledAt = enrollment.createdAt;
    }
}
module.exports = EnrollmentDTO;

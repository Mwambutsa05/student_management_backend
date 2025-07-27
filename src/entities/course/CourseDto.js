class CourseDTO {
    constructor(course) {
        this.id = course.id;
        this.title = course.title;
        this.description = course.description;
        this.duration = course.duration;
        this.createdAt = course.createdAt;
    }
}
module.exports = CourseDTO;

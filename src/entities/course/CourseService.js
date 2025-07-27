const courseRepository = require('./CourseRepository');
const CourseDTO = require('./CourseDTO');

class CourseService {
    async createCourse(data) {
        const course = await courseRepository.create(data);
        return new CourseDTO(course);
    }

    async getAllCourses() {
        const courses = await courseRepository.findAll();
        return courses.map((course) => new CourseDTO(course));
    }

    async getCourseById(id) {
        const course = await courseRepository.findById(id);
        if (!course) throw new Error('Course not found');
        return new CourseDTO(course);
    }

    async deleteCourse(id) {
        const deleted = await courseRepository.delete(id);
        if (!deleted) throw new Error('Course not found');
        return { message: 'Course deleted successfully' };
    }
}
module.exports = new CourseService();

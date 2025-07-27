const courseService = require('./CourseService');

class CourseController {
    async create(req, res, next) {
        try {
            const data = await courseService.createCourse(req.body);
            res.status(201).json({ success: true, data, message: 'Course created successfully' });
        } catch (err) { next(err); }
    }

    async findAll(req, res, next) {
        try {
            const data = await courseService.getAllCourses();
            res.status(200).json({ success: true, data });
        } catch (err) { next(err); }
    }

    async findOne(req, res, next) {
        try {
            const data = await courseService.getCourseById(req.params.id);
            res.status(200).json({ success: true, data });
        } catch (err) { next(err); }
    }

    async delete(req, res, next) {
        try {
            const result = await courseService.deleteCourse(req.params.id);
            res.status(200).json({ success: true, ...result });
        } catch (err) { next(err); }
    }
}
module.exports = new CourseController();

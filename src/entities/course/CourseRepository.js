const Course = require('./Course');

class CourseRepository {
    async create(data) {
        return await Course.create(data);
    }

    async findAll() {
        return await Course.findAll();
    }

    async findById(id) {
        return await Course.findByPk(id);
    }

    async delete(id) {
        return await Course.destroy({ where: { id } });
    }
}
module.exports = new CourseRepository();

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/User');
const Course = require('../course/Course');

const Enrollment = sequelize.define('Enrollment', {
    id: { type: DataTypes.INT, autoIncrement: true, primaryKey: true },
});

Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Enrollment;

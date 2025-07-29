const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');  // ✅ fixed import
const User = require('../user/User');
const Course = require('../course/Course');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: 'enrollments',
    timestamps: true
});

// Associations
Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Enrollment;

const { sequelize } = require('../../config/database');
const { DataTypes } = require('sequelize');

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Course;
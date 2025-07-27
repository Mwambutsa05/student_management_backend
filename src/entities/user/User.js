const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, unique: true },
    phoneNumber: { type: DataTypes.STRING },
    dateOfBirth: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    password: { type: DataTypes.STRING, allowNull: false },
    profileImage: { type: DataTypes.STRING }
}, {
    timestamps: true
});

module.exports = User;
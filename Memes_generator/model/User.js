const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false , unique: true },
    password: { type: DataTypes.TEXT, allowNull: false }
}, {
    tableName: 'user', 
    timestamps: false 
});

module.exports = User;

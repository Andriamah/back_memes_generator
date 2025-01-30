const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false , unique: true },
    password: { type: DataTypes.TEXT, allowNull: false }
}, {
    tableName: 'user', // Nom de la table
    timestamps: false // Désactive `createdAt` et `updatedAt`
});

module.exports = User;

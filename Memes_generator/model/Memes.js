const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Memes = sequelize.define('Memes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_creator: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'memes', 
    timestamps: true 
});

module.exports = Memes;

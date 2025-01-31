const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorite = sequelize.define('Favorite', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
}, {
    tableName: 'favorite', 
    timestamps: false 
});


module.exports = Favorite;

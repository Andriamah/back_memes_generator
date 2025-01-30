const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorite = sequelize.define('Favorite', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    creator_id: { type: DataTypes.INTEGER, allowNull: false },
    memes_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'favorite', 
    timestamps: false 
});


module.exports = Favorite;

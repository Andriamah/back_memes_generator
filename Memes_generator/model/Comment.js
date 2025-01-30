const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    creator_id: { type: DataTypes.INTEGER, allowNull: false },
    memes_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'comment',
    timestamps: true
});

module.exports = Comment;

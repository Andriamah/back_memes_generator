const sequelize = require('../config/db'); 
const User = require('./User');
const Memes = require('./Memes');
const Favorite = require('./Favorite');
const Comment = require('./Comment');

// Les relations entre user et ses favries
User.hasMany(Favorite, { foreignKey: 'creator_id' });
Favorite.belongsTo(User, { foreignKey: 'creator_id' });

Memes.hasMany(Favorite , {foreignKey:'memes_id'});
Favorite.belongsTo(Memes,{foreignKey:'memes_id'})

// Relation entre user et ses memes
User.hasMany(Memes, { foreignKey: 'creator_id' });
Memes.belongsTo(User, { foreignKey: 'creator_id' });

// Relation entre user et comment
User.hasMany(Comment ,{foreignKey : 'creator_id'});
Comment.belongsTo(User,{foreignKey : 'creator_id'});

// Relation entre Memes et ses commentaires
Memes.hasMany(Comment,{foreignKey : 'memes_id'});
Comment.belongsTo(Memes ,{foreignKey : 'memes_id'})


module.exports = { sequelize, User, Memes, Favorite, Comment };

const { sequelize, User, Memes, Favorite, Comment } = require('../model/index'); 


const syncDB = async () => {
  try {
    await sequelize.sync({alter : true});
    console.log("✅ Base de données synchronisée avec succès");
  } catch (err) {
    console.error("❌ Erreur lors de la synchronisation :", err);
    throw err;
  }
};

module.exports = syncDB; 

const sequelize = require('./config/db');

const User = require('./model/user.js'); // Import du modèle


// Synchronisation avec la base de données sans supprimer les tables existantes
sequelize.sync({ alter: true }) 
  .then(() => console.log("Base de données synchronisée avec succès"))
  .catch(err => console.error(" Erreur lors de la synchronisation :", err));
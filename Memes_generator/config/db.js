const { Sequelize } = require('sequelize');

// Création d'une instance Sequelize
const sequelize = new Sequelize('memes', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // On spécifie MySQL comme SGBD
  logging: false // Désactive les logs SQL (facultatif)
});

// Fonction pour tester la connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à MySQL réussie !");
  } catch (error) {
    console.error("Erreur de connexion à MySQL :", error);
  }
};

connectDB();

module.exports = sequelize;

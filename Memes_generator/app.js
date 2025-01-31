const express = require('express');
const bodyParser = require('body-parser');
const syncDB = require('./config/sync_database');

const User_controller = require('./routes/User_controller');
const Memes_controller = require('./routes/Memes_controller');
const Tool = require('./utile/Tool');
const Favorite_controller = require('./routes/Favorite_controller');
const Comment_controller = require('./routes/Comment_controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  next();
});

// Route test
app.get('/', (req, res) => {
  res.send('Ca marche!! Yess!!!');
});

/**
 * ================================================================
 */

// Initialisation des contrôleurs
const user_controller = new User_controller();
app.post('/user', user_controller.create_user);
app.post('/login', user_controller.login);

/**
 * ================================================================
 */

const memes_controller = new Memes_controller();
app.post('/meme', Tool.verifyToken, memes_controller.create_memes);

app.get('/meme/:id', memes_controller.get_memes_by_id);
app.get('/memes', memes_controller.get_all_memes);
app.get('/meme/creator/:id',memes_controller.get_all_memes_by_user);

/**
 * ================================================================
 */

const favorite_controller = new Favorite_controller();
app.post('/favorite' , Tool.verifyToken , favorite_controller.create_favorite);

/**
 * ================================================================
 */

const comment_controller = new Comment_controller();
app.post('/comment' , Tool.verifyToken , comment_controller.create_comment);
app.get('/comment/:id_meme' , comment_controller.get_comment_by_memes)

app.set('port', port);

syncDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
  });
}).catch(err => {
  console.error("❌ Erreur lors du démarrage du serveur :", err);
});

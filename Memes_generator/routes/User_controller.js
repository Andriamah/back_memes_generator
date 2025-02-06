const User_service = require('../service/User_service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const Tool = require('../utile/Tool');


class User_controller {
    constructor() {
        this.User_service = new User_service();
        this.Tool = new Tool();

    }

    create_user = async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            const new_user = await this.User_service.create_user(req.body);
            console.log('ici user', new_user.toJSON());  // Utilisation de .toJSON() pour afficher l'objet complet

            // create a token
            const user_id = new_user.id || new_user.get('id');
            console.log('voici l id alors => ' + user_id)

            // create a token
            const token = jwt.sign({ id: user_id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(201).send({ auth: true, token: token, user: new_user });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.User_service.find_user_by_username(req.body.username);
            if (!user) return res.status(404).send('No user found.');

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            const username = req.body.username

            res.status(200).send({ auth: true, token: token, user: username });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on the server.');
        }
    };

    modify_user = async (req, res) => {
        try {
            console.log('MODIFY');
            const current_user = await this.Tool.get_user_online(req);
    
            const user = await this.User_service.find_user_by_id(current_user.id);
            if (!user) return res.status(404).send('No user found.');
    
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
            const user_updated = {
                id: current_user.id,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.new_password, 8)
            };
    
            console.log('VOICI L USER MODIFIER ' + JSON.stringify(user_updated));
    
            // Mise à jour de l'utilisateur
            const new_user = await this.User_service.update_user(user_updated);
    
            // Assurez-vous de retourner l'utilisateur mis à jour correctement
            console.log('ici user', JSON.stringify(new_user));
    
            // Récupérer l'ID de l'utilisateur mis à jour
            const user_id = new_user.id;  // Pas besoin d'utiliser `.get('id')` car `new_user` est maintenant un objet direct
            console.log('voici l id alors => ' + user_id);
    
            // Créer un nouveau token JWT
            const token = jwt.sign({ id: user_id }, config.secret, {
                expiresIn: 86400
            });
    
            res.status(201).send({ auth: true, token: token, user: new_user.username });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on the server.');
        }
    };
    


}
module.exports = User_controller;

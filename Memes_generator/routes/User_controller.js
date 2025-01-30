const User_service = require('../service/user_service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

class User_controller {
    constructor() {
        this.User_service = new User_service();
    }

    create_user = async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            const new_user = await this.User_service.create_user(req.body);

            // create a token
            const token = jwt.sign({ id: new_user.id }, config.secret, {
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
            const user = await this.User_service.get_user_by_username(req.body.username);
            if (!user) return res.status(404).send('No user found.');

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on the server.');
        }
    };
}
module.exports = User_controller;

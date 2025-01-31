const jwt = require('jsonwebtoken');
const config = require('../config');
const User_service = require('../service/user_service');
const { JSON } = require('sequelize');

class Tool {
    async get_user_online(req) {
        try {
            const token = req.headers['x-access-token'];

            if (!token) {
                throw new Error('No token provided.');
            }

            console.log('Token '+token)
            const decoded = jwt.verify(token, config.secret);
            console.log('Decoded '+   decoded);
            const user_service = new User_service();
            const user = await user_service.get_user_by_id(decoded.id);
            console.log('get_user_online called with name:', user.username);

            if (!user) {
                throw new Error('No user found.');
            }
            user.mdp = 0;

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user_id = decoded.id;
        next();
    });
}
}


module.exports = Tool ;

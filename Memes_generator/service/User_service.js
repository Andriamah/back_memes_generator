const User = require('../model/user');

class User_service {

    async create_user(data) {
        try {
            const user = new User(data);
            await user.save();
            console.log("Service save user")
            return user;
        } catch (err) {
            throw err;
        }
    }

    async get_user_by_username(username) {
        try {
            const user = await User.findOne({ where: { username: username } });
            console.log("user by mail: ");
            console.log(user);
            return user;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}
module.exports = User_service;

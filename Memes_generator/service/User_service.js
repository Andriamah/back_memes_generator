const User = require('../model/User');

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

    async find_user_by_username(username) {
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

    async find_user_by_id(id) {
        try {
            const user = await User.findAll({ where: { id: id } });
            console.log("user by ID: ");
            console.log(user);
            return user[0];
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async update_user(data) {
        try {
            await User.update(
                data,
                { where: { id: data.id } }
            );

            const updatedUser = await User.findOne({ where: { id: data.id } });

            console.log('Utilisateur mis à jour:', updatedUser);

            return updatedUser;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }


}
module.exports = User_service;

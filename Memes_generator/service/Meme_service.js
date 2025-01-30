const Memes = require('../model/Memes');

class Memes_service {

    async create_memes(data) {
        try {
            const memes = new Memes(data);
            await memes.save();
            console.log("Service save memes")
            return memes;
        } catch (err) {
            throw err;
        }
    }

    // async get_user_by_username(username) {
    //     try {
    //         const user = await User.findOne({ where: { username: username } });
    //         console.log("user by mail: ");
    //         console.log(user);
    //         return user;
    //     } catch (err) {
    //         console.log(err)
    //         throw err;
    //     }
    // }
}
module.exports = Memes_service;

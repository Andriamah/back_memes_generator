const Favorite = require('../model/Favorite');
const User = require('../model/User');

class Favorite_service {

    async create_favorite(data) {
        try {
            const favorite = new Favorite(data);
            await favorite.save();
        } catch (error) {
            throw error;
        }
    }

    // so de tsy ilaina
    async find_favorite_by_memes(id) {
        try {
            const favorite = await Favorite.findAll({
                where: { memes_id: id },
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            });
            console.log(favorite);
            return favorite;
        } catch (error) {
            throw error;
        }
    }

    async delete_favorite_by_user(id) {
        try {
            await Favorite.delete({
                where: { id: id }
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Favorite_service;
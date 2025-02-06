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

    async find_favorite_user_memes(id) {

    }

    async delete_favorite_by_user(memes_id,creator_id) {
        try {
            console.log('TRY')
            await Favorite.destroy({
                where: { memes_id: memes_id ,
                    creator_id : creator_id
                }
            })
        } catch (error) {
            console.log('CATCH '+error)
            throw error;
        }
    }

    async if_user_favorite(user_id, memes_id) {
        try {
            const favorite = await Favorite.findAll({
                where: {
                    memes_id: memes_id,
                    creator_id: user_id
                }
            });
            return favorite;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Favorite_service;
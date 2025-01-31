const Memes = require('../model/Memes');
const User = require('../model/User')
const sequelize = require('../config/db'); 

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

    async get_memes_by_id(id) {
        try {
            const memes = await Memes.findOne({ where: { id: id } });
            return memes;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async get_all_memes_order_by_date() {
        try {
            const memes = await Memes.findAll({
                attributes: {
                    include: [
                        [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.memes_id = Memes.id)'), 'commentCount'],
                        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE favorite.memes_id = Memes.id)'), 'favoriteCount']
                    ]
                },
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            return memes;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}
module.exports = Memes_service;

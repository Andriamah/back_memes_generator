const Memes = require('../model/Memes');
const User = require('../model/User')
const sequelize = require('../config/db');
const { Op } = require('sequelize');

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

    async find_memes_by_id(id) {
        try {
            const memes = await Memes.findOne({ where: { id: id } });
            return memes;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async find_memes_by_creator(id) {
        try {
            console.log('ID recherché:', id);
            const memes = await Memes.findAll({
                where: { creator_id: id },
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

    async find_memes_favorite_by_user(id){
        try {
            console.log('ID recherché:', id);
            const memes = await Memes.findAll({
                where: { 
                    id: {
                        [Op.in]: sequelize.literal(`(
                            SELECT memes_id 
                            FROM favorite 
                            WHERE creator_id = ${id}
                        )`)
                    }
                },
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

    async find_all_memes_order_by_date() {
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

    async update_memes_by_id(id) {
        try {
            const memes = await Memes.update({ where: { id: id } });
            return memes;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async delete_memes_by_id(id) {
        try {
            const memes = await Memes.delete({ where: { id: id } });
            return memes;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}
module.exports = Memes_service;

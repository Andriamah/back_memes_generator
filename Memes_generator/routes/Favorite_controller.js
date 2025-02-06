const Tool = require('../utile/Tool');
const Favorite_service = require('../service/Favorite_service');

class Favorite_controller {
    constructor() {
        this.Favorite_service = new Favorite_service();
        this.Tool = new Tool();
    }

    create_favorite = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            req.body.creator_id = creator.id;
            const new_favorite = await this.Favorite_service.create_favorite(req.body);
            res.status(201).send({ success: true });

        } catch (error) {
            res.status(500).send(error);
        }
    }

    delete_favorite = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            console.log('ID DU MEMES '+req.params.id+'  ID CONNECTER '+creator.id)
            await this.Favorite_service.delete_favorite_by_user(req.params.id,creator.id)
            res.status(201).send({ delete: true });
        } catch (error) {
            res.status(500).send(error);

        }
    }

    if_user_favorite_ = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            const memes_id = req.params.memes_id
            const favorite = await this.Favorite_service.if_user_favorite(creator.id, memes_id);
            console.log('si favorie ' + JSON.stringify(favorite))
            const favorite_size = favorite.length
            if (favorite_size > 0) {
                console.log('OUI FAVORIE '+memes_id)
                res.status(200).send({ favorite: true , id : favorite[0].id});

            } else {
                console.log('Non FAVORIE '+memes_id)
                res.status(200).send({ favorite: false });

            }

        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = Favorite_controller;
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
            await this.Favorite_service.delete_favorite_by_user(req.body.id)
            res.status(201).send({ delete: true });
        } catch (error) {
            res.status(500).send(error);

        }
    }
}

module.exports = Favorite_controller;
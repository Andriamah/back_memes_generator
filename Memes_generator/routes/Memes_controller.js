const Memes_service = require('../service/Meme_service');
const Tool = require('../utile/Tool')

class Memes_controller {
    constructor() {
        this.Memes_service = new Memes_service();
        this.Tool = new Tool();
    }

    create_memes = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            req.body.creator_id = creator.id;
            const new_memes = await this.Memes_service.create_memes(req.body);
            res.status(201).send(new_memes);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

    get_memes_by_id = async (req, res) => {
        try {
            const meme = await this.Memes_service.get_memes_by_id(req.params.id);
            res.send(meme);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    get_all_memes = async (req, res) => {
        try {
            const memes = await this.Memes_service.get_all_memes_order_by_date();
            res.status(200).send(memes);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    get_all_memes_by_user = async (req, res) => {
        try {
            const memes = await this.Memes_service.get_memes_by_creator(req.params.id);
            res.status(200).send(memes);
        } catch (error) {
            res.status(500).send(error);

        }
    }

}
module.exports = Memes_controller;

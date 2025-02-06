const Comment_service = require("../service/Comment_service");
const Tool = require('../utile/Tool');

class Comment_controller {
    constructor() {
        this.Comment_service = new Comment_service();
        this.Tool = new Tool();
    }
    create_comment = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            req.body.creator_id = creator.id;
            const new_comment = await this.Comment_service.create_comment(req.body);
            res.status(201).send({ success: true });
        } catch (error) {
            res.status(500).send(error);

        }
    }

    get_comment_by_memes = async (req, res) => {
        try {
            const comments = await this.Comment_service.find_comment_by_memes(req.params.id_meme);
            res.status(200).send(comments);

        } catch (error) {
            console.log(error)
            res.status(500).send(error);

        }
    }
}

module.exports = Comment_controller;
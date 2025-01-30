const Memes_service = require('../service/Meme_service');

class Memes_controller {
    constructor() {
        this.Memes_service = new Memes_service();
    }

    create_memes = async (req, res) => {
        try {

            const new_memes = await this.Memes_service.create_memes(req);
            res.status(201).send(new_memes);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

}
module.exports = Memes_controller;

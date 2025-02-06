const Image_service = require('../service/Image_service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

class Image_controller {
    constructor() {
        this.Image_service = new Image_service();
    }

    get_image_memes = async (req, res) => {
        try {
            const image = await this.Image_service.find_image_memes(req.params.id);
            res.status(200).send(image)
        } catch (error) {
            res.status(500).send(error);

        }
    }
}

module.exports = Image_controller;

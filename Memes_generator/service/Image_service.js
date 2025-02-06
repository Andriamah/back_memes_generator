const Image = require("../model/Image");

class Image_service {
    async create_image(data) {
        try {
            const image = new Image(data);
            await image.save();
            console.log("service save image");
            return image;
        } catch (err) {
            throw err;
        }
    }

    async find_image_memes(memes_id) {
        try {
            const image = await Image.find({ memes_id: memes_id });
            console.log("image by Memes: ");
            console.log(image);
            return image[0];
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

module.exports = Image_service;
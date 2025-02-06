const Comment = require('../model/Comment')
const User = require('../model/User')

class Comment_service {

    async create_comment(data) {
        try {
            const comment = new Comment(data);
            await comment.save();
        } catch (error) {
            throw error;
        }
    }

    async find_comment_by_memes(id) {
        try {
            const comment = await Comment.findAll({
                where: { memes_id: id },
                include: [
                    {
                        model: User, // Associe le modèle User
                        attributes: ['username'] // Récupère uniquement le username
                    }
                ]
            });
            return comment;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

module.exports = Comment_service;
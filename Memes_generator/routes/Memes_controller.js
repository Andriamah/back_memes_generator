const Memes_service = require('../service/Meme_service');
const Image_service = require('../service/Image_service')
const Tool = require('../utile/Tool');
const mongoose = require('mongoose');


class Memes_controller {
    constructor() {
        this.Memes_service = new Memes_service();
        this.Image_service = new Image_service();
        this.Tool = new Tool();
    }

    create_memes = async (req, res) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
    
            // Récupération des données
            const { memes, fabricData } = req.body;
    
            if (!fabricData) {
                return res.status(400).send('Aucune image envoyée');
            }
    
            // Récupérer l'utilisateur créateur
            const creator = await this.Tool.get_user_online(req);
            memes.creator_id = creator.id;
    
            // Enregistrer le meme dans la base de données
            const new_memes = await this.Memes_service.create_memes(memes, { session });
    
            // Sauvegarde de l'image en base64 dans MongoDB
            const new_image = await this.Image_service.create_image({
                memes_id: new_memes.id,
                imageData: fabricData
            }, { session });
    
            await session.commitTransaction();
            session.endSession();
    
            res.status(201).send({
                meme: new_memes,
                image: new_image
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            res.status(500).send(error);
        }
    };


    get_memes_by_id = async (req, res) => {
        try {
            const meme = await this.Memes_service.find_memes_by_id(req.params.id);
            res.send(meme);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    get_all_memes = async (req, res) => {
        try {
            const memes = await this.Memes_service.find_all_memes_order_by_date();
            res.status(200).send(memes);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    get_all_memes_by_user = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            console.log('Creator: ', creator)
            const memes = await this.Memes_service.find_memes_by_creator(creator.id);
            console.log('Memes: ', memes)
            res.status(200).send(memes);
        } catch (error) {
            console.error('Error: ', error)
            res.status(500).send(error);
        }
    }

    get_all_memes_favorite_by_user = async (req, res) => {
        try {
            const creator = await this.Tool.get_user_online(req);
            console.log('Creator: ', creator)
            const memes = await this.Memes_service.find_memes_favorite_by_user(creator.id);
            console.log('Memes: ', memes)
            res.status(200).send(memes);
        } catch (error) {
            console.error('Error: ', error)
            res.status(500).send(error);
        }
    }

}
module.exports = Memes_controller;

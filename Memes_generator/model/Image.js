let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ImageSchema = Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    memes_id : String,
    imageData:  {
        type: String, // Image en base64
        required: true // L'image est obligatoire
    }

});

module.exports = mongoose.model('Image', ImageSchema);
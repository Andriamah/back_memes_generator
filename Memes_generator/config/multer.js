const multer = require('multer');
const path = require('path');

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier où enregistrer les fichiers
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtres pour accepter uniquement certains types de fichiers (ex: images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé !'), false);
    }
};

// Création de l'instance Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;

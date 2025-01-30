const jwt = require('jsonwebtoken');
const config = require('../config');
const ProfService = require('../services/ProfService');

async function getProfOnLine(req) {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            throw new Error('No token provided.');
        }

        const decoded = jwt.verify(token, config.secret);
        const profService = new ProfService();
        const prof = await profService.getProfById(decoded.id);
        console.log('getProfOnLine called with name:', prof.nom);

        if (!prof) {
            throw new Error('No user found.');
        }

        // Optionally, modify the prof object here if needed
        prof.mdp = 0;

        return prof;
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
}

module.exports = { getProfOnLine };

// const jwt = require('jsonwebtoken');
// const db = require('../db');
// require('dotenv').config();
// const secretKey = process.env.SECRET_KEY;

// const verifyToken = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ','');

//     if (!token) {
//         return res.status(403).json({ error: 'Token manquant' });
//     }

//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//             console.log('Erreur de vérification du token :', err);
//             return res.status(401).json({ error: 'Token invalide' });
//         }

//     console.log('Token validé avec succès');
//         req.userId = decoded.userId;
//         req.userRole = decoded.role;
//         next();
//     });
// };



// module.exports = { verifyToken };

const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    // Ajoutez les en-têtes CORS nécessaires
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); 

    if (req.method === 'OPTIONS') {
        
        return res.sendStatus(200);
    }

    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ error: 'Token manquant' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Erreur de vérification du token :', err);
            return res.status(401).json({ error: 'Token invalide' });
        }

        console.log('Token validé avec succès');
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = { verifyToken };

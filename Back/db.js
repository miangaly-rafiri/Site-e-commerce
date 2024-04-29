const mysql = require ('mysql2');
require('dotenv').config();

const connection = mysql.createConnection ({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mia_donnees',
});

connection.connect(error => {
    if (error) {
        console.error('Erreur de connexion à MySQL', error);
        throw error;
    }
    console.log("Connecté à la base de données MySQL!");
});

module.exports = connection;
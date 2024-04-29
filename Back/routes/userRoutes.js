const express = require('express');
const router= express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        db.query('INSERT INTO user_admin (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role], (error, results) => {
            if (error) {
                console.error('Erreur lors de l\'enregistrement', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return;
            }
            console.log('Utilisateur enregistré avec succès.');
            res.json({message : 'Utilisateur enregistré avec succès.'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        db.query('SELECT * FROM user_admin WHERE username = ? AND password = ?', [username, password], (error, results) => {
            if (error) {
                console.error('Erreur lors de la vérification des informations d\'identification', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return;
            }
            if (results.length > 0) {
                
                const token = jwt.sign({ userId: results[0].id, role: results[0].role }, secretKey, { expiresIn: '3h' });
                const userId = results[0].id;
                db.query('UPDATE user_admin SET token = ? WHERE id = ?', [token, userId], (updateError, updateResults) => {
                    if (updateError) {
                    console.error('Erreur lors de la mise à jour du token dans la base de données', updateError);
                    res.status(500).json({ error: 'Erreur interne du serveur' });
            return;
        }
        console.log('Token mis à jour avec succès dans la base de données et l\'Utilisateur est connecté !');
        res.status(200).json({ message: 'Utilisateur connecté', token });
    });
            } else {
                res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }
        });
    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('votre_cookie_jwt', { httpOnly: true });
    console.log('Utilisateur déconnecté');
    res.status(200).json({ message: 'Déconnexion réussie' });
});


router.get('/users', verifyToken, (req, res) => {
    try {
        db.query('SELECT role FROM user_admin WHERE id = ?', [req.userId], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération du rôle de l\'utilisateur', error);
                res.json({ error });
                return;
            }

            if (results.length === 0 || results[0].role !== 'ADMIN') {
                console.log('L\'utilisateur n\'est pas un administrateur');
                res.status(403).json({ error: 'Permission refusée, il faut être un administrateur pour y accéder' });
                return;
            }

            console.log('L\'utilisateur est un administrateur');

            db.query('SELECT * FROM user_admin', (error, results) => {
                if (error) {
                    console.error('Erreur lors de la récupération des utilisateurs', error);
                    res.json({ error });
                    return;
                }
                console.log('Utilisateurs récupérés avec succès :', results);
                res.json(results);
            });
        });
    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.json({ error });
    }
});

router.get('/users/:id', verifyToken, (req, res) => {
    try {
        const id = req.params.id;
        

        db.query('SELECT * FROM user_admin where id=?', id, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des utilisateurs', error);
                res.json({error});
                return;
            }
            if (results.length === 0 || results[0].role !== 'ADMIN') {
                console.log('L\'utilisateur n\'est pas un administrateur');
                res.status(403).json({ error: 'Permission refusée, il faut être un administrateur pour y accéder' });
                return;
            }

            console.log('L\'utilisateur est un administrateur');
            console.log('Utilisateurs récupérés avec succès :', results);
            res.json({ message: 'L\'utilisateur est récupéré avec succès !', results });

        });

    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.json(error);
    }
});

router.put('/users/:id', verifyToken, (req, res) => {
    try {
        console.log('Requête PUT /users/:id reçue.');
        const id = req.params.id;
        const { username, email, password } = req.body;

        db.query(`UPDATE user_admin SET username=?, email=?, password=? WHERE id=${id}`,
            [username, email, password],
            (error, results) => {
                if (error) {
                    console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
                    res.status(500).json({ error: 'Erreur interne du serveur' });
                    return;
                }
                console.log('Utilisateur mis à jour avec succès :', results);
                db.query('SELECT * FROM user_admin WHERE id=?', [id], (selectError, selectResults) => {
                    if (selectError) {
                        console.error('Erreur lors de la récupération de l\'utilisateur mis à jour', selectError);
                        res.status(500).json({ error: 'Erreur interne du serveur' });
                        return;
                    }
                    console.log('Informations de l\'utilisateur mis à jour et récupérées avec succès :', selectResults);
                    res.json({message: 'Information de l\'Utilisateur mis à jour', selectResults});
                });
            });

    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.delete('/users/:id', (req, res) => {
    try {
        console.log('L\'Utilisateur est supprimé.');

        const userId = req.params.id;

        db.query('DELETE  FROM user_admin WHERE id=?',
            [userId],
            (error, results) => {
                if (error) {
                    console.error('Erreur lors de la suppression de l\'utilisateur', error);
                    res.status(500).json({ error: 'Erreur interne du serveur' });
                    return;
                }
                console.log('Utilisateur supprimé avec succès');
                res.json('Utilisateur supprimé');
               
            });
    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;    

const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/products', (req, res) => {
    try {
        const { name, description, prix } = req.body;
        db.query('INSERT into products (`name`, `description`, `prix`) values (?, ?, ?)', [name, description, prix], (error, results) => {
            if (error) {
                console.error('Erreur lors de l\'ajout du produits', error);
                res.json({error});
                return;
            }
            console.log('Produits ajoutés avec succès :');
            res.send({message: 'Produit ajouté'});
        });
    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.json(error);
    }
});

router.get('/products', (req, res) => {
    try {
        console.log('Requête GET /products reçue.');

        db.query('SELECT * FROM products', (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des produits', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return;
            }

            console.log('Produits récupérés avec succès :', results);
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.get('/products/:id', (req, res) => {
    try {
        console.log('Requête GET /produits reçue.');
        const id = req.params.id;

        db.query('SELECT * FROM products where id=?', id, (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération du produits', error);
                res.json({error});
                return;
            }
            console.log('Produits récupérés avec succès');
            res.json(results);

        });

    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.json(error);
    }
});

router.put('/products/:id', (req, res) => {
    try {
        console.log('Requête PUT /products/:id reçue.');
        const id = req.params.id;
        const { name, description, prix } = req.body;

        db.query(`UPDATE products SET name=?, description=?, prix=? WHERE id=${id}`,
            [name, description, prix],
            (error, results) => {
                if (error) {
                    console.error('Erreur lors de la mise à jour du produit', error);
                    res.status(500).json({ error: 'Erreur interne du serveur' });
                    return;
                }
                console.log('Produit mis à jour avec succès :', results);
                res.json({message: 'Produit mis à jour'});
                db.query('SELECT * FROM products WHERE id=?', [id], (selectError, selectResults) => {
                    if (selectError) {
                        console.error('Erreur lors de la récupération du produits mis à jour', selectError);
                        res.status(500).json({ error: 'Erreur interne du serveur' });
                        return;
                    }

                    console.log('Informations du produits mis à jour et récupérées avec succès ');
                    res.json(selectResults);
                });
            });

    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});


router.delete('/products/:id', (req, res) => {
    try {
        console.log('Requête DELETE /products/:id reçue.');

        const productId = req.params.id;

        db.query('DELETE FROM products WHERE id=?', [productId], (error, results) => {
            if (error) {
                console.error('Erreur lors de la suppression du produit', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return;
            }
                console.log('Produit supprimé avec succès');
                res.json({ message: 'Produit supprimé avec succès' });
        });
    } catch (error) {
        console.error('Erreur lors de la manipulation de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
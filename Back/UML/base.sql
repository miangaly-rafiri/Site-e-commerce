DROP DATABASE IF EXISTS API;

CREATE DATABASE API;

USE API;



-- Création de la table user_admin
CREATE TABLE IF NOT EXISTS user_admin (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user' NOT NULL
);

-- Insertion de quelques utilisateurs
INSERT INTO user_admin (username, password) VALUES
    ('admin1', 'motdepasseadmin1'),
    ('user1', 'motdepasseuser1'),
    ('user2', 'motdepasseuser2');

-- Création de la table produit
CREATE TABLE IF NOT EXISTS produit (
    produit_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_produit VARCHAR(255) NOT NULL,
    type_produit VARCHAR(255) NOT NULL
);

-- Insertion de quelques produits, notamment des produits de type "thé"
INSERT INTO produit (nom_produit, type_produit) VALUES
    ('Thé vert', 'thé'),
    ('Thé noir', 'thé'),
    ('Café Arabica', 'café'),
    ('Chocolat noir', 'chocolat');

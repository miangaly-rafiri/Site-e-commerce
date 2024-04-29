Drop DATABASE IF EXISTS API;
 
CREATE TABLE [users_admin] (
  [id] integer PRIMARY KEY,
  [username] varchar(100),
  [email] varchar(100),
  [password] varchar(100),
  [role] enum
)
GO

CREATE TABLE [products] (
  [id] integer PRIMARY KEY,
  [name] varchar(100),
  [description] text,
  [price] decimal(10,2)
)
GO

CREATE TABLE [commandes] (
  [id] integer PRIMARY KEY,
  [utilisateur_id] integer,
  [produit_id] integer,
  [quantite] integer,
  [date_commande] timestamp
)
GO

CREATE TABLE [panier] (
  [id] integer PRIMARY KEY,
  [utilisateur_id] integer,
  [produit_id] integer,
  [quantite] integer,
  [carte_bancaire] varchar(16),
  [date_expiration] varchar(7),
  [code_securite] varchar(3)
)
GO

ALTER TABLE [commandes] ADD FOREIGN KEY ([utilisateur_id]) REFERENCES [users_admin] ([id])
GO

ALTER TABLE [commandes] ADD FOREIGN KEY ([produit_id]) REFERENCES [products] ([id])
GO

ALTER TABLE [panier] ADD FOREIGN KEY ([utilisateur_id]) REFERENCES [users_admin] ([id])
GO

ALTER TABLE [panier] ADD FOREIGN KEY ([produit_id]) REFERENCES [products] ([id])
GO


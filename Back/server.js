const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Assurez-vous d'utiliser le bon chemin
const app = express();
const port = 3000;
const routUser = require('./routes/userRoutes')
const routProduct = require ('./routes/productsRoutes')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
// Route pour obtenir la liste des utilisateurs (accessible à l'admin)
app.use(routUser);
app.use(routProduct);


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
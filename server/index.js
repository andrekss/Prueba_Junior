const express = require('express');
const app = express();
const port = 3000;

// Middleware para manejar las solicitudes JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Hola Mundo, este es el Backend en Node.js!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

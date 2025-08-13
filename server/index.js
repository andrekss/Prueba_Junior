const express = require('express');
const { Client } = require('pg');  // Usar pg para PostgreSQL
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const app = express();
const port = 3200;

// Middleware para manejar las solicitudes JSON
app.use(express.json());

// Crear una instancia del cliente de PostgreSQL
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar a la base de datos
client.connect();


app.post('/guardar_respuesta', async (req, res) => {
  const { pregunta, respuesta } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!pregunta || !respuesta) {
    return res.status(400).send('Faltan parámetros: pregunta o respuesta');
  }

  try {
    // Insertar la pregunta y respuesta en la base de datos
    const query = 'INSERT INTO Historial_Preguntas (pregunta, respuesta) VALUES ($1, $2)';
    await client.query(query, [pregunta, respuesta]);

    res.send('Pregunta y respuesta guardadas correctamente');
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).send('Error al guardar la pregunta y respuesta');
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

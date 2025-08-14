const express = require('express');
const cors = require('cors');  // Importamos el middleware CORS

const { Client } = require('pg');  // Usar pg para PostgreSQL
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const app = express();
const port = 3200;

// Middleware para manejar las solicitudes JSON
app.use(cors());
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

// Registros
app.post('/guardar_respuesta', async (req, res) => {
  const { pregunta, respuesta } = req.body;

  if (!pregunta || !respuesta) {
    return res.status(400).send('Faltan parámetros: pregunta o respuesta');
  }

  try {
    // Insertar la pregunta y respuesta en la base de datos
    const query = 'INSERT INTO Historial_Preguntas ( pregunta, respuesta, Fecha) VALUES ($1, $2, $3)';
    await client.query(query, [pregunta, respuesta,new Date(Date.now())]);

    res.send({"message":'Pregunta y respuesta guardadas correctamente'});
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).send({"error":'Error al guardar la pregunta y respuesta'});
  }
});

app.post('/guardar_planta', async (req, res) => {
  const { Nombre, Taxonomia } = req.body;

  try {

    const query = 'INSERT INTO Plantas ( Nombre, Taxonomia) VALUES ($1, $2)';
    await client.query(query, [Nombre, Taxonomia]);

    res.send({"message":'Plantas guardadas correctamente'});
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).send({"error":'Error al guardar plantas'});
  }
});

// Consultas
app.get("/Mostrar_Planta", async (req, res) => {
  try {
    const resultado = await client.query("SELECT * FROM Plantas");
    res.json(resultado.rows); // devolvemos como JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo datos");
  }
});

app.get("/historial", async (req, res) => {
  try {
    const resultado = await client.query("SELECT * FROM Historial_Preguntas");
    res.json(resultado.rows); // devolvemos como JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo datos");
  }
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

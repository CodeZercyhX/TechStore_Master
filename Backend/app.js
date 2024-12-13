const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Importar rutas
const productsRoutes = require('./routes/products'); // Ruta de productos

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Para analizar solicitudes JSON
app.use(cors()); // Permitir solicitudes CORS

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/products', productsRoutes); // Configurar la ruta para productos

// Manejo de errores básicos
app.use((req, res, next) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  console.error('Error interno del servidor:', error);
  res.status(500).send({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// db.js
const mysql = require('mysql2');
// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definir rutas
router.post('/register', authController.register);  // Asegúrate de que authController.register sea una función válida
router.post('/login', authController.login);

// Configuración de la conexión
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // tu usuario de MySQL
  password: '', // tu contraseña de MySQL
  database: 'recursosdb', // el nombre de tu base de datos
});

// Verificar la conexión
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = db;
module.exports = router;
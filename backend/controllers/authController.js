// authController.js
const db = require('../db'); // Asegúrate de que la ruta sea correcta
// Usando bcryptjs si instalaste bcryptjs
const bcrypt = require('bcryptjs'); 

exports.register = (req, res) => {
  const { username, password } = req.body;

  // Usando db.query() correctamente
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar la contraseña antes de guardarla
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al encriptar la contraseña:', err);
        return res.status(500).json({ error: 'Error al encriptar la contraseña' });
      }

      // Insertar el nuevo usuario en la base de datos
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], (error, results) => {
        if (error) {
          console.error('Error al registrar el usuario:', error);
          return res.status(500).json({ error: 'Error al registrar el usuario' });
        }

        // Respuesta exitosa
        res.status(201).json({ message: 'Usuario registrado correctamente' });
      });
    });
  });
};

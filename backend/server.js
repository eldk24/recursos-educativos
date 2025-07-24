const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configuración de conexión MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '8M@riokart8',
  database: 'UsuariosDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!['admin', 'estudiante', 'docente'].includes(role)) {
    return res.status(400).json({ message: 'Rol inválido' });
  }

  try {
    const [existingUsers] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    await pool.query(
      'INSERT INTO Usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error en /register:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Login de usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query(
      'SELECT * FROM Usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = users[0];

    if (!['admin', 'estudiante', 'docente'].includes(user.role)) {
      return res.status(403).json({ message: 'Rol no reconocido' });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('❌ Error en /login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

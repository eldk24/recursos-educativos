const express = require('express');
const cors = require('cors');
const app = express();

const connection = require('./config/db'); // Importar la conexión
const authRoutes = require('./routes/authRoutes');

// SOLO aquí haces la conexión una sola vez
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');

  // Si la conexión fue exitosa, recién ahí arrancas el servidor
  app.use(cors());
  app.use(express.json());
  app.use('/api/auth', authRoutes);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});

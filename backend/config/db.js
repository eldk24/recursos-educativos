const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Usuario por defecto de XAMPP
  password: '',  // Contraseña vacía si no la has configurado
  database: 'recursosdb'  // Nombre de la base de datos que estás usando
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

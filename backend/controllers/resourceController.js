const db = require('../config/db');

// Crear un recurso educativo
exports.createResource = (req, res) => {
  const { titulo, descripcion, tipo, categoria_id } = req.body;
  const archivo_url = req.file ? req.file.filename : null;
  const usuario_id = req.user.id; // viene del token

  if (!titulo || !tipo) {
    return res.status(400).json({ msg: 'Faltan datos obligatorios.' });
  }

  const sql = 'INSERT INTO recursos SET ?';
  const values = {
    titulo,
    descripcion,
    tipo,
    archivo_url,
    categoria_id,
    usuario_id,
  };

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.status(201).json({ msg: 'Recurso creado exitosamente.' });
  });
};

// Obtener todos los recursos
exports.getResources = (req, res) => {
  const sql = `SELECT recursos.*, categorias.nombre as categoria_nombre
               FROM recursos
               LEFT JOIN categorias ON recursos.categoria_id = categorias.id`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

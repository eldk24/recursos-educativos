const express = require('express');
const router = express.Router();
const { createResource, getResources } = require('../controllers/resourceController');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Subir recurso (protegido)
router.post('/', authMiddleware, upload.single('archivo'), createResource);

// Obtener recursos
router.get('/', getResources);

module.exports = router;

const express = require('express');
const router = express.Router();
const controlador = require('../controllers/mensaje.controller');
const verifyToken = require('../middlewares/auth.middleware');
const soloAdmin = require('../middlewares/soloAdmin.middleware');

// Ruta pública para enviar mensaje
router.post('/', controlador.crearMensaje);

// Rutas protegidas para admins
router.get('/', verifyToken, soloAdmin, controlador.obtenerMensajes);
router.delete('/:id', verifyToken, soloAdmin, controlador.eliminarMensaje);

module.exports = router;

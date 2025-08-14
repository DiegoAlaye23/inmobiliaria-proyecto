const express = require('express');
const router = express.Router();
const controlador = require('../controllers/favorito.controller');
const verifyToken = require('../middlewares/auth.middleware');
const soloCliente = require('../middlewares/soloCliente.middleware');

// Rutas protegidas para gestionar favoritos
router.get('/', verifyToken, soloCliente, controlador.obtenerFavoritos);
router.post('/:propiedadId', verifyToken, soloCliente, controlador.agregarFavorito);
router.delete('/:propiedadId', verifyToken, soloCliente, controlador.eliminarFavorito);

module.exports = router;

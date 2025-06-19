const express = require('express');
const router = express.Router();
const controlador = require('../controllers/propiedad.controller');
const verifyToken = require('../middlewares/auth.middleware');
const soloAdmin = require('../middlewares/soloAdmin.middleware');
const upload = require('../middlewares/subidaImagen');


// Rutas públicas
router.get('/', controlador.obtenerPropiedades);
router.get('/:id', controlador.obtenerPropiedadPorId);

// Rutas protegidas (token + admin)
router.post('/', verifyToken, soloAdmin, upload.single('imagen'), controlador.crearPropiedad);
router.put('/:id', verifyToken, soloAdmin, upload.single('imagen'), controlador.actualizarPropiedad);
router.delete('/:id', verifyToken, soloAdmin, controlador.eliminarPropiedad);

module.exports = router;




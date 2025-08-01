// Importamos Express y creamos el router
const express = require('express');
const router = express.Router();
// Importamos el controlador con la lógica para cada ruta
const controlador = require('../controllers/propiedad.controller');
// Middleware para verificar que el usuario esté autenticado con JWT
const verifyToken = require('../middlewares/auth.middleware');
// Middleware para verificar que el usuario sea administrador
const soloAdmin = require('../middlewares/soloAdmin.middleware');
// Middleware para manejar la subida de imágenes
const upload = require('../middlewares/subidaImagen');


// Rutas públicas
router.get('/', controlador.obtenerPropiedades);
router.get('/:id', controlador.obtenerPropiedadPorId);

// Rutas protegidas (token + admin)
router.post('/', verifyToken, soloAdmin, upload.single('imagen'), controlador.crearPropiedad);
router.put('/:id', verifyToken, soloAdmin, upload.single('imagen'), controlador.actualizarPropiedad);
router.delete('/:id', verifyToken, soloAdmin, controlador.eliminarPropiedad);

module.exports = router;




const express = require('express');
const router = express.Router();
const controlador = require('../controllers/usuario.controller');
const verificarAdmin = require('../middlewares/verificarAdmin');
const verifyToken = require('../middlewares/auth.middleware');

// Públicos
router.post('/registro', controlador.registrarUsuario);
router.get('/verificar/:token', controlador.verificarCuenta);
router.post('/login', controlador.loginUsuario);

// Privados para admins
router.post('/crear-admin', verifyToken, verificarAdmin, controlador.crearAdmin);
router.get('/', verifyToken, verificarAdmin, controlador.obtenerUsuarios);
router.patch('/estado/:id', verifyToken, verificarAdmin, controlador.cambiarEstadoUsuario);
router.patch('/rol/:id', verifyToken, verificarAdmin, controlador.cambiarRolUsuario);

module.exports = router;



// Importamos Express, el framework para manejar rutas y peticiones HTTP
const express = require('express');
// Creamos un enrutador modular con Express (para manejar rutas)
const router = express.Router();
// Importamos el controlador que contiene la lógica de cada ruta de usuario
const controlador = require('../controllers/usuario.controller');
// Importamos el middleware que verifica si el usuario es administrador
const verificarAdmin = require('../middlewares/verificarAdmin');
// Importamos el middleware que valida si el token JWT es válido (usuario autenticado)
const verifyToken = require('../middlewares/auth.middleware');

// Públicos
// Ruta para registrar un nuevo usuario (nombre, email, contraseña)
router.post('/registro', controlador.registrarUsuario);
// Ruta para verificar la cuenta mediante un token enviado por email
router.get('/verificar/:token', controlador.verificarCuenta);
// Ruta para iniciar sesión. Si los datos son correctos, devuelve un token JWT
router.post('/login', controlador.loginUsuario);

// Privados para admins
// Ruta para crear un nuevo administrador (solo accesible por otros admins logueados)
router.post('/crear-admin', verifyToken, verificarAdmin, controlador.crearAdmin);
// Ruta para obtener el listado de todos los usuarios registrados
router.get('/', verifyToken, verificarAdmin, controlador.obtenerUsuarios);
// Ruta para cambiar el estado (activo/inactivo) de un usuario
router.patch('/estado/:id', verifyToken, verificarAdmin, controlador.cambiarEstadoUsuario);
// Ruta para cambiar el rol de un usuario (por ejemplo: cliente → admin)
router.patch('/rol/:id', verifyToken, verificarAdmin, controlador.cambiarRolUsuario);

// Exportamos el router para poder usarlo en el archivo principal (index.js)
module.exports = router;



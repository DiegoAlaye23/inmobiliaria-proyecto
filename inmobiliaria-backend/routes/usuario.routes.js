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

// ==== RUTAS PÚBLICAS ====

// Registro de usuario
router.post('/registro', controlador.registrarUsuario);

// Verificación de cuenta por correo
router.get('/verificar/:token', controlador.verificarCuenta);

// Login de usuario
router.post('/login', controlador.loginUsuario);

// 🔐 Recuperar contraseña - Enviar email con link
router.post('/recuperar', controlador.solicitarRecuperacion);

// 🔐 Restablecer contraseña usando el token del email
router.post('/restablecer/:token', controlador.restablecerPassword);

// ==== RUTAS PRIVADAS (requieren token + rol admin) ====

// Crear un administrador (solo admins)
router.post('/crear-admin', verifyToken, verificarAdmin, controlador.crearAdmin);

// Obtener todos los usuarios
router.get('/', verifyToken, verificarAdmin, controlador.obtenerUsuarios);

// Cambiar estado (activo/inactivo)
router.patch('/estado/:id', verifyToken, verificarAdmin, controlador.cambiarEstadoUsuario);

// Cambiar rol (usuario/admin)
router.patch('/rol/:id', verifyToken, verificarAdmin, controlador.cambiarRolUsuario);

// Exportamos el router para poder usarlo en el archivo principal (index.js)
module.exports = router;




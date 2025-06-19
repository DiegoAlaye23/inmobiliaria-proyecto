const db = require('../config/db');

// Crear nuevo usuario (registro o admin)
const crearUsuario = (usuario, callback) => {
  const sql = `
    INSERT INTO usuarios (nombre, email, password, rol, verificado, token_verificacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valores = [
    usuario.nombre,
    usuario.email,
    usuario.password,
    usuario.rol || 'usuario',
    usuario.verificado || false,
    usuario.token_verificacion || null
  ];
  db.query(sql, valores, callback);
};

// Buscar por email
const buscarPorEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], callback);
};

// Buscar por token de verificación
const buscarPorTokenVerificacion = (token, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE token_verificacion = ?';
  db.query(sql, [token], callback);
};

// Marcar usuario como verificado
const marcarComoVerificado = (id, callback) => {
  const sql = 'UPDATE usuarios SET verificado = 1, token_verificacion = NULL WHERE id = ?';
  db.query(sql, [id], callback);
};

// Obtener todos los usuarios
const obtenerTodos = (callback) => {
  const sql = 'SELECT id, nombre, email, rol, verificado, activo FROM usuarios ORDER BY id DESC';
  db.query(sql, callback);
};

// Actualizar el rol del usuario
const actualizarRol = (id, nuevoRol, callback) => {
  const sql = 'UPDATE usuarios SET rol = ? WHERE id = ?';
  db.query(sql, [nuevoRol, id], callback);
};

// Activar / desactivar usuario
const actualizarEstado = (id, nuevoEstado, callback) => {
  const sql = 'UPDATE usuarios SET activo = ? WHERE id = ?';
  db.query(sql, [nuevoEstado, id], callback);
};

module.exports = {
  crearUsuario,
  buscarPorEmail,
  buscarPorTokenVerificacion,
  marcarComoVerificado,
  obtenerTodos,
  actualizarRol,
  actualizarEstado
};


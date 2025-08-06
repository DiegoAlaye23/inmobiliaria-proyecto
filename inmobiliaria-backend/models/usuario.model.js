const pool = require('../config/db');

// Crea un nuevo usuario
const crearUsuario = (usuario, callback) => {
  const sql = `
    INSERT INTO usuarios (nombre, email, password, rol, verificado, token_verificacion)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const valores = [
    usuario.nombre,
    usuario.email,
    usuario.password,
    usuario.rol || 'usuario',
    usuario.verificado || false,
    usuario.token_verificacion || null,
  ];
  pool.query(sql, valores, callback);
};

// Busca un usuario por email
const buscarPorEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = $1';
  pool.query(sql, [email], (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows);
  });
};

// Busca por token de verificación
const buscarPorTokenVerificacion = (token, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE token_verificacion = $1';
  pool.query(sql, [token], (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows);
  });
};

// Marca usuario como verificado
const marcarComoVerificado = (id, callback) => {
  const sql = 'UPDATE usuarios SET verificado = true, token_verificacion = NULL WHERE id = $1';
  pool.query(sql, [id], callback);
};

// Obtener todos los usuarios
const obtenerTodos = (callback) => {
  const sql = 'SELECT id, nombre, email, rol, verificado, activo FROM usuarios ORDER BY id DESC';
  pool.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows);
  });
};

// Cambia el rol del usuario
const actualizarRol = (id, nuevoRol, callback) => {
  const sql = 'UPDATE usuarios SET rol = $1 WHERE id = $2';
  pool.query(sql, [nuevoRol, id], callback);
};

// Cambia el estado del usuario (activo/inactivo)
const actualizarEstado = (id, nuevoEstado, callback) => {
  const sql = 'UPDATE usuarios SET activo = $1 WHERE id = $2';
  pool.query(sql, [nuevoEstado, id], callback);
};

// Guarda token de recuperación
const guardarTokenRecuperacion = (email, token, expiracion, callback) => {
  const sql = 'UPDATE usuarios SET token_recuperacion = $1, expiracion_token = $2 WHERE email = $3';
  pool.query(sql, [token, expiracion, email], callback);
};

// Busca por token de recuperación
const buscarPorTokenRecuperacion = (token, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE token_recuperacion = $1';
  pool.query(sql, [token], (err, result) => {
    if (err) return callback(err);
    callback(null, result.rows);
  });
};

// Actualiza password y limpia tokens
const actualizarPasswordYLimpiarToken = (id, nuevaPassword, callback) => {
  const sql = `
    UPDATE usuarios 
    SET password = $1, token_recuperacion = NULL, expiracion_token = NULL 
    WHERE id = $2
  `;
  pool.query(sql, [nuevaPassword, id], callback);
};

module.exports = {
  crearUsuario,
  buscarPorEmail,
  buscarPorTokenVerificacion,
  marcarComoVerificado,
  obtenerTodos,
  actualizarRol,
  actualizarEstado,
  guardarTokenRecuperacion,
  buscarPorTokenRecuperacion,
  actualizarPasswordYLimpiarToken
};


// Importamos la conexión a la base de datos desde config/db.js
const db = require('../config/db');

// Crea un nuevo usuario (rol usuario o admin) en la base de datos
const crearUsuario = (usuario, callback) => {
  const sql = `
    INSERT INTO usuarios (nombre, email, password, rol, verificado, token_verificacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valores = [
    usuario.nombre,
    usuario.email,
    usuario.password, // ya viene hasheada con bcrypt
    usuario.rol || 'usuario', // por defecto es 'usuario'
    usuario.verificado || false, // no verificado por defecto
    usuario.token_verificacion || null // token único (uuid)
  ];
  db.query(sql, valores, callback); // ejecutamos la consulta
};

// Busca un usuario por su email (para login)
const buscarPorEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], callback);
};

// Busca un usuario por el token que se le mandó por mail
const buscarPorTokenVerificacion = (token, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE token_verificacion = ?';
  db.query(sql, [token], callback);
};

// Marca al usuario como verificado (y borra el token)
const marcarComoVerificado = (id, callback) => {
  const sql = 'UPDATE usuarios SET verificado = 1, token_verificacion = NULL WHERE id = ?';
  db.query(sql, [id], callback);
};

// Trae todos los usuarios (se usa en el panel de admin)
const obtenerTodos = (callback) => {
  const sql = 'SELECT id, nombre, email, rol, verificado, activo FROM usuarios ORDER BY id DESC';
  db.query(sql, callback);
};

// Cambia el rol del usuario (por ejemplo de 'usuario' a 'admin')
const actualizarRol = (id, nuevoRol, callback) => {
  const sql = 'UPDATE usuarios SET rol = ? WHERE id = ?';
  db.query(sql, [nuevoRol, id], callback);
};

// Cambia el estado del usuario (activar o desactivar cuenta)
const actualizarEstado = (id, nuevoEstado, callback) => {
  const sql = 'UPDATE usuarios SET activo = ? WHERE id = ?';
  db.query(sql, [nuevoEstado, id], callback);
};

// Guarda el token de recuperación y la fecha de expiración
const guardarTokenRecuperacion = (email, token, expiracion, callback) => {
  const sql = 'UPDATE usuarios SET token_recuperacion = ?, expiracion_token = ? WHERE email = ?';
  db.query(sql, [token, expiracion, email], callback);
};

// Busca un usuario por su token de recuperación
const buscarPorTokenRecuperacion = (token, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE token_recuperacion = ?';
  db.query(sql, [token], callback);
};

// Actualiza la contraseña y elimina el token de recuperación
const actualizarPasswordYLimpiarToken = (id, nuevaPassword, callback) => {
  const sql = `
    UPDATE usuarios 
    SET password = ?, token_recuperacion = NULL, expiracion_token = NULL 
    WHERE id = ?
  `;
  db.query(sql, [nuevaPassword, id], callback);
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


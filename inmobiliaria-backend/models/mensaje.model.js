const db = require('../config/db');

// Crear mensaje
const crearMensaje = (data, callback) => {
  const sql = 'INSERT INTO mensajes (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)';
  const valores = [data.nombre, data.email, data.telefono, data.mensaje];
  db.query(sql, valores, callback);
};

// Obtener todos los mensajes
const obtenerMensajes = (callback) => {
  db.query('SELECT * FROM mensajes ORDER BY fecha_envio DESC', callback);
};

// Eliminar mensaje
const eliminarMensaje = (id, callback) => {
  db.query('DELETE FROM mensajes WHERE id = ?', [id], callback);
};


module.exports = {
  crearMensaje,
  obtenerMensajes,
  eliminarMensaje
};

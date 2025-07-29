// Importa la configuración de conexión a la base de datos MySQL
const db = require('../config/db');

// Función para crear un nuevo mensaje en la base de datos
const crearMensaje = (data, callback) => {
  // Consulta SQL con placeholders (?)
  const sql = 'INSERT INTO mensajes (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)';
  // Arreglo con los valores a insertar en los placeholders
  const valores = [data.nombre, data.email, data.telefono, data.mensaje];
  // Ejecuta la consulta con los valores
  db.query(sql, valores, callback);
};

// Función para obtener todos los mensajes
const obtenerMensajes = (callback) => {
  // Consulta SQL para seleccionar todos los mensajes, ordenados por fecha de envío descendente
  db.query('SELECT * FROM mensajes ORDER BY fecha_envio DESC', callback);
};

// Función para eliminar un mensaje por su ID
const eliminarMensaje = (id, callback) => {
  // Consulta SQL para eliminar un mensaje donde el ID coincida
  db.query('DELETE FROM mensajes WHERE id = ?', [id], callback);
};

// Exporta las funciones para que puedan ser usadas en otros módulos (como el controlador)
module.exports = {
  crearMensaje,
  obtenerMensajes,
  eliminarMensaje
};

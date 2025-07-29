// Importamos la conexión a la base de datos
const db = require('../config/db');

/**
 * Obtener todas las propiedades registradas
 * @param {function} callback - función que maneja el resultado
 */
const getTodasLasPropiedades = (callback) => {
  db.query('SELECT * FROM propiedades', callback);
};

/**
 * Obtener una propiedad específica por ID
 * @param {number} id - ID de la propiedad a buscar
 * @param {function} callback - función que maneja el resultado
 */
const getPropiedadPorId = (id, callback) => {
  const sql = 'SELECT * FROM propiedades WHERE id = ?';
  db.query(sql, [id], callback);
};

/**
 * Crear una nueva propiedad
 * @param {object} data - Datos de la nueva propiedad
 * @param {function} callback - función que maneja el resultado
 */
const crearPropiedad = (data, callback) => {
  const sql = `
    INSERT INTO propiedades (
      titulo, descripcion, precio, tipo, direccion, ciudad, provincia,
      ambientes, banos, cochera, m2, imagen_destacada, fecha_publicacion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    data.titulo,
    data.descripcion,
    data.precio,
    data.tipo,
    data.direccion,
    data.ciudad,
    data.provincia,
    data.ambientes,
    data.banos,
    data.cochera,
    data.m2,
    data.imagen_destacada || '',
    data.fecha_publicacion || new Date()
  ];

  db.query(sql, valores, callback);
};

/**
 * Actualizar una propiedad existente
 * @param {number} id - ID de la propiedad a actualizar
 * @param {object} data - Nuevos datos de la propiedad
 * @param {function} callback - función que maneja el resultado
 */
const actualizarPropiedad = (id, data, callback) => {
  const sql = `
    UPDATE propiedades SET
      titulo = ?, descripcion = ?, precio = ?, tipo = ?, direccion = ?, ciudad = ?, provincia = ?,
      ambientes = ?, banos = ?, cochera = ?, m2 = ?, imagen_destacada = ?, fecha_publicacion = ?
    WHERE id = ?
  `;

  const valores = [
    data.titulo,
    data.descripcion,
    data.precio,
    data.tipo,
    data.direccion,
    data.ciudad,
    data.provincia,
    data.ambientes,
    data.banos,
    data.cochera,
    data.m2,
    data.imagen_destacada || '',
    (new Date(data.fecha_publicacion)).toISOString().slice(0, 10), //toISOString().slice(0, 10) convierte la fecha a formato YYYY-MM-DD
    id
  ];

  db.query(sql, valores, callback);
};

/**
 * Eliminar una propiedad
 * @param {number} id - ID de la propiedad a eliminar
 * @param {function} callback - función que maneja el resultado
 */
const eliminarPropiedad = (id, callback) => {
  const sql = 'DELETE FROM propiedades WHERE id = ?';
  db.query(sql, [id], callback);
};

// Exportamos todos los métodos del modelo
module.exports = {
  getTodasLasPropiedades,
  getPropiedadPorId,
  crearPropiedad,
  actualizarPropiedad,
  eliminarPropiedad,
};




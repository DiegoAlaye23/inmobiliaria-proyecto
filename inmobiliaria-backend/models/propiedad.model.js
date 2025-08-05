// Importamos la conexión a la base de datos
const db = require('../config/db');

/**
 * Obtener todas las propiedades registradas
 */
const getTodasLasPropiedades = (callback) => {
  db.query('SELECT * FROM propiedades', callback);
};

/**
 * Obtener una propiedad específica por ID
 */
const getPropiedadPorId = (id, callback) => {
  const sql = 'SELECT * FROM propiedades WHERE id = $1';
  db.query(sql, [id], callback);
};

/**
 * Crear una nueva propiedad
 */
const crearPropiedad = (data, callback) => {
  const sql = `
    INSERT INTO propiedades (
      titulo, descripcion, precio, tipo, direccion, ciudad, provincia,
      ambientes, banos, cochera, m2, imagen_destacada, fecha_publicacion
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13
    )
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
    data.fecha_publicacion || new Date().toISOString().slice(0, 10)
  ];

  db.query(sql, valores, callback);
};

/**
 * Actualizar una propiedad existente
 */
const actualizarPropiedad = (id, data, callback) => {
  const sql = `
    UPDATE propiedades SET
      titulo = $1, descripcion = $2, precio = $3, tipo = $4, direccion = $5, ciudad = $6, provincia = $7,
      ambientes = $8, banos = $9, cochera = $10, m2 = $11, imagen_destacada = $12, fecha_publicacion = $13
    WHERE id = $14
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
    (new Date(data.fecha_publicacion)).toISOString().slice(0, 10),
    id
  ];

  db.query(sql, valores, callback);
};

/**
 * Eliminar una propiedad
 */
const eliminarPropiedad = (id, callback) => {
  const sql = 'DELETE FROM propiedades WHERE id = $1';
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





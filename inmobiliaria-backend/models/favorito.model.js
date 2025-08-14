// Importamos la conexión a la base de datos
const db = require('../config/db');

// Agrega una propiedad a favoritos
const agregarFavorito = (usuarioId, propiedadId, callback) => {
  const sql = 'INSERT INTO favoritos (usuario_id, propiedad_id) VALUES ($1, $2)';
  db.query(sql, [usuarioId, propiedadId], callback);
};

// Elimina una propiedad de favoritos
const eliminarFavorito = (usuarioId, propiedadId, callback) => {
  const sql = 'DELETE FROM favoritos WHERE usuario_id = $1 AND propiedad_id = $2';
  db.query(sql, [usuarioId, propiedadId], callback);
};

// Obtiene todas las propiedades favoritas de un usuario
const obtenerFavoritosPorUsuario = (usuarioId, callback) => {
  const sql = `
    SELECT p.* FROM favoritos f
    JOIN propiedades p ON p.id = f.propiedad_id
    WHERE f.usuario_id = $1
  `;
  db.query(sql, [usuarioId], callback);
};

module.exports = {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritosPorUsuario,
};

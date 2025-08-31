const db = require('../config/db');

// Insert a single image for a property
const agregarImagen = (propertyId, url, alt, order, callback) => {
  const sql = 'INSERT INTO property_images (property_id, url, alt, "order") VALUES ($1, $2, $3, $4)';
  const valores = [propertyId, url, alt || '', order];
  db.query(sql, valores, callback);
};

// Retrieve images for a given property ordered by the order column
const obtenerImagenesPorPropiedad = (propertyId, callback) => {
  const sql = 'SELECT id, url, alt, "order" FROM property_images WHERE property_id = $1 ORDER BY "order"';
  db.query(sql, [propertyId], callback);
};

// Delete an image by its ID
const eliminarImagen = (id, callback) => {
  const sql = 'DELETE FROM property_images WHERE id = $1';
  db.query(sql, [id], callback);
};

// Update order of images for a property given an array of image IDs
const actualizarOrdenImagenes = (propertyId, ids, callback) => {
  const queries = ids.map((imgId, index) =>
    db.query('UPDATE property_images SET "order" = $1 WHERE id = $2 AND property_id = $3', [index, imgId, propertyId])
  );
  Promise.all(queries)
    .then(() => callback(null))
    .catch((err) => callback(err));
};

module.exports = {
  agregarImagen,
  obtenerImagenesPorPropiedad,
  eliminarImagen,
  actualizarOrdenImagenes,
};

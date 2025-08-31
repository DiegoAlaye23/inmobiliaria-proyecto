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

module.exports = {
  agregarImagen,
  obtenerImagenesPorPropiedad,
};

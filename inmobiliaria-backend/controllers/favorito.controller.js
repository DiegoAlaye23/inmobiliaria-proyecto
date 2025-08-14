// Importa el modelo de favoritos
const Favorito = require('../models/favorito.model');

// GET /api/favoritos
// Obtiene todas las propiedades favoritas del usuario logueado
const obtenerFavoritos = (req, res) => {
  const usuarioId = req.usuario.id;

  Favorito.obtenerFavoritosPorUsuario(usuarioId, (err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener favoritos' });
    }
    res.json(resultados.rows);
  });
};

// POST /api/favoritos/:propiedadId
// Agrega una propiedad a los favoritos del usuario
const agregarFavorito = (req, res) => {
  const usuarioId = req.usuario.id;
  const propiedadId = req.params.propiedadId;

  Favorito.agregarFavorito(usuarioId, propiedadId, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al guardar favorito' });
    }
    res.status(201).json({ mensaje: 'Favorito agregado' });
  });
};

// DELETE /api/favoritos/:propiedadId
// Elimina una propiedad de los favoritos del usuario
const eliminarFavorito = (req, res) => {
  const usuarioId = req.usuario.id;
  const propiedadId = req.params.propiedadId;

  Favorito.eliminarFavorito(usuarioId, propiedadId, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar favorito' });
    }
    res.json({ mensaje: 'Favorito eliminado' });
  });
};

module.exports = {
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito,
};

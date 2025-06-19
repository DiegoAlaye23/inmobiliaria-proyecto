// Importa el modelo que maneja la base de datos
const Propiedad = require("../models/propiedad.model");

// GET /api/propiedades
// Obtener todas las propiedades
const obtenerPropiedades = (req, res) => {
  Propiedad.getTodasLasPropiedades((err, resultados) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener propiedades" });
    } else {
      res.json(resultados);
    }
  });
};

// GET /api/propiedades/:id
// Obtener una propiedad específica por ID
const obtenerPropiedadPorId = (req, res) => {
  const id = req.params.id;

  Propiedad.getPropiedadPorId(id, (err, resultados) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener la propiedad" });
    } else if (resultados.length === 0) {
      res.status(404).json({ mensaje: "Propiedad no encontrada" });
    } else {
      res.json(resultados[0]);
    }
  });
};

// POST /api/propiedades
// Crear una nueva propiedad
const crearPropiedad = (req, res) => {
  const nuevaPropiedad = req.body;
  const imagen = req.file ? req.file.filename : '';

   nuevaPropiedad.imagen_destacada = imagen;

  Propiedad.crearPropiedad(nuevaPropiedad, (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "No se pudo crear la propiedad" });
    } else {
      res.status(201).json({
        mensaje: "Propiedad creada correctamente",
        id: resultado.insertId,
      });
    }
  });
};

// PUT /api/propiedades/:id
// Actualizar una propiedad existente
const actualizarPropiedad = (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;

  if (req.file) {
    datosActualizados.imagen_destacada = req.file.filename;
  }

  Propiedad.actualizarPropiedad(id, datosActualizados, (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al actualizar la propiedad" });
    } else if (resultado.affectedRows === 0) {
      res.status(404).json({ mensaje: "Propiedad no encontrada" });
    } else {
      res.json({ mensaje: "Propiedad actualizada correctamente" });
    }
  });
};

// DELETE /api/propiedades/:id
// Eliminar una propiedad
const eliminarPropiedad = (req, res) => {
  const id = req.params.id;

  Propiedad.eliminarPropiedad(id, (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar la propiedad" });
    } else if (resultado.affectedRows === 0) {
      res.status(404).json({ mensaje: "Propiedad no encontrada" });
    } else {
      res.json({ mensaje: "Propiedad eliminada correctamente" });
    }
  });
};

// Exportar todos los métodos del controlador
module.exports = {
  obtenerPropiedades,
  obtenerPropiedadPorId,
  crearPropiedad,
  actualizarPropiedad,
  eliminarPropiedad,
};




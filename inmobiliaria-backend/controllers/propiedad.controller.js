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

  //Toma el id desde la URL
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
  //req.body contiene los datos del formulario.
  const nuevaPropiedad = req.body;
  //req.file (proporcionado por Multer) contiene la imagen subida.
  const imagen = req.file ? req.file.filename : '';
  //Guarda el nombre de la imagen como imagen_destacada dentro de la propiedad
   nuevaPropiedad.imagen_destacada = imagen;

   //Llama al modelo para guardar la nueva propiedad.
  Propiedad.crearPropiedad(nuevaPropiedad, (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "No se pudo crear la propiedad" });
    } else {
      res.status(201).json({
        mensaje: "Propiedad creada correctamente",
        //Si se guarda bien, devuelve el ID del nuevo registro.
        id: resultado.insertId,
      });
    }
  });
};

// PUT /api/propiedades/:id
// Actualizar una propiedad existente
const actualizarPropiedad = (req, res) => {
  //Obtiene el id desde la URL
  const id = req.params.id;
  //Recibe datos nuevos desde el frontend (req.body)
  const datosActualizados = req.body;

  //Si el usuario envía una nueva imagen, la reemplaza.
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




// Importa el modelo que maneja la base de datos
const Propiedad = require("../models/propiedad.model");
const path = require("path");
const supabase = require("../config/supabase");

// GET /api/propiedades
// Obtener todas las propiedades con filtros opcionales
const obtenerPropiedades = (req, res) => {
  const filtros = {
    ciudad: req.query.ciudad,
    minPrecio: req.query.minPrecio,
    maxPrecio: req.query.maxPrecio,
    tipo: req.query.tipo,
    ambientes: req.query.ambientes,
  };

  Propiedad.getTodasLasPropiedades(filtros, (err, resultados) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener propiedades" });
    } else {
      // El paquete `pg` devuelve un objeto con metadatos.
      // Enviamos solo las filas para que el frontend reciba un arreglo.
      res.json(resultados.rows);
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
    } else if (resultados.rows.length === 0) {
      res.status(404).json({ mensaje: "Propiedad no encontrada" });
    } else {
      // `rows` contiene las propiedades obtenidas; devolvemos la primera.
      res.json(resultados.rows[0]);
    }
  });
};

// POST /api/propiedades
// Crear una nueva propiedad
const crearPropiedad = async (req, res) => {
  // req.body contiene los datos del formulario.
  const nuevaPropiedad = req.body;

  // Si llega una imagen, se sube a Supabase Storage y se guarda la URL pública.
  if (req.file) {
    const extension = path.extname(req.file.originalname);
    const nombreArchivo = `${Date.now()}${extension}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(nombreArchivo, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "No se pudo subir la imagen" });
    }

    const { data } = supabase.storage.from("uploads").getPublicUrl(nombreArchivo);
    nuevaPropiedad.imagen_destacada = data.publicUrl;
  }

  // Llama al modelo para guardar la nueva propiedad.
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
const actualizarPropiedad = async (req, res) => {
  // Obtiene el id desde la URL
  const id = req.params.id;
  // Recibe datos nuevos desde el frontend (req.body)
  const datosActualizados = req.body;

  // Si el usuario envía una nueva imagen, la sube y reemplaza la existente.
  if (req.file) {
    const extension = path.extname(req.file.originalname);
    const nombreArchivo = `${Date.now()}${extension}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(nombreArchivo, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "No se pudo subir la imagen" });
    }

    const { data } = supabase.storage.from("uploads").getPublicUrl(nombreArchivo);
    datosActualizados.imagen_destacada = data.publicUrl;
  }

  Propiedad.actualizarPropiedad(id, datosActualizados, (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al actualizar la propiedad" });
    } else if (resultado.rowCount === 0) {
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
    } else if (resultado.rowCount === 0) {
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




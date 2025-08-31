// Importa el modelo que maneja la base de datos
const Propiedad = require("../models/propiedad.model");
const path = require("path");
const supabase = require("../config/supabase");
const ImagenPropiedad = require("../models/imagenPropiedad.model");

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
      const propiedad = resultados.rows[0];
      ImagenPropiedad.obtenerImagenesPorPropiedad(id, (imgErr, imgRes) => {
        if (imgErr) {
          console.error(imgErr);
          return res.status(500).json({ error: "Error al obtener imágenes" });
        }
        propiedad.imagenes = imgRes.rows;
        res.json(propiedad);
      });
    }
  });
};

// POST /api/propiedades
// Crear una nueva propiedad
const crearPropiedad = async (req, res) => {
  // req.body contiene los datos del formulario.
  const nuevaPropiedad = req.body;
  const archivos = req.files || [];
  const urls = [];

  for (const file of archivos) {
    const extension = path.extname(file.originalname);
    const nombreArchivo = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${extension}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(nombreArchivo, file.buffer, { contentType: file.mimetype });

    if (error) {
      console.error(error);
    } else {
      const { data } = supabase.storage
        .from("uploads")
        .getPublicUrl(nombreArchivo);
      urls.push(data.publicUrl);
    }
  }

  if (urls.length > 0) {
    nuevaPropiedad.imagen_destacada = urls[0];
  }

  Propiedad.crearPropiedad(nuevaPropiedad, async (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "No se pudo crear la propiedad" });
    } else {
      const propiedadId = resultado.rows[0].id;
      await Promise.all(
        urls.map((url, index) =>
          new Promise((resolve, reject) => {
            ImagenPropiedad.agregarImagen(
              propiedadId,
              url,
              nuevaPropiedad.titulo || "",
              index,
              (imgErr) => {
                if (imgErr) reject(imgErr);
                else resolve();
              }
            );
          })
        )
      ).catch((e) => console.error(e));

      res.status(201).json({
        mensaje: "Propiedad creada correctamente",
        id: propiedadId,
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
  const archivos = req.files || [];
  const urls = [];

  for (const file of archivos) {
    const extension = path.extname(file.originalname);
    const nombreArchivo = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${extension}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(nombreArchivo, file.buffer, { contentType: file.mimetype });

    if (error) {
      console.error(error);
    } else {
      const { data } = supabase.storage
        .from("uploads")
        .getPublicUrl(nombreArchivo);
      urls.push(data.publicUrl);
    }
  }

  if (urls.length > 0) {
    datosActualizados.imagen_destacada = urls[0];
    let offset = 0;
    try {
      const existentes = await new Promise((resolve, reject) => {
        ImagenPropiedad.obtenerImagenesPorPropiedad(id, (err, res) => {
          if (err) reject(err);
          else resolve(res.rows.length);
        });
      });
      offset = existentes;
    } catch (e) {
      console.error(e);
    }
    await Promise.all(
      urls.map((url, index) =>
        new Promise((resolve, reject) => {
          ImagenPropiedad.agregarImagen(
            id,
            url,
            datosActualizados.titulo || "",
            offset + index,
            (imgErr) => {
              if (imgErr) reject(imgErr);
              else resolve();
            }
          );
        })
      )
    ).catch((e) => console.error(e));
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




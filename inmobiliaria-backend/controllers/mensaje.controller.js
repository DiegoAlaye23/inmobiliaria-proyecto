// Importa el modelo que maneja la lógica de acceso a datos
const Mensaje = require('../models/mensaje.model');


// Controlador para crear un mensaje (POST /api/mensajes)
const crearMensaje = (req, res) => {
  const datos = req.body; // Extrae los datos enviados en el cuerpo de la petición
  Mensaje.crearMensaje(datos, (err, resultado) => {
    if (err) {
      // Si hay un error, devuelve código 500 (error del servidor)
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    } else {
      // Si se crea exitosamente, responde con código 201 (creado)
      res.status(201).json({ mensaje: 'Mensaje enviado correctamente' });
    }
  });
};

// Controlador para obtener todos los mensajes (GET /api/mensajes)
const obtenerMensajes = (req, res) => {
  Mensaje.obtenerMensajes((err, resultados) => {
    if (err) {
      // Error al consultar la base de datos
      res.status(500).json({ error: 'Error al obtener mensajes' });
    } else {
      // Devuelve los mensajes como respuesta en formato JSON
      res.json(resultados);
    }
  });
};

// Controlador para eliminar un mensaje por ID (DELETE /api/mensajes/:id)
const eliminarMensaje = (req, res) => {
  const id = req.params.id; // Extrae el ID desde los parámetros de la URL
  Mensaje.eliminarMensaje(id, (err, resultado) => {
    if (err) {
      // Si ocurre un error, se responde con error 500
      res.status(500).json({ error: 'Error al eliminar el mensaje' });
    } else {
      // Si se elimina correctamente, responde con un mensaje
      res.json({ mensaje: 'Mensaje eliminado correctamente' });
    }
  });
};
// Exporta las funciones para que puedan usarse en las rutas
module.exports = {
  crearMensaje,
  obtenerMensajes,
  eliminarMensaje
};

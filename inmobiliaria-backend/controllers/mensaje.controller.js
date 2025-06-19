const Mensaje = require('../models/mensaje.model');


// POST /api/mensajes
const crearMensaje = (req, res) => {
  const datos = req.body;
  Mensaje.crearMensaje(datos, (err, resultado) => {
    if (err) {
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    } else {
      res.status(201).json({ mensaje: 'Mensaje enviado correctamente' });
    }
  });
};

// GET /api/mensajes
const obtenerMensajes = (req, res) => {
  Mensaje.obtenerMensajes((err, resultados) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener mensajes' });
    } else {
      res.json(resultados);
    }
  });
};

// DELETE /api/mensajes/:id
const eliminarMensaje = (req, res) => {
  const id = req.params.id;
  Mensaje.eliminarMensaje(id, (err, resultado) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el mensaje' });
    } else {
      res.json({ mensaje: 'Mensaje eliminado correctamente' });
    }
  });
};

module.exports = {
  crearMensaje,
  obtenerMensajes,
  eliminarMensaje
};

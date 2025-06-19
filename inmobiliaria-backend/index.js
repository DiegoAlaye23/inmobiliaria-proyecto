const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

const propiedadRoutes = require('./routes/propiedad.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const mensajeRoutes = require('./routes/mensaje.routes');


// Middleware primero
app.use(cors());
app.use(express.json()); // Este debe ir antes que cualquier ruta
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas después
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/mensajes', mensajeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

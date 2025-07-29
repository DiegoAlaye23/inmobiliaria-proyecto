// Importamos librerías necesarias
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Inicializamos la app de Express
const app = express();
const PORT = process.env.PORT || 3001;

// Importamos las rutas definidas en archivos separados
const propiedadRoutes = require('./routes/propiedad.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const mensajeRoutes = require('./routes/mensaje.routes');


// Middlewares
app.use(cors()); // Permite peticiones de distintos orígenes (frontend-backend)
app.use(express.json()); // Permite recibir y procesar JSON en las peticiones
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Carpeta pública para archivos subidos

// Rutas principales
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/mensajes', mensajeRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

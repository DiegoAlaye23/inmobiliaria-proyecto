const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Guarda los archivos en la carpeta 'uploads'
  },
  filename: (req, file, cb) => {
    // Generamos un nombre único con timestamp y misma extensión del archivo original
    const nombre = Date.now() + path.extname(file.originalname);
    // Le decimos a multer: "guardalo con este nombre"
    cb(null, nombre);
  }
});

const upload = multer({ storage });

module.exports = upload;

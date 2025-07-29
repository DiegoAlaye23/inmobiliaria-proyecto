// Importamos el módulo mysql2 para conectarnos a la base de datos MySQL
const mysql = require('mysql2');
// Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// Creamos una conexión a la base de datos utilizando los datos del entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Dirección del servidor (localhost)
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_NAME  // Nombre de la base de datos
});

// Intentamos conectar a la base de datos
connection.connect((err) => {
  if (err) {
    // Si hay un error, lo mostramos y no continuamos
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  // Si la conexión es exitosa, lo notificamos
  console.log('Conectado a la base de datos MySQL');
});
// Exportamos la conexión para poder usarla en otros archivos
module.exports = connection;

// Importamos la librería nodemailer para poder enviar correos desde Node.js
const nodemailer = require('nodemailer');

// Creamos un "transportador" de correos con la configuración de nuestro servidor SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // Servidor SMTP
  port: process.env.EMAIL_PORT, // Puerto del servidor
  secure: false, // true si usás SSL (puerto 465), false si usás TLS (puerto 587)
  auth: {
    user: process.env.EMAIL_USER, // Correo desde donde se enviarán los mensajes
    pass: process.env.EMAIL_PASS, // Contraseña o token de aplicación del correo
  },
});

// Exportamos el transportador para poder usarlo en otros archivos
module.exports = transporter;



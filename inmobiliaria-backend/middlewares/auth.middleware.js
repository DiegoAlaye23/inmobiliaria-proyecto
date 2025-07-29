// Importamos la librería jsonwebtoken para verificar tokens JWT
const jwt = require('jsonwebtoken');
// Clave secreta que se usó para firmar los tokens en loginUsuario()
const SECRET_KEY = 'secreto-super-seguro';

// Middleware que verifica si el token JWT recibido es válido
const verifyToken = (req, res, next) => {
  // Obtenemos el header 'Authorization' que viene con el formato: "Bearer <token>"
  const authHeader = req.headers['authorization'];

  // Si no se envió el header, se bloquea el acceso
  if (!authHeader) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  // Extraemos solo el token, sacando la palabra 'Bearer'
  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    // Verificamos que el token sea válido y no esté vencido
    const decoded = jwt.verify(token, SECRET_KEY);
    // Si es válido, guardamos la info del usuario en req para usarla en otros middlewares o controladores
    req.usuario = decoded;
    // Llamamos a next() para continuar con la ejecución (la ruta real)
    next();
  } catch (err) {
    // Si el token no es válido o está vencido, devolvemos un error 401
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Exportamos el middleware para usarlo en rutas protegidas
module.exports = verifyToken;



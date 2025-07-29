// Importamos jsonwebtoken para verificar el token JWT recibido
const jwt = require('jsonwebtoken');
// Clave secreta usada para firmar y verificar los tokens
const SECRET_KEY = 'secreto-super-seguro'; 

// Middleware para verificar si el usuario tiene rol "admin"
const verificarAdmin = (req, res, next) => {
  // Obtenemos el token del header "Authorization"
  const authHeader = req.headers.authorization;

  // Si no se envió token, devolvemos error 401 (no autorizado)
  if (!authHeader) return res.status(401).json({ error: 'Falta token' });

  // Extraemos el token eliminando la palabra "Bearer"
  const token = authHeader.split(' ')[1];

  try {
    // Verificamos el token con la clave secreta y obtenemos los datos del usuario
    const decoded = jwt.verify(token, SECRET_KEY);

    // Si el rol del usuario no es "admin", no tiene permiso
    if (decoded.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso restringido a administradores' });
    }
    // Si es admin, guardamos los datos en req.usuario y permitimos que siga
    req.usuario = decoded;
    next();
  } catch (err) {
    // Si el token es inválido, devolvemos error 401
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Exportamos el middleware para usarlo en rutas que requieran rol admin
module.exports = verificarAdmin;

const soloAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: se requiere rol admin' });
  }
  next(); // El usuario es admin, puede continuar
};

module.exports = soloAdmin;

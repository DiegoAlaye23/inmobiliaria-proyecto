const soloCliente = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'cliente') {
    return res.status(403).json({ error: 'Solo clientes' });
  }
  next();
};

module.exports = soloCliente;

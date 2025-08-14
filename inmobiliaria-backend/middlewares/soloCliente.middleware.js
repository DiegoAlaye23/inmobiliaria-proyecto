const soloCliente = (req, res, next) => {
  const rol = req.usuario?.rol;
  if (!rol || (rol !== 'cliente' && rol !== 'usuario')) {
    return res.status(403).json({ error: 'Solo clientes' });
  }
  next();
};

module.exports = soloCliente;

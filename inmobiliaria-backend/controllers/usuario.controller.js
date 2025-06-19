const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const transporter = require('../config/mailer');
const { v4: uuidv4 } = require('uuid');

const SECRET_KEY = 'secreto-super-seguro';

// POST /api/usuarios/registro
const registrarUsuario = async (req, res) => {
  const { nombre, email, password, rol = 'usuario' } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenVerificacion = uuidv4();

    Usuario.crearUsuario({
      nombre,
      email,
      password: hashedPassword,
      rol,
      verificado: false,
      token_verificacion: tokenVerificacion
    }, async (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al registrar usuario' });

      const urlVerificacion = `http://localhost:3001/api/usuarios/verificar/${tokenVerificacion}`;

      await transporter.sendMail({
        from: `"Inmobiliaria" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verificá tu cuenta',
        html: `<p>Hola ${nombre},</p><p>Verificá tu cuenta haciendo clic en el siguiente enlace:</p><a href="${urlVerificacion}">${urlVerificacion}</a>`
      });

      res.status(201).json({ mensaje: 'Usuario registrado. Revisa tu correo.' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

// GET /api/usuarios/verificar/:token
const verificarCuenta = (req, res) => {
  const { token } = req.params;

  Usuario.buscarPorTokenVerificacion(token, (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (resultados.length === 0) return res.status(400).json({ error: 'Token inválido' });

    const usuario = resultados[0];
    Usuario.marcarComoVerificado(usuario.id, (err) => {
      if (err) return res.status(500).json({ error: 'Error al verificar' });
      res.json({ mensaje: 'Cuenta verificada exitosamente' });
    });
  });
};

// POST /api/usuarios/login
const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  Usuario.buscarPorEmail(email, async (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en base de datos' });
    if (resultados.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = resultados[0];
    if (!usuario.verificado) return res.status(401).json({ error: 'Cuenta no verificada' });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  });
};

// POST /api/usuarios/crear-admin
const crearAdmin = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenVerificacion = uuidv4();

    Usuario.crearUsuario({
      nombre,
      email,
      password: hashedPassword,
      rol: 'admin',
      verificado: false,
      token_verificacion: tokenVerificacion
    }, async (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al crear admin' });

      const urlVerificacion = `http://localhost:3001/api/usuarios/verificar/${tokenVerificacion}`;
      await transporter.sendMail({
        from: `"Inmobiliaria" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verificá tu cuenta de administrador',
        html: `<p>Hola ${nombre},</p><p>Tu cuenta fue creada. Verificá desde este enlace:</p><a href="${urlVerificacion}">${urlVerificacion}</a>`
      });

      res.status(201).json({ mensaje: 'Administrador creado. Verificación enviada.' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
};

// GET /api/usuarios
const obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, usuarios) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(usuarios);
  });
};

// PATCH /api/usuarios/estado/:id
const cambiarEstadoUsuario = (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  Usuario.actualizarEstado(id, activo, (err) => {
    if (err) return res.status(500).json({ error: 'Error al cambiar estado' });
    res.json({ mensaje: 'Estado actualizado' });
  });
};

// PATCH /api/usuarios/rol/:id
const cambiarRolUsuario = (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  Usuario.actualizarRol(id, rol, (err) => {
    if (err) return res.status(500).json({ error: 'Error al cambiar rol' });
    res.json({ mensaje: 'Rol actualizado' });
  });
};

module.exports = {
  registrarUsuario,
  verificarCuenta,
  loginUsuario,
  crearAdmin,
  obtenerUsuarios,
  cambiarEstadoUsuario,
  cambiarRolUsuario
};


const bcrypt = require("bcrypt"); // Para hashear contraseñas
const jwt = require("jsonwebtoken"); // Para generar tokens JWT
const Usuario = require("../models/usuario.model"); // Modelo de base de datos para usuarios
const transporter = require("../config/mailer"); // Configuración del servicio de envío de mails
const { v4: uuidv4 } = require("uuid"); // Para generar tokens únicos de verificación

// Clave secreta para firmar los JWT
const SECRET_KEY = "secreto-super-seguro";

// POST /api/usuarios/registro
const registrarUsuario = async (req, res) => {
  const { nombre, email, password, rol = "usuario" } = req.body; // Obtenemos los datos del cuerpo de la solicitud

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña con 10 rondas de sal
    const tokenVerificacion = uuidv4(); // Generamos un token único para verificar la cuenta

    // Creamos el usuario en la base de datos
    Usuario.crearUsuario(
      {
        nombre,
        email,
        password: hashedPassword,
        rol,
        verificado: false,
        token_verificacion: tokenVerificacion,
      },
      async (err, result) => {
        if (err)
          return res.status(500).json({ error: "Error al registrar usuario" });

        const urlVerificacion = `https://inmobiliaria-proyecto.onrender.com/api/usuarios/verificar/${tokenVerificacion}`;

        // Enviamos correo de verificación
        await transporter.sendMail({
          from: `"Inmobiliaria" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Verificá tu cuenta",
          html: `<p>Hola ${nombre},</p><p>Verificá tu cuenta haciendo clic en el siguiente enlace:</p><a href="${urlVerificacion}">${urlVerificacion}</a>`,
        });

        res
          .status(201)
          .json({ mensaje: "Usuario registrado. Revisa tu correo." });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

// GET /api/usuarios/verificar/:token
const verificarCuenta = (req, res) => {
  const { token } = req.params;

  Usuario.buscarPorTokenVerificacion(token, (err, resultados) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });
    if (resultados.length === 0)
      return res.status(400).json({ error: "Token inválido" });

    const usuario = resultados[0];
    if (!usuario) {
      return res
        .status(400)
        .json({ error: "Token inválido o usuario no encontrado" });
    }

    Usuario.marcarComoVerificado(usuario.id, (err) => {
      if (err)
        return res.status(500).json({ error: "Error al verificar usuario" });
      res.json({ mensaje: "Cuenta verificada exitosamente" });
    });
  });
};

// POST /api/usuarios/login
const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  Usuario.buscarPorEmail(email, async (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error en base de datos" });
    if (resultados.length === 0)
      return res.status(401).json({ error: "Usuario no encontrado" });

    const usuario = resultados[0];
    if (!usuario.verificado)
      return res.status(401).json({ error: "Cuenta no verificada" });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    // Generamos el token con datos útiles del usuario
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({ mensaje: "Login exitoso", token });
  });
};

// POST /api/usuarios/crear-admin
const crearAdmin = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenVerificacion = uuidv4();

    Usuario.crearUsuario(
      {
        nombre,
        email,
        password: hashedPassword,
        rol: "admin",
        verificado: false,
        token_verificacion: tokenVerificacion,
      },
      async (err, result) => {
        if (err) return res.status(500).json({ error: "Error al crear admin" });

        const urlVerificacion = `https://inmobiliaria-proyecto.onrender.com/api/usuarios/verificar/${tokenVerificacion}`;
        await transporter.sendMail({
          from: `"Inmobiliaria" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Verificá tu cuenta de administrador",
          html: `<p>Hola ${nombre},</p><p>Tu cuenta fue creada. Verificá desde este enlace:</p><a href="${urlVerificacion}">${urlVerificacion}</a>`,
        });

        res
          .status(201)
          .json({ mensaje: "Administrador creado. Verificación enviada." });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

// GET /api/usuarios
const obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, usuarios) => {
    if (err)
      return res.status(500).json({ error: "Error al obtener usuarios" });
    res.json(usuarios);
  });
};

// PATCH /api/usuarios/estado/:id
const cambiarEstadoUsuario = (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  Usuario.actualizarEstado(id, activo, (err) => {
    if (err) return res.status(500).json({ error: "Error al cambiar estado" });
    res.json({ mensaje: "Estado actualizado" });
  });
};

// PATCH /api/usuarios/rol/:id
const cambiarRolUsuario = (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  Usuario.actualizarRol(id, rol, (err) => {
    if (err) return res.status(500).json({ error: "Error al cambiar rol" });
    res.json({ mensaje: "Rol actualizado" });
  });
};

// POST /api/usuarios/recuperar
const solicitarRecuperacion = (req, res) => {
  const { email } = req.body;

  Usuario.buscarPorEmail(email, async (err, resultados) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });
    if (resultados.length === 0)
      return res.status(404).json({ error: "Email no registrado" });

    const token = uuidv4();
    const expiracion = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos

    Usuario.guardarTokenRecuperacion(email, token, expiracion, async (err2) => {
      if (err2)
        return res.status(500).json({ error: "Error al guardar token" });

      const frontendUrl =
        process.env.FRONTEND_URL || "https://inmobiliariafrontend.netlify.app";
      const url = `${frontendUrl}/restablecer/${token}`;

      // Enviar mail
      await transporter.sendMail({
        from: `"Inmobiliaria" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Recuperación de contraseña",
        html: `<p>Recibimos una solicitud para restablecer tu contraseña.</p>
               <p>Haz clic en el siguiente enlace para continuar:</p>
               <a href="${url}">${url}</a>
               <p>Este enlace expirará en 15 minutos.</p>`,
      });

      res.json({ mensaje: "Correo de recuperación enviado" });
    });
  });
};

// POST /api/usuarios/restablecer/:token
const restablecerPassword = async (req, res) => {
  const { token } = req.params;
  const { nuevaPassword } = req.body;

  Usuario.buscarPorTokenRecuperacion(token, async (err, resultados) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });
    if (resultados.length === 0)
      return res.status(400).json({ error: "Token inválido" });

    const usuario = resultados[0];

    // Verificar si el token está vencido
    const ahora = new Date();
    const expiracion = new Date(usuario.expiracion_token);

    if (ahora > expiracion) {
      return res.status(400).json({ error: "El token ha expirado" });
    }

    const passwordHasheada = await bcrypt.hash(nuevaPassword, 10);

    Usuario.actualizarPasswordYLimpiarToken(
      usuario.id,
      passwordHasheada,
      (err2) => {
        if (err2)
          return res
            .status(500)
            .json({ error: "Error al actualizar la contraseña" });
        res.json({ mensaje: "Contraseña actualizada correctamente" });
      }
    );
  });
};

module.exports = {
  registrarUsuario,
  verificarCuenta,
  loginUsuario,
  crearAdmin,
  obtenerUsuarios,
  cambiarEstadoUsuario,
  cambiarRolUsuario,
  solicitarRecuperacion,
  restablecerPassword,
};

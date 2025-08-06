Este proyecto es una aplicación web completa para la gestión de propiedades inmobiliarias. Permite a los usuarios ver propiedades, enviar consultas y registrarse, mientras que los administradores pueden gestionar propiedades, usuarios y mensajes.

## 📌 Funcionalidades principales

### Usuarios
- Registro con confirmación por correo electrónico.
- Inicio de sesión (solo usuarios verificados).
- Rol por defecto: "usuario estándar".

### Propiedades
- Visualización pública de propiedades.
- Detalle individual con información completa.
- Panel de administración para crear, editar y eliminar propiedades.

### Administradores
- Registro de nuevos administradores (por otros admins).
- Gestión de propiedades y usuarios.
- Visualización y eliminación de mensajes de contacto.
- Cambio de roles y activación/desactivación de usuarios.

### Seguridad
- Rutas protegidas con JWT.
- Validación de roles (middleware).
- Protección del panel administrativo.

---

## 🧪 Tecnologías utilizadas

| Parte        | Tecnologías                             |
|-------------|------------------------------------------|
| Frontend    | React.js + MUI (Material UI)             |
| Backend     | Node.js + Express                        |
| Base de datos | PostgreSQL                            |
| Autenticación | JWT + BCrypt                           |
| Email       | Nodemailer + Gmail / Mailtrap            |

---

## ⚙️ Instalación y uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/inmobiliaria-web.git
cd inmobiliaria-web
```

2. Instalar dependencias
Backend
cd backend
npm install
Frontend
cd ../frontend
npm install
3. Variables de entorno
.env del backend (crear archivo en backend/.env)
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/inmobiliaria
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=contraseña_app_gmail
FRONTEND_URL=https://inmobiliariafrontend.netlify.app
⚠️ Asegúrate de tener habilitada la opción de "Contraseñas de aplicaciones" en Gmail.
4. Ejecutar el proyecto
Backend
cd backend
npm run dev
Frontend
cd ../frontend
npm run dev
👨‍💻 Autor
Diego Alaye

---

### Despliegue del frontend en Netlify

Netlify construye el frontend desde `inmobiliaria-frontend`:

```toml
[build]
base = "inmobiliaria-frontend"
command = "npm run build"
publish = "dist"
```

Para que todas las rutas de la SPA funcionen correctamente:

- `base: "/"` en `vite.config.js` asegura que los scripts se carguen desde la raíz.
- `netlify.toml` incluye una regla de redirección que envía cualquier ruta a `index.html`, evitando pantallas en blanco en páginas como `/admin` o `/admin/mensajes`.


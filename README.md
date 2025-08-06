 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index f1d1f5397b3c9bf9d683ba185e1445890ff0d35a..c34d3621ecc8e374dfc75e71550d4fe446c7e97b 100644
--- a/README.md
+++ b/README.md
@@ -11,66 +11,82 @@ Este proyecto es una aplicación web completa para la gestión de propiedades in
 
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
-| Base de datos | Postgre SQL                            |
+| Base de datos | PostgreSQL                            |
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
-DB_HOST=localhost
-DB_USER=tu_usuario_mysql
-DB_PASSWORD=tu_contraseña_mysql
-DB_NAME=inmobiliaria
+DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/inmobiliaria
 EMAIL_HOST=smtp.gmail.com
 EMAIL_PORT=587
 EMAIL_USER=tu_correo@gmail.com
 EMAIL_PASS=contraseña_app_gmail
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
+
+---
+
+### Despliegue del frontend en Netlify
+
+Netlify construye el frontend desde `inmobiliaria-frontend`:
+
+```toml
+[build]
+base = "inmobiliaria-frontend"
+command = "npm run build"
+publish = "dist"
+```
+
+Para que todas las rutas de la SPA funcionen correctamente:
+
+- `base: "/"` en `vite.config.js` asegura que los scripts se carguen desde la raíz.
+- `netlify.toml` incluye una regla de redirección que envía cualquier ruta a `index.html`, evitando pantallas en blanco en páginas como `/admin` o `/admin/mensajes`.
+
 
EOF
)


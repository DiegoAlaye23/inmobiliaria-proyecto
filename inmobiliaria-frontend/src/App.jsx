// Importa componentes necesarios del sistema de rutas de React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// Importa las páginas que se mostrarán según la ruta
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DetallePropiedad from './pages/DetallePropiedad';
import Favoritos from './pages/Favoritos';
import AdminPanel from './pages/AdminPanel';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import RutaPrivadaAdmin from './components/RutaPrivadaAdmin'; // Protege rutas de acceso solo para admins
import VerificarCuenta from './pages/VerificarCuenta';
import UsuariosAdmin from './pages/UsuariosAdmin';
import MensajesAdmin from './pages/MensajesAdmin';
import RecuperarPassword from './pages/RecuperarPassword';
import RestablecerPassword from './pages/RestablecerPassword';
import Footer from './components/Footer';

// Función principal del componente App
function App({ setModo, modo }) {
  return (
    // Envuelve toda la app en un enrutador para habilitar navegación por URLs
    <BrowserRouter>
      {/* Barra de navegación, recibe props para cambiar el modo claro/oscuro */}
      <Navbar setModo={setModo} modo={modo} />
      <Toolbar />
      {/* Contenido principal */}
      <Box component="main" sx={{ pb: 8 }}>
        {/* Define las rutas disponibles */}
        <Routes>
          {/* Ruta de inicio */}
          <Route path="/" element={<Home />} />
          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar" element={<RecuperarPassword />} />
          <Route path="/restablecer/:token" element={<RestablecerPassword />} />
          {/* Verificación de cuenta por token */}
          <Route path="/verificar/:token" element={<VerificarCuenta />} />
          {/* Detalle de una propiedad específica */}
          <Route path="/propiedad/:id" element={<DetallePropiedad />} />
          {/* Página de contacto */}
          <Route path="/contacto" element={<Contacto />} />
          {/* Favoritos del usuario */}
          <Route path="/favoritos" element={<Favoritos />} />
          {/* Rutas protegidas solo para administradores */}
          <Route path="/admin" element={<RutaPrivadaAdmin><AdminPanel /></RutaPrivadaAdmin>} />
          <Route path="/admin/usuarios" element={<RutaPrivadaAdmin><UsuariosAdmin /></RutaPrivadaAdmin>} />
          <Route path="/admin/mensajes" element={<RutaPrivadaAdmin><MensajesAdmin /></RutaPrivadaAdmin>} />
          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}
// Exporta el componente App para que pueda ser usado en main.jsx 
export default App;




// Importa componentes necesarios del sistema de rutas de React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importa las páginas que se mostrarán según la ruta
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DetallePropiedad from './pages/DetallePropiedad';
import AdminPanel from './pages/AdminPanel';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import RutaPrivadaAdmin from './components/RutaPrivadaAdmin'; // Protege rutas de acceso solo para admins
import VerificarCuenta from './pages/VerificarCuenta';
import UsuariosAdmin from './pages/UsuariosAdmin'; 
import MensajesAdmin from './pages/MensajesAdmin';

// Función principal del componente App
function App({ setModo, modo }) {
  return (
    // Envuelve toda la app en un enrutador para habilitar navegación por URLs
    <BrowserRouter>
      {/* Barra de navegación, recibe props para cambiar el modo claro/oscuro */}
      <Navbar setModo={setModo} modo={modo} />
      {/* Define las rutas disponibles */}
      <Routes>
        {/* Ruta de inicio */}
        <Route path="/" element={<Home />} />
        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        {/* Verificación de cuenta por token */}
        <Route path="/verificar/:token" element={<VerificarCuenta />} />
        {/* Detalle de una propiedad específica */}
        <Route path="/propiedad/:id" element={<DetallePropiedad />} />
        {/* Página de contacto */}
        <Route path="/contacto" element={<Contacto />} />
        {/* Rutas protegidas solo para administradores */}
        <Route path="/admin" element={<RutaPrivadaAdmin><AdminPanel /></RutaPrivadaAdmin>} />
        <Route path="/admin/usuarios" element={<RutaPrivadaAdmin><UsuariosAdmin /></RutaPrivadaAdmin>} />
        <Route path="/admin/mensajes" element={<RutaPrivadaAdmin><MensajesAdmin /></RutaPrivadaAdmin>} />
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
// Exporta el componente App para que pueda ser usado en main.jsx 
export default App;




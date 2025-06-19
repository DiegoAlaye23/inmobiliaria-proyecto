import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DetallePropiedad from './pages/DetallePropiedad';
import AdminPanel from './pages/AdminPanel';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import RutaPrivadaAdmin from './components/RutaPrivadaAdmin';
import VerificarCuenta from './pages/VerificarCuenta';
import UsuariosAdmin from './pages/UsuariosAdmin'; 
import MensajesAdmin from './pages/MensajesAdmin';

function App({ setModo, modo }) {
  return (
    <BrowserRouter>
      <Navbar setModo={setModo} modo={modo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/verificar/:token" element={<VerificarCuenta />} />
        <Route path="/propiedad/:id" element={<DetallePropiedad />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<RutaPrivadaAdmin><AdminPanel /></RutaPrivadaAdmin>} />
        <Route path="/admin/usuarios" element={<RutaPrivadaAdmin><UsuariosAdmin /></RutaPrivadaAdmin>} />
        <Route path="/admin/mensajes" element={<RutaPrivadaAdmin><MensajesAdmin /></RutaPrivadaAdmin>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




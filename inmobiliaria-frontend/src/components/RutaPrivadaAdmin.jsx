import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';

function RutaPrivadaAdmin({ children }) {
  const [validando, setValidando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    if (!token || !usuario) {
      setAutorizado(false);
      setValidando(false);
      return;
    }

    try {
      const userData = JSON.parse(usuario);
      setAutorizado(userData.rol === 'admin');
    } catch (err) {
      setAutorizado(false);
    } finally {
      setValidando(false);
    }
  }, []);

  if (validando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!autorizado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaPrivadaAdmin;


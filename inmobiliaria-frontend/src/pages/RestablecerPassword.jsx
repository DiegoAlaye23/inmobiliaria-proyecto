import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestablecerPassword() {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setCargando(true);

    try {
      const res = await axios.post(`inmobiliariafrontend.netlify.app/api/usuarios/restablecer/${token}`, {
        nuevaPassword,
      });

      setMensaje(res.data.mensaje);
    } catch (err) {
      setError(
        err.response?.data?.error || 'No se pudo restablecer la contraseña'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Restablecer contraseña
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
            Ingresá tu nueva contraseña. El enlace caduca en 15 minutos.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nueva contraseña"
              type="password"
              fullWidth
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={cargando}
            >
              {cargando ? <CircularProgress size={24} color="inherit" /> : 'Restablecer'}
            </Button>
          </form>

          {mensaje && (
            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
              {mensaje}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default RestablecerPassword;

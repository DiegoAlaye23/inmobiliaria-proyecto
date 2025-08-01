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
import axios from 'axios';

function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setCargando(true);

    try {
      const res = await axios.post('http://localhost:3001/api/usuarios/recuperar', { email });
      setMensaje(res.data.mensaje);
    } catch (err) {
      setError(
        err.response?.data?.error || 'Ocurrió un error al solicitar la recuperación'
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
            Recuperar contraseña
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
            Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {cargando ? <CircularProgress size={24} color="inherit" /> : 'Enviar enlace'}
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

export default RecuperarPassword;

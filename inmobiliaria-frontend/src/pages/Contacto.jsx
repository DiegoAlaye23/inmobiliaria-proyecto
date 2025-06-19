import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent
} from '@mui/material';

function Contacto() {
  const location = useLocation();
  const { propiedadId, propiedadTitulo } = location.state || {};

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: propiedadTitulo
      ? `Hola, estoy interesado en la propiedad: "${propiedadTitulo}".`
      : '',
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setEnviado(false);

    axios.post('http://localhost:3001/api/mensajes', {
      nombre: form.nombre,
      email: form.email,
      mensaje: form.mensaje,
      propiedad_id: propiedadId || null,
    })
      .then(() => {
        setEnviado(true);
        setForm({ nombre: '', email: '', mensaje: '' });
      })
      .catch((err) => {
        console.error(err);
        setError('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Formulario de Contacto
          </Typography>

          {enviado && <Alert severity="success" sx={{ mb: 2 }}>Mensaje enviado correctamente.</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Tu nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Tu correo"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              fullWidth
            >
              Enviar mensaje
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Contacto;


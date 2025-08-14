import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton, Alert } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../config/axios';

function Favoritos() {
  const [propiedades, setPropiedades] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const puedeFavoritos = ['cliente', 'usuario'].includes(usuario?.rol);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }
    if (!puedeFavoritos) {
      setMensaje('Solo clientes');
      return;
    }
    api
      .get('/favoritos')
      .then(res => setPropiedades(res.data))
      .catch(() => setMensaje('Error al cargar favoritos'));
  }, [usuario, puedeFavoritos, navigate]);

  const eliminarFavorito = (id) => {
    api
      .delete(`/favoritos/${id}`)
      .then(() => setPropiedades(propiedades.filter(p => p.id !== id)))
      .catch(() => setMensaje('Error al eliminar favorito'));
  };

  if (mensaje && propiedades.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="info">{mensaje}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Mis Favoritos
      </Typography>

      {mensaje && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}

      {Array.isArray(propiedades) && propiedades.length > 0 ? (
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {propiedades.map((prop) => (
            <Grid item key={prop.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={prop.imagen_destacada}
                  alt={prop.titulo}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {prop.titulo}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {prop.descripcion}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Precio:</strong> ${prop.precio}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Ciudad:</strong> {prop.ciudad}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <IconButton onClick={() => eliminarFavorito(prop.id)} color="error">
                    <Favorite />
                  </IconButton>
                  <Button
                    component={RouterLink}
                    to={`/propiedad/${prop.id}`}
                    size="small"
                    variant="outlined"
                  >
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center">
          No tienes propiedades favoritas.
        </Typography>
      )}
    </Box>
  );
}

export default Favoritos;

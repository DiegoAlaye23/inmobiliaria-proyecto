import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  useMediaQuery,
  IconButton,
  Alert,
  Paper,
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import FiltersDrawer from '../components/FiltersDrawer';
import FiltersTrigger from '../components/FiltersTrigger';
import FiltersChips from '../components/FiltersChips';
import FiltersForm from '../components/FiltersForm';
import usePropertyFilters from '../hooks/usePropertyFilters';

function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const { filters, debouncedFilters, setFilter, clearFilters } = usePropertyFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const puedeFavoritos = ['cliente', 'usuario'].includes(usuario?.rol);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const fetchPropiedades = useCallback(() => {
    const params = {};
    if (debouncedFilters.city) params.ciudad = debouncedFilters.city;
    if (debouncedFilters.type) params.tipo = debouncedFilters.type;
    if (debouncedFilters.minPrice !== '') params.minPrecio = debouncedFilters.minPrice;
    if (debouncedFilters.maxPrice !== '') params.maxPrecio = debouncedFilters.maxPrice;

    axios
      .get('https://inmobiliaria-proyecto.onrender.com/api/propiedades', {
        params
      })
      .then(res => {
        setPropiedades(res.data);
      })
      .catch(err => console.error('Error al cargar propiedades:', err));
  }, [debouncedFilters]);

  useEffect(() => {
    fetchPropiedades();
  }, [fetchPropiedades]);

  useEffect(() => {
    if (puedeFavoritos) {
      api
        .get('/favoritos')
        .then(res => setFavoritos(res.data.map(f => f.id)))
        .catch(err => console.error(err));
    }
  }, [puedeFavoritos]);

  const toggleFavorito = (id) => {
    if (!usuario) {
      navigate('/login');
      return;
    }
    if (!puedeFavoritos) {
      setMensaje('Solo clientes');
      return;
    }
    const endpoint = `/favoritos/${id}`;
    if (favoritos.includes(id)) {
      api
        .delete(endpoint)
        .then(() => setFavoritos(favoritos.filter(f => f !== id)))
        .catch(() => setMensaje('Error al eliminar favorito'));
    } else {
      api
        .post(endpoint)
        .then(() => setFavoritos([...favoritos, id]))
        .catch(() => setMensaje('Error al agregar favorito'));
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
        gap: 2,
        px: { xs: 2, sm: 4 },
        mt: 2,
      }}
    >
      {/* Columna izquierda: filtros */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <Paper
          elevation={4}
          sx={{
            position: 'sticky',
            top: '20vh',
            p: 3,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <FiltersForm filters={filters} setFilter={setFilter} />
          <Button fullWidth onClick={clearFilters} sx={{ mt: 2 }}>
            Limpiar
          </Button>
        </Paper>
      </Box>
      {/* Columna central: listado de propiedades */}
      <Box>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Propiedades Disponibles
        </Typography>

        {isMobile && <FiltersTrigger onClick={() => setDrawerOpen(true)} />}

        <FiltersChips
          filters={filters}
          setFilter={setFilter}
          clearFilters={clearFilters}
        />

        {mensaje && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {mensaje}
          </Alert>
        )}

        {Array.isArray(propiedades) && propiedades.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            {propiedades.map((prop) => (
              <Card
                key={prop.id}
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
                  <IconButton onClick={() => toggleFavorito(prop.id)} color="error">
                    {favoritos.includes(prop.id) ? <Favorite /> : <FavoriteBorder />}
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
            ))}
          </Box>
        ) : (
          <Typography textAlign="center">
            No hay propiedades disponibles.
          </Typography>
        )}

        <FiltersDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          setFilter={setFilter}
          clearFilters={clearFilters}
        />
      </Box>

    </Box>
  );
}

export default Home;

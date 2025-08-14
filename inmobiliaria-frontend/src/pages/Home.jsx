import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import FiltersDrawer from '../components/FiltersDrawer';
import FiltersTrigger from '../components/FiltersTrigger';
import FiltersChips from '../components/FiltersChips';
import FiltersForm from '../components/FiltersForm';
import usePropertyFilters from '../hooks/usePropertyFilters';

function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const { filters, debouncedFilters, setFilter, clearFilters } = usePropertyFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchPropiedades = () => {
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
  };

  useEffect(() => {
    fetchPropiedades();
  }, [debouncedFilters]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '260px 1fr 200px' },
        gap: 2,
        px: { xs: 2, sm: 4 },
        mt: 2,
      }}
    >
      {/* Columna izquierda: filtros */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'start' }}>
        <FiltersForm filters={filters} setFilter={setFilter} />
        <Button onClick={clearFilters} sx={{ mt: 2 }}>
          Limpiar
        </Button>
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
                  <CardActions>
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

      {/* Columna derecha: complementos */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'start', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Complementos
        </Typography>
        <Typography variant="body2">Contenido adicional</Typography>
      </Box>
    </Box>
  );
}

export default Home;

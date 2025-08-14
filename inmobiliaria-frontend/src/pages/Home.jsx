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
import FiltersBar from '../components/FiltersBar';
import FiltersDrawer from '../components/FiltersDrawer';
import FiltersTrigger from '../components/FiltersTrigger';
import FiltersChips from '../components/FiltersChips';
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
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Propiedades Disponibles
      </Typography>

      {isMobile ? (
        <FiltersTrigger onClick={() => setDrawerOpen(true)} />
      ) : (
        <FiltersBar filters={filters} setFilter={setFilter} />
      )}

      <FiltersChips
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
      />

      {Array.isArray(propiedades) && propiedades.length > 0 ? (
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {propiedades.map((prop) => (
            <Grid item key={prop.id} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                  sx={{ objectFit: "cover" }}
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
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
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
  );
}

export default Home;

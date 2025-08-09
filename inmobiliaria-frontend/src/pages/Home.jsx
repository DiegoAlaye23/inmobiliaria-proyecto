import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    axios
      .get("https://inmobiliaria-proyecto.onrender.com/api/propiedades")
      .then((res) => {
        console.log("Respuesta del backend:", res.data);
        setPropiedades(res.data);
      })
      .catch((err) => console.error("Error al cargar propiedades:", err));
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Propiedades Disponibles
      </Typography>

      {Array.isArray(propiedades) && propiedades.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {propiedades.map((prop) => (
            <Grid item key={prop.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={prop.imagen_destacada}
                  alt={prop.titulo}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {prop.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
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
    </Box>
  );
}

export default Home;

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
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [tipo, setTipo] = useState("");
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");
  const [ambientes, setAmbientes] = useState("");

  const fetchPropiedades = () => {
    const params = {};
    if (ciudad) params.ciudad = ciudad;
    if (tipo) params.tipo = tipo;
    if (minPrecio) params.minPrecio = minPrecio;
    if (maxPrecio) params.maxPrecio = maxPrecio;
    if (ambientes) params.ambientes = ambientes;

    axios
      .get("https://inmobiliaria-proyecto.onrender.com/api/propiedades", {
        params,
      })
      .then((res) => {
        console.log("Respuesta del backend:", res.data);
        setPropiedades(res.data);
      })
      .catch((err) => console.error("Error al cargar propiedades:", err));
  };

  useEffect(() => {
    fetchPropiedades();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Propiedades Disponibles
      </Typography>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <TextField
          label="Tipo de Propiedad"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <TextField
          label="Precio Mínimo"
          type="number"
          value={minPrecio}
          onChange={(e) => setMinPrecio(e.target.value)}
        />
        <TextField
          label="Precio Máximo"
          type="number"
          value={maxPrecio}
          onChange={(e) => setMaxPrecio(e.target.value)}
        />
        <TextField
          label="Ambientes"
          type="number"
          value={ambientes}
          onChange={(e) => setAmbientes(e.target.value)}
        />
        <Button variant="contained" onClick={fetchPropiedades}>
          Buscar
        </Button>
      </Box>

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
    </Box>
  );
}

export default Home;

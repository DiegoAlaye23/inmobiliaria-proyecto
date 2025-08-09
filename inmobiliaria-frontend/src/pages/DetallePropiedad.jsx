import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

function DetallePropiedad() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://inmobiliaria-proyecto.onrender.com/api/propiedades/${id}`)
      .then((res) => setPropiedad(res.data))
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la propiedad.");
      });
  }, [id]);

  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  if (!propiedad)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Card sx={{ borderRadius: 2, boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="400"
          image={propiedad.imagen_destacada}
          alt={propiedad.titulo}
        />

        <CardContent>
          <Typography variant="h4" gutterBottom>
            {propiedad.titulo}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" gutterBottom>
            <strong>Descripción:</strong> {propiedad.descripcion}
          </Typography>
          <Typography>
            <strong>Precio:</strong> ${propiedad.precio}
          </Typography>
          <Typography>
            <strong>Dirección:</strong> {propiedad.direccion}, {propiedad.ciudad},{" "}
            {propiedad.provincia}
          </Typography>
          <Typography>
            <strong>Ambientes:</strong> {propiedad.ambientes}
          </Typography>
          <Typography>
            <strong>Baños:</strong> {propiedad.banos}
          </Typography>
          <Typography>
            <strong>Cochera:</strong> {propiedad.cochera ? "Sí" : "No"}
          </Typography>
          <Typography>
            <strong>Metros cuadrados:</strong> {propiedad.m2} m²
          </Typography>
          <Typography>
            <strong>Fecha de publicación:</strong>{" "}
            {new Date(propiedad.fecha_publicacion).toLocaleDateString()}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate("/contacto", {
                  state: {
                    propiedadId: propiedad.id,
                    propiedadTitulo: propiedad.titulo,
                  },
                })
              }
            >
              Contactar por esta propiedad
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DetallePropiedad;



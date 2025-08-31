import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../config/axios";
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
  Dialog,
} from "@mui/material";

function DetallePropiedad() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState("");
  const [esFavorito, setEsFavorito] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const puedeFavoritos = ["cliente", "usuario"].includes(usuario?.rol);
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

  useEffect(() => {
    if (puedeFavoritos) {
      api
        .get("/favoritos")
        .then((res) =>
          setEsFavorito(res.data.some((f) => f.id === parseInt(id)))
        )
        .catch((err) => console.error(err));
    }
  }, [puedeFavoritos, id]);

  const toggleFavorito = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    if (!puedeFavoritos) {
      setMensaje("Solo clientes");
      return;
    }
    const endpoint = `/favoritos/${id}`;
    if (esFavorito) {
      api
        .delete(endpoint)
        .then(() => setEsFavorito(false))
        .catch(() => setMensaje("Error al eliminar favorito"));
    } else {
      api
        .post(endpoint)
        .then(() => setEsFavorito(true))
        .catch(() => setMensaje("Error al agregar favorito"));
    }
  };

  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  if (!propiedad)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  const imagenes =
    propiedad.imagenes && propiedad.imagenes.length > 0
      ? propiedad.imagenes
      : [{ url: propiedad.imagen_destacada, alt: propiedad.titulo }];

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Card sx={{ borderRadius: 2, boxShadow: 4 }}>
        <Box>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => setLightboxAbierto(true)}
          >
            <img
              src={imagenes[indiceImagen].url}
              alt={imagenes[indiceImagen].alt}
              style={{ width: "100%", height: 400, objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ display: "flex", mt: 1, gap: 1, overflowX: "auto" }}>
            {imagenes.map((img, idx) => (
              <Box
                key={idx}
                onClick={() => setIndiceImagen(idx)}
                sx={{
                  width: 80,
                  height: 80,
                  border:
                    idx === indiceImagen
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

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
            <strong>Dirección:</strong> {propiedad.direccion}, {propiedad.ciudad}{" "}
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

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={toggleFavorito}
            >
              {esFavorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
            </Button>
          </Box>
        {mensaje && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {mensaje}
          </Alert>
        )}
        </CardContent>
      </Card>
      <Dialog
        open={lightboxAbierto}
        onClose={() => setLightboxAbierto(false)}
        maxWidth="lg"
      >
        <img
          src={imagenes[indiceImagen].url}
          alt={imagenes[indiceImagen].alt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Dialog>
    </Box>
  );
}

export default DetallePropiedad;

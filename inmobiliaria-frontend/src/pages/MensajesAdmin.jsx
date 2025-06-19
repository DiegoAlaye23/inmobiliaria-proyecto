import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Alert,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

function MensajesAdmin() {
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const cargarMensajes = () => {
    axios
      .get("http://localhost:3001/api/mensajes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMensajes(res.data))
      .catch((err) => {
        console.error("Error al obtener mensajes", err);
        setError("No se pudieron cargar los mensajes");
      });
  };

  const handleEliminarMensaje = (id) => {
    axios
      .delete(`http://localhost:3001/api/mensajes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => cargarMensajes())
      .catch(() => alert("Error al eliminar mensaje"));
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Mensajes de Contacto</Typography>
      <Paper sx={{ p: 3 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {mensajes.length === 0 ? (
          <Alert severity="info">No hay mensajes aún.</Alert>
        ) : (
          <List>
            {mensajes.map((msg) => (
              <ListItem key={msg.id} divider alignItems="flex-start">
                <ListItemText
                  primary={
                    <>
                      <Typography variant="subtitle1">
                        <strong>{msg.nombre}</strong> – {msg.email}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {msg.mensaje}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Propiedad ID: {msg.propiedad_id || "—"} |{" "}
                        {new Date(msg.fecha_envio).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                <IconButton
                  onClick={() => handleEliminarMensaje(msg.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}

export default MensajesAdmin;

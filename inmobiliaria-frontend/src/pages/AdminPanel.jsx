import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Paper,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

function AdminPanel() {
  const [propiedades, setPropiedades] = useState([]);
  const [nueva, setNueva] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    ciudad: "",
    imagen: null,
  });
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({});
  const token = localStorage.getItem("token");

  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [adminMensaje, setAdminMensaje] = useState("");

  const cargarPropiedades = () => {
    axios
      .get("http://localhost:3001/api/propiedades")
      .then((res) => setPropiedades(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/propiedades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(cargarPropiedades)
      .catch(() => alert("Error al eliminar"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(nueva).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    axios
      .post("http://localhost:3001/api/propiedades", formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then(() => {
        cargarPropiedades();
        setNueva({
          titulo: "",
          descripcion: "",
          precio: "",
          ciudad: "",
          imagen: null,
        });
      })
      .catch(() => alert("Error al crear propiedad"));
  };

  const handleEditClick = (prop) => {
    setEditandoId(prop.id);
    setEditData({ ...prop });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`http://localhost:3001/api/propiedades/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEditandoId(null);
        cargarPropiedades();
      })
      .catch(() => alert("Error al actualizar"));
  };

  const handleCancelEdit = () => {
    setEditandoId(null);
    setEditData({});
  };

  const handleCrearAdmin = (e) => {
    e.preventDefault();
    setAdminMensaje("");

    axios
      .post("http://localhost:3001/api/usuarios/crear-admin", nuevoAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAdminMensaje(
          "Administrador creado. Revisa el correo para verificar."
        );
        setNuevoAdmin({ nombre: "", email: "", password: "" });
      })
      .catch((err) => {
        console.error(err);
        setAdminMensaje("Error al crear administrador");
      });
  };

  useEffect(() => {
    cargarPropiedades();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Agregar nueva propiedad
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Título"
                name="titulo"
                fullWidth
                required
                value={nueva.titulo}
                onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                name="ciudad"
                fullWidth
                required
                value={nueva.ciudad}
                onChange={(e) => setNueva({ ...nueva, ciudad: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                fullWidth
                multiline
                rows={3}
                required
                value={nueva.descripcion}
                onChange={(e) =>
                  setNueva({ ...nueva, descripcion: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio"
                name="precio"
                type="number"
                fullWidth
                required
                value={nueva.precio}
                onChange={(e) => setNueva({ ...nueva, precio: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="imagen"></InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  id="imagen"
                  onChange={(e) =>
                    setNueva({ ...nueva, imagen: e.target.files[0] })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Crear propiedad
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Crear nuevo administrador
        </Typography>
        <form onSubmit={handleCrearAdmin}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre"
                fullWidth
                required
                value={nuevoAdmin.nombre}
                onChange={(e) =>
                  setNuevoAdmin({ ...nuevoAdmin, nombre: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Correo"
                type="email"
                fullWidth
                required
                value={nuevoAdmin.email}
                onChange={(e) =>
                  setNuevoAdmin({ ...nuevoAdmin, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                required
                value={nuevoAdmin.password}
                onChange={(e) =>
                  setNuevoAdmin({ ...nuevoAdmin, password: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
          >
            Crear admin
          </Button>
          {adminMensaje && (
            <Typography sx={{ mt: 1 }} color="primary">
              {adminMensaje}
            </Typography>
          )}
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Propiedades actuales
      </Typography>
      {propiedades.length === 0 ? (
        <Alert severity="info">No hay propiedades registradas.</Alert>
      ) : (
        <Grid container spacing={3}>
          {propiedades.map((prop) => (
            <Grid item xs={12} md={6} key={prop.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3001/uploads/${prop.imagen_destacada}`}
                  alt={prop.titulo}
                />
                <CardContent>
                  {editandoId === prop.id ? (
                    <>
                      <TextField
                        fullWidth
                        name="titulo"
                        label="Título"
                        value={editData.titulo}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="descripcion"
                        label="Descripción"
                        value={editData.descripcion}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="precio"
                        label="Precio"
                        value={editData.precio}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="ciudad"
                        label="Ciudad"
                        value={editData.ciudad}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <Box display="flex" gap={1}>
                        <IconButton
                          onClick={() => handleSaveEdit(prop.id)}
                          color="success"
                        >
                          <Save />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} color="error">
                          <Cancel />
                        </IconButton>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{prop.titulo}</Typography>
                      <Typography>
                        ${prop.precio} – {prop.ciudad}
                      </Typography>
                      <Box display="flex" gap={1} mt={1}>
                        <IconButton
                          onClick={() => handleEditClick(prop)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(prop.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default AdminPanel;

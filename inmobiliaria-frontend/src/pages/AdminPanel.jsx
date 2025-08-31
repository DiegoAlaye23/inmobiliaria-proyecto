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
  MenuItem,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

function AdminPanel() {
  const [propiedades, setPropiedades] = useState([]);
  const [nueva, setNueva] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    ciudad: "",
    direccion: "",
    provincia: "",
    tipo: "",
    ambientes: "",
    banos: "",
    cochera: "",
    m2: "",
    imagenes: null,
  });
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({});
  const [dragIndex, setDragIndex] = useState(null);
  const token = localStorage.getItem("token");

  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [adminMensaje, setAdminMensaje] = useState("");

  const cargarPropiedades = () => {
    axios
      .get("https://inmobiliaria-proyecto.onrender.com/api/propiedades")
      .then((res) => setPropiedades(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://inmobiliaria-proyecto.onrender.com/api/propiedades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(cargarPropiedades)
      .catch(() => alert("Error al eliminar"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(nueva).forEach(([key, val]) => {
      if (key !== "imagenes" && val !== null && val !== undefined && val !== "") {
        formData.append(key, val);
      }
    });
    if (nueva.imagenes) {
      Array.from(nueva.imagenes).forEach((img) => formData.append("imagenes", img));
    }

    axios
      .post("https://inmobiliaria-proyecto.onrender.com/api/propiedades", formData, {
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
          direccion: "",
          provincia: "",
          tipo: "",
          ambientes: "",
          banos: "",
          cochera: "",
          m2: "",
          imagenes: null,
        });
      })
      .catch(() => alert("Error al crear propiedad"));
  };

  const handleEditClick = (prop) => {
    axios
      .get(`https://inmobiliaria-proyecto.onrender.com/api/propiedades/${prop.id}`)
      .then((res) => {
        setEditandoId(prop.id);
        setEditData(res.data);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "cochera" ? value === "true" || value === true : value,
    }));
  };

  const handleSaveEdit = (id) => {
    const formData = new FormData();
    Object.entries(editData).forEach(([key, val]) => {
      if (
        key !== "imagenes" &&
        key !== "nuevasImagenes" &&
        val !== null &&
        val !== undefined &&
        val !== ""
      ) {
        formData.append(key, val);
      }
    });
    if (editData.nuevasImagenes) {
      Array.from(editData.nuevasImagenes).forEach((img) =>
        formData.append("imagenes", img)
      );
    }
    axios
      .put(
        `https://inmobiliaria-proyecto.onrender.com/api/propiedades/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setEditandoId(null);
        cargarPropiedades();
      })
      .catch(() => alert("Error al actualizar"));
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null) return;
    const items = Array.from(editData.imagenes || []);
    const [moved] = items.splice(dragIndex, 1);
    items.splice(index, 0, moved);
    setDragIndex(null);
    setEditData((prev) => ({ ...prev, imagenes: items }));
    axios
      .put(
        `https://inmobiliaria-proyecto.onrender.com/api/propiedades/${editandoId}/imagenes/orden`,
        { orden: items.map((i) => i.id) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch(() => alert("Error al reordenar"));
  };

  const handleImageDelete = (imgId) => {
    axios
      .delete(
        `https://inmobiliaria-proyecto.onrender.com/api/propiedades/${editandoId}/imagenes/${imgId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditData((prev) => ({
          ...prev,
          imagenes: prev.imagenes.filter((i) => i.id !== imgId),
        }));
      })
      .catch(() => alert("Error al eliminar imagen"));
  };

  const handleCancelEdit = () => {
    setEditandoId(null);
    setEditData({});
  };

  const handleCrearAdmin = (e) => {
    e.preventDefault();
    setAdminMensaje("");

    axios
      .post("https://inmobiliaria-proyecto.onrender.com/api/usuarios/crear-admin", nuevoAdmin, {
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                name="direccion"
                fullWidth
                required
                value={nueva.direccion}
                onChange={(e) =>
                  setNueva({ ...nueva, direccion: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Provincia"
                name="provincia"
                fullWidth
                required
                value={nueva.provincia}
                onChange={(e) =>
                  setNueva({ ...nueva, provincia: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo"
                name="tipo"
                fullWidth
                required
                value={nueva.tipo}
                onChange={(e) => setNueva({ ...nueva, tipo: e.target.value })}
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
              <TextField
                label="Ambientes"
                name="ambientes"
                type="number"
                fullWidth
                required
                value={nueva.ambientes}
                onChange={(e) =>
                  setNueva({ ...nueva, ambientes: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Baños"
                name="banos"
                type="number"
                fullWidth
                required
                value={nueva.banos}
                onChange={(e) => setNueva({ ...nueva, banos: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Cochera"
                name="cochera"
                fullWidth
                required
                value={nueva.cochera}
                onChange={(e) =>
                  setNueva({ ...nueva, cochera: e.target.value === "true" })
                }
              >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Metros cuadrados"
                name="m2"
                type="number"
                fullWidth
                required
                value={nueva.m2}
                onChange={(e) => setNueva({ ...nueva, m2: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="imagenes"></InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  id="imagenes"
                  name="imagenes"
                  multiple
                  onChange={(e) =>
                    setNueva({ ...nueva, imagenes: e.target.files })
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
                  image={prop.imagen_destacada}
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
                      <TextField
                        fullWidth
                        name="direccion"
                        label="Dirección"
                        value={editData.direccion}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="provincia"
                        label="Provincia"
                        value={editData.provincia}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="tipo"
                        label="Tipo"
                        value={editData.tipo}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="ambientes"
                        label="Ambientes"
                        value={editData.ambientes}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        name="banos"
                        label="Baños"
                        value={editData.banos}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        select
                        fullWidth
                        name="cochera"
                        label="Cochera"
                        value={editData.cochera}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      >
                        <MenuItem value={true}>Sí</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        name="m2"
                        label="Metros cuadrados"
                        value={editData.m2}
                        onChange={handleEditChange}
                        sx={{ mb: 1 }}
                      />
                      {editData.imagenes && (
                        <Box
                          display="flex"
                          gap={1}
                          flexWrap="wrap"
                          sx={{ mb: 1 }}
                        >
                          {editData.imagenes.map((img, idx) => (
                            <Box
                              key={img.id}
                              draggable
                              onDragStart={() => handleDragStart(idx)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => handleDrop(idx)}
                              sx={{ position: "relative" }}
                            >
                              <img
                                src={img.url}
                                alt={img.alt}
                                width={80}
                                height={80}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleImageDelete(img.id)}
                                sx={{ position: "absolute", top: 0, right: 0 }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        name="imagenes"
                        multiple
                        onChange={(e) =>
                          setEditData({ ...editData, nuevasImagenes: e.target.files })
                        }
                        style={{ marginBottom: 8 }}
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

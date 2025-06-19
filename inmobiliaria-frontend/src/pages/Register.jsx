import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (form.password !== form.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/usuarios/registro", {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
      });

      setMensaje(res.data.mensaje || "Registro exitoso. Revisa tu correo.");
      setForm({ nombre: "", email: "", password: "", confirmarPassword: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Crear cuenta
        </Typography>

        {mensaje && <Alert severity="success">{mensaje}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirmar contraseña"
            name="confirmarPassword"
            type="password"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;

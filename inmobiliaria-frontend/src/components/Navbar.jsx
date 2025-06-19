import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ setModo, modo }) {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          🏠 Inmobiliaria
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <IconButton
            color="inherit"
            onClick={() => setModo(modo === "light" ? "dark" : "light")}
          >
            {modo === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {!usuario && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/registro">
                Registrarse
              </Button>
            </>
          )}

          {usuario?.rol === "admin" && (
            <>
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
              <Button color="inherit" component={Link} to="/admin/usuarios">
                Usuarios
              </Button>
              <Button color="inherit" component={Link} to="/admin/mensajes">
                Mensajes
              </Button>
            </>
          )}

          {token && (
            <Button color="inherit" onClick={logout}>
              Salir
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Brightness4, Brightness7, Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ setModo, modo }) {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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

        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={() => setModo(modo === "light" ? "dark" : "light")}
              sx={{ mr: 1 }}
            >
              {modo === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen} edge="end">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!usuario && (
                <>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/registro"
                    onClick={handleMenuClose}
                  >
                    Registrarse
                  </MenuItem>
                </>
              )}
              {usuario?.rol === "admin" && (
                <>
                  <MenuItem
                    component={Link}
                    to="/admin"
                    onClick={handleMenuClose}
                  >
                    Admin
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/admin/usuarios"
                    onClick={handleMenuClose}
                  >
                    Usuarios
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/admin/mensajes"
                    onClick={handleMenuClose}
                  >
                    Mensajes
                  </MenuItem>
                </>
              )}
              {token && (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    logout();
                  }}
                >
                  Salir
                </MenuItem>
              )}
            </Menu>
          </div>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

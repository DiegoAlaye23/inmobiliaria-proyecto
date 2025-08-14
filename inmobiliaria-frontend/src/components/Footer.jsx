import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Inmobiliaria. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;

import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 2,
        mt: 4,
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

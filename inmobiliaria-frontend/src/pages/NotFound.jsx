import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme(); // Detecta si está en modo oscuro o claro

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 3,
        p: 4,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h2" color="error" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5">Página no encontrada</Typography>
      <Typography variant="body1" color="text.secondary">
        La URL que ingresaste no existe.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
}

export default NotFound;


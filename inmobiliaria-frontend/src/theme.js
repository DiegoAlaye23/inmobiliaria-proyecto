// Importa la función createTheme de la librería de Material UI.
// Esta función permite crear un "tema" personalizado para toda la aplicación.
import { createTheme } from '@mui/material/styles';

// Exporta una función llamada getTheme, que recibe como parámetro el modo ("light" o "dark").
export const getTheme = (modo) =>
  // Llama a createTheme para generar un objeto de tema personalizado.
  createTheme({
    // Define la paleta de colores del tema.
    palette: {
      mode: modo, // Asigna el modo (claro u oscuro). Esto permite a MUI ajustar automáticamente los colores.
      primary: {
        main: '#1976d2', // Color principal (ej: botones, AppBar, enlaces destacados, etc.)
      },
      secondary: {
        main: '#f50057', // Color secundario (ej: botones secundarios, acentos, etc.)
      },
    },
  });

// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (modo) =>
  createTheme({
    palette: {
      mode: modo, // "light" o "dark"
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

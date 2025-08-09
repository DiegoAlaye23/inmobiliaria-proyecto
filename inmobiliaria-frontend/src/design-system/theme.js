import { createTheme } from '@mui/material/styles';
import { palette, typography } from './tokens.js';

export const getTheme = (mode) =>
  createTheme({
    palette: { ...palette, mode },
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });

export default getTheme;

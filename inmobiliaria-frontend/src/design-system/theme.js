import { createTheme } from '@mui/material/styles';
import { paletteLight, paletteDark, typography } from './tokens.js';

export const getTheme = (mode) => {
  const basePalette = mode === 'dark' ? paletteDark : paletteLight;
  const palette = Object.assign({ mode }, basePalette);

  return createTheme({
    palette: { ...(mode === 'dark' ? paletteDark : paletteLight), mode },
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
};

export default getTheme;



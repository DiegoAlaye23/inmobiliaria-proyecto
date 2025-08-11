import { createTheme } from '@mui/material/styles';
import { paletteLight, paletteDark, typography } from './tokens.js';

export function getTheme(mode) {
  const basePalette = mode === 'dark' ? paletteDark : paletteLight;
  const palette = Object.assign({ mode }, basePalette);

  return createTheme({
    palette,
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
}

export default getTheme;

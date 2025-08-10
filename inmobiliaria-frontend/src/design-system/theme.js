import { createTheme } from '@mui/material/styles';
import { palette, typography } from './tokens.js';

export const getTheme = (mode) =>
  createTheme({
    palette: { ...palette, mode },
=======
import { paletteLight, paletteDark, typography } from './tokens.js';

export const getTheme = (mode) => {
  return createTheme({
    palette: { ...(mode === 'dark' ? paletteDark : paletteLight), mode },
=======
=======
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
=======
=======

export default getTheme;

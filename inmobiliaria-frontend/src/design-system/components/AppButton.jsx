import Button from '@mui/material/Button';

// Botón base del sistema de diseño con estilos y variantes coherentes
const AppButton = ({ variant = 'contained', color = 'primary', sx = {}, ...props }) => (
  <Button
    variant={variant}
    color={color}
    sx={{ borderRadius: 2, textTransform: 'none', ...sx }}
    {...props}
  />
);

export default AppButton;

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

function FiltersTrigger({ onClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 0,
        right: 0,
        p: 1,
        backgroundColor: 'background.default',
        zIndex: 1200
      }}
    >
      <Button
        fullWidth
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={onClick}
      >
        Filtrar
      </Button>
    </Box>
  );
}

FiltersTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default FiltersTrigger;

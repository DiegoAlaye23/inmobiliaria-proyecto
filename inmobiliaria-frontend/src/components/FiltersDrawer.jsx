import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FiltersForm from './FiltersForm';

function FiltersDrawer({ open, onClose, filters, setFilter, clearFilters }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: isMobile
          ? { borderTopLeftRadius: 8, borderTopRightRadius: 8, maxHeight: '80vh' }
          : { width: 340 }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Filtros</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2, pt: 0, overflow: 'auto', flex: 1 }}>
          <FiltersForm filters={filters} setFilter={setFilter} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            p: 2,
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Button onClick={clearFilters}>Limpiar</Button>
          <Button variant="contained" onClick={onClose}>
            Aplicar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

FiltersDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default FiltersDrawer;

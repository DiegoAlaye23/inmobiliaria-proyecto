import { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import FiltersForm from './FiltersForm';

function MobileFiltersDrawer({ filters, setFilter, clearFilters }: any) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(prev => !prev);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 0,
          right: 0,
          p: 1,
          backgroundColor: 'background.default',
          zIndex: 1200,
          display: open ? 'none' : 'block'
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={toggleDrawer}
        >
          Filtrar
        </Button>
      </Box>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{ sx: { borderTopLeftRadius: 8, borderTopRightRadius: 8, maxHeight: '80vh' } }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Filtros</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 2, pt: 0, overflow: 'auto', flex: 1 }}>
            <FiltersForm filters={filters} setFilter={setFilter} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button onClick={clearFilters}>Limpiar</Button>
            <Button variant="contained" onClick={toggleDrawer}>
              Aplicar
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

MobileFiltersDrawer.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default MobileFiltersDrawer;

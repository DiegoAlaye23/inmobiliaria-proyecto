import { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function MobileFiltersDrawer({ filters, setFilter, clearFilters }: any) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(prev => !prev);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={toggleDrawer}
        sx={{ position: 'sticky', top: 0, zIndex: 1200, m: 1 }}
      >
        Filtrar
      </Button>
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Filtros</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            size="small"
            label="Ciudad"
            value={filters.city}
            onChange={e => setFilter('city', e.target.value)}
          />
          <FormControl size="small">
            <InputLabel id="m-type-label">Tipo</InputLabel>
            <Select
              labelId="m-type-label"
              label="Tipo"
              value={filters.type}
              onChange={e => setFilter('type', e.target.value)}
            >
              <MenuItem value="">Cualquiera</MenuItem>
              <MenuItem value="Casa">Casa</MenuItem>
              <MenuItem value="Departamento">Departamento</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.price}
              onChange={(_, val) => setFilter('price', val)}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
            />
          </Box>
          <FormControl size="small">
            <InputLabel id="m-rooms-label">Ambientes</InputLabel>
            <Select
              labelId="m-rooms-label"
              label="Ambientes"
              value={filters.rooms}
              onChange={e => setFilter('rooms', e.target.value)}
            >
              <MenuItem value="">Cualquiera</MenuItem>
              {[1, 2, 3, 4].map(n => (
                <MenuItem key={n} value={String(n)}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Barrio"
            value={filters.neighborhood || ''}
            onChange={e => setFilter('neighborhood', e.target.value)}
          />
          <Button onClick={clearFilters}>Limpiar filtros</Button>
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

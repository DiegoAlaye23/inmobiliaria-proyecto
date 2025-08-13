import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import FiltersForm from './FiltersForm';

function FiltersBar({ filters, setFilter, sort, setSort, clearFilters }: any) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(prev => !prev);

  return (
    <>
      <Toolbar disableGutters sx={{ gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          label="Ciudad"
          value={filters.city}
          onChange={e => setFilter('city', e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            label="Tipo"
            value={filters.type}
            onChange={e => setFilter('type', e.target.value)}
          >
            <MenuItem value="">Cualquiera</MenuItem>
            <MenuItem value="Casa">Casa</MenuItem>
            <MenuItem value="Departamento">Departamento</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="sort-label">Ordenar</InputLabel>
          <Select
            labelId="sort-label"
            label="Ordenar"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <MenuItem value="date">Fecha</MenuItem>
            <MenuItem value="price-asc">Precio ↑</MenuItem>
            <MenuItem value="price-desc">Precio ↓</MenuItem>
          </Select>
        </FormControl>
        <Button startIcon={<FilterListIcon />} onClick={toggleDrawer} variant="outlined">
          Más filtros
        </Button>
      </Toolbar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer} PaperProps={{ sx: { width: 340 } }}>
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

FiltersBar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default FiltersBar;

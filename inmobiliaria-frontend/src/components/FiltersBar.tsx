import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import FiltersTrigger from './FiltersTrigger';

function FiltersBar({ filters, setFilter, sort, setSort, onOpen }: any) {
  return (
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
      <FiltersTrigger onClick={onOpen} />
    </Toolbar>
  );
}

FiltersBar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default FiltersBar;

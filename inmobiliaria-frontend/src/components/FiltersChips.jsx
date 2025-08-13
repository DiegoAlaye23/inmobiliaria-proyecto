import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function FiltersChips({ filters, setFilter, clearFilters }) {
  const chips = [];
  if (filters.city) chips.push({ key: 'city', label: `Ciudad: ${filters.city}` });
  if (filters.type) chips.push({ key: 'type', label: `Tipo: ${filters.type}` });
  if (filters.price[0] || filters.price[1] !== 1000000)
    chips.push({ key: 'price', label: `Precio: ${filters.price[0]} - ${filters.price[1]}` });
  if (filters.rooms) chips.push({ key: 'rooms', label: `Ambientes: ${filters.rooms}` });
  if (filters.neighborhood)
    chips.push({ key: 'neighborhood', label: `Barrio: ${filters.neighborhood}` });

  return (
    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {chips.map(chip => (
        <Chip
          key={chip.key}
          label={chip.label}
          onDelete={() => setFilter(chip.key, chip.key === 'price' ? [0, 1000000] : '')}
        />
      ))}
      {chips.length ? <Button onClick={clearFilters}>Limpiar</Button> : null}
    </Box>
  );
}

FiltersChips.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default FiltersChips;

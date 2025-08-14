import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function FiltersChips({ filters, setFilter, clearFilters }) {
  const chips = [];
  if (filters.city) chips.push({ key: 'city', label: `Ciudad: ${filters.city}` });
  if (filters.minPrice !== '') chips.push({ key: 'minPrice', label: `Mín: $${filters.minPrice}` });
  if (filters.maxPrice !== '')
    chips.push({
      key: 'maxPrice',
      label: `Máx: ${filters.maxPrice === 200000 ? '$200000+' : '$' + filters.maxPrice}`
    });
  if (filters.type) chips.push({ key: 'type', label: `Tipo: ${filters.type}` });

  return (
    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {chips.map(chip => (
        <Chip key={chip.key} label={chip.label} onDelete={() => setFilter(chip.key, '')} />
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

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const cities = ['CABA', 'Córdoba', 'Rosario', 'La Plata'];
const minPrices = [0, 50000, 100000, 150000];
const maxPrices = [50000, 100000, 150000, 200000];
const types = ['Casa', 'Departamento', 'PH', 'Terreno'];

function FiltersForm({ filters, setFilter }: any) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl size="small" fullWidth>
        <InputLabel id="city-label">Ciudad</InputLabel>
        <Select
          labelId="city-label"
          label="Ciudad"
          value={filters.city}
          onChange={e => setFilter('city', e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {cities.map(city => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel id="min-label">Precio mínimo</InputLabel>
        <Select
          labelId="min-label"
          label="Precio mínimo"
          value={filters.minPrice}
          onChange={e => setFilter('minPrice', e.target.value)}
        >
          <MenuItem value="">Sin mínimo</MenuItem>
          {minPrices.map(price => (
            <MenuItem key={price} value={price}>
              {'$' + price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel id="max-label">Precio máximo</InputLabel>
        <Select
          labelId="max-label"
          label="Precio máximo"
          value={filters.maxPrice}
          onChange={e => setFilter('maxPrice', e.target.value)}
        >
          <MenuItem value="">Sin máximo</MenuItem>
          {maxPrices.map(price => (
            <MenuItem key={price} value={price}>
              {price === 200000 ? '200000+' : '$' + price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel id="type-label">Tipo de propiedad</InputLabel>
        <Select
          labelId="type-label"
          label="Tipo de propiedad"
          value={filters.type}
          onChange={e => setFilter('type', e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          {types.map(t => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

FiltersForm.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default FiltersForm;

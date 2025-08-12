import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import PropTypes from 'prop-types';

function FiltersBar({ filters, setFilter }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
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
        <Box sx={{ width: 160, px: 1 }}>
          <Slider
            value={filters.price}
            onChange={(_, val) => setFilter('price', val)}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
          />
        </Box>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="rooms-label">Ambientes</InputLabel>
          <Select
            labelId="rooms-label"
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
        <IconButton color="primary" onClick={handleMore} aria-label="más filtros">
          <TuneIcon />
        </IconButton>
      </Toolbar>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle2">Más filtros</Typography>
          <TextField
            size="small"
            label="Barrio"
            value={filters.neighborhood || ''}
            onChange={e => setFilter('neighborhood', e.target.value)}
          />
        </Box>
      </Popover>
    </Box>
  );
}

FiltersBar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default FiltersBar;

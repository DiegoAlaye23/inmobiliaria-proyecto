import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function FiltersForm({ filters, setFilter }: any) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Ubicación</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            size="small"
            label="Ciudad"
            value={filters.city}
            onChange={e => setFilter('city', e.target.value)}
          />
          <TextField
            size="small"
            label="Barrio"
            value={filters.neighborhood || ''}
            onChange={e => setFilter('neighborhood', e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Tipo de propiedad</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl size="small" fullWidth>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Precio</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 1 }}>
          <Slider
            value={filters.price}
            onChange={(_, val) => setFilter('price', val)}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Ambientes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl size="small" fullWidth>
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
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

FiltersForm.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default FiltersForm;

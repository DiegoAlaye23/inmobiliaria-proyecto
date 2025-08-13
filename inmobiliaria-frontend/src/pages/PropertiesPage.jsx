import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FiltersBar from '../components/FiltersBar';
import FiltersTrigger from '../components/FiltersTrigger';
import FiltersDrawer from '../components/FiltersDrawer';
import FiltersChips from '../components/FiltersChips';
import PropertyCard from '../components/PropertyCard';
import usePropertyFilters from '../hooks/usePropertyFilters';

const mockProperties = [
  {
    id: 1,
    title: 'Casa céntrica',
    city: 'Buenos Aires',
    type: 'Casa',
    price: 120000,
    rooms: 3,
    date: '2024-01-10',
    image: 'https://placehold.co/600x337'
  },
  {
    id: 2,
    title: 'Departamento moderno',
    city: 'Córdoba',
    type: 'Departamento',
    price: 90000,
    rooms: 2,
    date: '2024-02-15',
    image: 'https://placehold.co/600x337'
  },
  {
    id: 3,
    title: 'Loft con vista',
    city: 'Mendoza',
    type: 'Departamento',
    price: 150000,
    rooms: 1,
    date: '2024-03-05',
    image: 'https://placehold.co/600x337'
  }
];

export default function PropertiesPage() {
  const { filters, debouncedFilters, setFilter, clearFilters } = usePropertyFilters();
  const [sort, setSort] = useState('date');
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [debouncedFilters, sort]);

  const filtered = useMemo(() => {
    return mockProperties.filter(p => {
      if (debouncedFilters.city && !p.city.toLowerCase().includes(debouncedFilters.city.toLowerCase())) return false;
      if (debouncedFilters.type && p.type !== debouncedFilters.type) return false;
      if (p.price < debouncedFilters.price[0] || p.price > debouncedFilters.price[1]) return false;
      if (debouncedFilters.rooms && String(p.rooms) !== debouncedFilters.rooms) return false;
      if (debouncedFilters.neighborhood && !p.neighborhood?.toLowerCase().includes(debouncedFilters.neighborhood.toLowerCase())) return false;
      return true;
    });
  }, [debouncedFilters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);
    else arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    return arr;
  }, [filtered, sort]);

  return (
    <Box sx={{ p: 2 }}>
      {isMobile ? (
        <>
          <FiltersTrigger onClick={() => setDrawerOpen(true)} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
            <Select value={sort} onChange={e => setSort(e.target.value)} size="small">
              <MenuItem value="date">Fecha</MenuItem>
              <MenuItem value="price-asc">Precio ↑</MenuItem>
              <MenuItem value="price-desc">Precio ↓</MenuItem>
            </Select>
          </Box>
        </>
      ) : (
        <FiltersBar
          filters={filters}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          onOpen={() => setDrawerOpen(true)}
        />
      )}

      <FiltersChips filters={filters} setFilter={setFilter} clearFilters={clearFilters} />

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton variant="rectangular" height={180} />
            </Grid>
          ))}
        </Grid>
      ) : sorted.length ? (
        <Grid container spacing={2}>
          {sorted.map(property => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography>No hay resultados.</Typography>
        </Box>
      )}

      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
      />
    </Box>
  );
}
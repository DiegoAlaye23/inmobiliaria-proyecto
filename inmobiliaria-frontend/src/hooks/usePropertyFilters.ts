import { useEffect, useState } from 'react';

export interface PropertyFilters {
  city: string;
  type: string;
  price: [number, number];
  rooms: string;
  [key: string]: any;
}

const defaultFilters: PropertyFilters = {
  city: '',
  type: '',
  price: [0, 1000000],
  rooms: ''
};

export function usePropertyFilters() {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<PropertyFilters>(defaultFilters);

  // Restore from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restored: PropertyFilters = {
      city: params.get('city') || '',
      type: params.get('type') || '',
      price: [
        params.get('minPrice') ? Number(params.get('minPrice')) : 0,
        params.get('maxPrice') ? Number(params.get('maxPrice')) : 1000000
      ],
      rooms: params.get('rooms') || ''
    };
    const neighborhood = params.get('neighborhood');
    if (neighborhood) restored.neighborhood = neighborhood;
    setFilters(restored);
    setDebouncedFilters(restored);
  }, []);

  // Debounce apply & sync with URL
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
      const params = new URLSearchParams();
      if (filters.city) params.set('city', filters.city);
      if (filters.type) params.set('type', filters.type);
      if (filters.price[0]) params.set('minPrice', String(filters.price[0]));
      if (filters.price[1] !== 1000000) params.set('maxPrice', String(filters.price[1]));
      if (filters.rooms) params.set('rooms', filters.rooms);
      if (filters.neighborhood) params.set('neighborhood', filters.neighborhood);
      const url = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', url);
    }, 400);

    return () => clearTimeout(handler);
  }, [filters]);

  const setFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return { filters, debouncedFilters, setFilter, clearFilters };
}

export default usePropertyFilters;

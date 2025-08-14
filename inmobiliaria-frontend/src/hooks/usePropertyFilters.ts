import { useEffect, useState } from 'react';

export interface PropertyFilters {
  city: string;
  type: string;
  minPrice: string | number;
  maxPrice: string | number;
}

const defaultFilters: PropertyFilters = {
  city: '',
  type: '',
  minPrice: '',
  maxPrice: ''
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
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : '',
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : ''
    };
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
      if (filters.minPrice !== '') params.set('minPrice', String(filters.minPrice));
      if (filters.maxPrice !== '') params.set('maxPrice', String(filters.maxPrice));
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

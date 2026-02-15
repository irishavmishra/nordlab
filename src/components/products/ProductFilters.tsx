'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Search, X, Filter } from 'lucide-react';

export interface ProductFilterValues {
  search: string;
  categoryId: string;
  sortBy: 'name' | 'price' | 'sku';
  sortOrder: 'asc' | 'desc';
  isActive?: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  values: ProductFilterValues;
  onChange: (values: Partial<ProductFilterValues>) => void;
  showActiveToggle?: boolean;
}

export function ProductFilters({
  categories,
  values,
  onChange,
  showActiveToggle = false,
}: ProductFiltersProps) {
  const [localSearch, setLocalSearch] = useState(values.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ search: localSearch });
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    onChange({
      search: '',
      categoryId: '',
      sortBy: 'name',
      sortOrder: 'asc',
      isActive: showActiveToggle ? true : undefined,
    });
  };

  const hasActiveFilters =
    values.search ||
    values.categoryId ||
    values.sortBy !== 'name' ||
    values.sortOrder !== 'asc';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20"
            />
          </div>
        </form>

        <Select
          value={values.categoryId || 'all'}
          onValueChange={(value) => onChange({ categoryId: value === 'all' ? '' : value })}
          placeholder="All Categories"
          className="sm:w-48"
        >
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          value={`${values.sortBy}-${values.sortOrder}`}
          onValueChange={(value) => {
            const [sortBy, sortOrder] = value.split('-') as [
              'name' | 'price' | 'sku',
              'asc' | 'desc'
            ];
            onChange({ sortBy, sortOrder });
          }}
          className="sm:w-40"
        >
          <SelectItem value="name-asc">Name A-Z</SelectItem>
          <SelectItem value="name-desc">Name Z-A</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="sku-asc">SKU A-Z</SelectItem>
          <SelectItem value="sku-desc">SKU Z-A</SelectItem>
        </Select>

        {showActiveToggle && (
          <Select
            value={values.isActive === undefined ? 'all' : values.isActive ? 'true' : 'false'}
            onValueChange={(value) =>
              onChange({ isActive: value === 'all' ? undefined : value === 'true' })
            }
            placeholder="Status"
            className="sm:w-32"
          >
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </Select>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-warm-gray" />
          <span className="text-sm text-warm-gray">Filters active</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClearFilters}
            leftIcon={<X className="w-3 h-3" />}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

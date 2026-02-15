'use client'

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductFilters, ProductFilterValues } from '@/components/products/ProductFilters';

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersClientProps {
  categories: Category[];
  initialFilters: Omit<ProductFilterValues, 'isActive'>;
  totalPages: number;
  currentPage: number;
  total: number;
}

export function ProductFiltersClient({
  categories,
  initialFilters,
  totalPages,
  currentPage,
  total,
}: ProductFiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useState<ProductFilterValues>({
    ...initialFilters,
    isActive: true,
  });

  const updateFilters = (newValues: Partial<ProductFilterValues>) => {
    const updated = { ...filters, ...newValues };
    setFilters(updated);

    const params = new URLSearchParams();
    if (updated.search) params.set('search', updated.search);
    if (updated.categoryId) params.set('category', updated.categoryId);
    if (updated.sortBy) params.set('sortBy', updated.sortBy);
    if (updated.sortOrder) params.set('sortOrder', updated.sortOrder);
    params.set('page', '1');

    startTransition(() => {
      router.push(`/app/products?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <ProductFilters
        categories={categories}
        values={filters}
        onChange={updateFilters}
      />
      <div className="flex items-center justify-between text-sm text-warm-gray">
        <span>
          Showing {total} product{total !== 1 ? 's' : ''}
        </span>
        {isPending && <span className="text-copper">Updating...</span>}
      </div>
    </div>
  );
}
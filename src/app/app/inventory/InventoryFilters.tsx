'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/Select';
import { useCallback } from 'react';

interface InventoryFiltersProps {
  currentStatus?: 'in-stock' | 'low-stock' | 'out-of-stock';
  currentSearch?: string;
}

export function InventoryFilters({ currentStatus, currentSearch }: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`/app/inventory?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search by SKU or product name..."
          defaultValue={currentSearch || ''}
          onChange={(e) => {
            const value = e.target.value;
            const timeout = setTimeout(() => {
              updateFilters('search', value || undefined);
            }, 300);
            return () => clearTimeout(timeout);
          }}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          value={currentStatus || 'all'}
          onValueChange={(value) => updateFilters('status', value)}
          placeholder="Filter by status"
        >
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="in-stock">In Stock</SelectItem>
          <SelectItem value="low-stock">Low Stock</SelectItem>
          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
        </Select>
      </div>
    </div>
  );
}
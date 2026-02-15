'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/Select';
import { useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
}

interface MovementFiltersProps {
  products: Product[];
  currentType?: string;
  currentProductId?: string;
  currentStartDate?: string;
  currentEndDate?: string;
}

export function MovementFilters({
  products,
  currentType,
  currentProductId,
  currentStartDate,
  currentEndDate,
}: MovementFiltersProps) {
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

      router.push(`/app/inventory/movements?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="w-full">
        <Select
          value={currentType || 'all'}
          onValueChange={(value) => updateFilters('type', value)}
          placeholder="Movement Type"
        >
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="purchase">Purchase</SelectItem>
          <SelectItem value="sale">Sale</SelectItem>
          <SelectItem value="adjustment">Adjustment</SelectItem>
          <SelectItem value="transfer">Transfer</SelectItem>
        </Select>
      </div>

      <div className="w-full">
        <Select
          value={currentProductId || 'all'}
          onValueChange={(value) => updateFilters('productId', value)}
          placeholder="Product"
        >
          <SelectItem value="all">All Products</SelectItem>
          {products.map((product) => (
            <SelectItem key={product.id} value={product.id}>
              {product.name} ({product.sku})
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input
          type="date"
          defaultValue={currentStartDate || ''}
          onChange={(e) => updateFilters('startDate', e.target.value || undefined)}
          placeholder="Start Date"
        />
      </div>

      <div>
        <Input
          type="date"
          defaultValue={currentEndDate || ''}
          onChange={(e) => updateFilters('endDate', e.target.value || undefined)}
          placeholder="End Date"
        />
      </div>
    </div>
  );
}
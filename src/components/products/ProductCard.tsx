'use client'

import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Package, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProductCardData {
  id: string;
  sku: string;
  name: string;
  price: string;
  inventory?: {
    quantityOnHand: number;
    quantityReserved: number;
  } | null;
}

interface ProductCardProps {
  product: ProductCardData;
  onAddToCart?: (productId: string) => void;
  onCardClick?: (productId: string) => void;
  addingToCart?: boolean;
}

export function getStockStatus(inventory: ProductCardData['inventory']): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  label: string;
  available: number;
} {
  if (!inventory) {
    return { status: 'out-of-stock', label: 'Stock unknown', available: 0 };
  }

  const available = inventory.quantityOnHand - inventory.quantityReserved;

  if (available <= 0) {
    return { status: 'out-of-stock', label: 'Out of stock', available: 0 };
  }

  if (available <= 10) {
    return { status: 'low-stock', label: `Only ${available} left`, available };
  }

  return { status: 'in-stock', label: 'In stock', available };
}

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numPrice);
}

const statusStyles = {
  'in-stock': 'text-emerald-400',
  'low-stock': 'text-amber-400',
  'out-of-stock': 'text-red-400',
};

export function ProductCard({
  product,
  onAddToCart,
  onCardClick,
  addingToCart = false,
}: ProductCardProps) {
  const stockInfo = getStockStatus(product.inventory);

  const handleCardClick = () => {
    onCardClick?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer',
        stockInfo.status === 'out-of-stock' && 'opacity-60'
      )}
    >
      <div onClick={handleCardClick} className="block">
        <div className="relative aspect-square bg-graphite flex items-center justify-center overflow-hidden">
          <Package className="w-16 h-16 text-slate-mid group-hover:text-copper transition-colors" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-obsidian/80 text-xs text-warm-gray font-mono rounded">
              {product.sku}
            </span>
          </div>
        </div>
        <CardBody className="p-4">
          <h3 className="text-cream font-medium text-sm truncate group-hover:text-copper transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-semibold text-copper">
              {formatPrice(product.price)}
            </span>
            <span className={cn('text-xs', statusStyles[stockInfo.status])}>
              {stockInfo.label}
            </span>
          </div>
        </CardBody>
      </div>
      <div className="px-4 pb-4">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleAddToCart}
          disabled={stockInfo.status === 'out-of-stock' || addingToCart}
          loading={addingToCart}
          leftIcon={<ShoppingCart className="w-4 h-4" />}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
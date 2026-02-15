'use client'

import { useState } from 'react';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CartItemProps {
  id: string;
  product: {
    id: string;
    sku: string;
    name: string;
    price: string;
    description: string | null;
  } | null;
  quantity: number;
  inventory?: {
    quantityOnHand: number;
    quantityReserved: number;
  } | null;
  onQuantityChange: (id: string, quantity: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function CartItem({
  id,
  product,
  quantity,
  inventory,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  if (!product) return null;

  const unitPrice = parseFloat(product.price);
  const lineTotal = unitPrice * quantity;
  const availableStock = inventory ? inventory.quantityOnHand - inventory.quantityReserved : null;
  const isLowStock = availableStock !== null && availableStock <= quantity;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    setLocalQuantity(newQuantity);
    try {
      await onQuantityChange(id, newQuantity);
    } catch {
      setLocalQuantity(quantity);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      await onRemove(id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-charcoal border border-slate-dark rounded-lg">
      <div className="w-16 h-16 bg-graphite rounded flex items-center justify-center flex-shrink-0">
        <div className="w-10 h-10 bg-slate-mid/30 rounded" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-cream font-medium truncate">{product.name}</h3>
        <p className="text-warm-gray text-sm">SKU: {product.sku}</p>
        {isLowStock && (
          <p className="text-yellow-400 text-xs mt-1">Low stock - only {availableStock} available</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(localQuantity - 1)}
          disabled={isLoading || localQuantity <= 1}
          className="p-1 rounded bg-graphite border border-slate-dark hover:border-copper disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4 text-cream" />
        </button>
        <input
          type="number"
          value={localQuantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) {
              setLocalQuantity(val);
            }
          }}
          onBlur={() => {
            if (localQuantity !== quantity) {
              handleQuantityChange(localQuantity);
            }
          }}
          className="w-16 px-2 py-1 text-center bg-obsidian border border-slate-dark rounded text-cream text-sm focus:border-copper focus:outline-none"
        />
        <button
          onClick={() => handleQuantityChange(localQuantity + 1)}
          disabled={isLoading}
          className="p-1 rounded bg-graphite border border-slate-dark hover:border-copper disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4 text-cream" />
        </button>
      </div>

      <div className="text-right min-w-[80px]">
        <p className="text-warm-gray text-sm">${unitPrice.toFixed(2)} each</p>
        <p className="text-cream font-medium">${lineTotal.toFixed(2)}</p>
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={handleRemove}
        disabled={isLoading}
        className="!p-2"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </Button>
    </div>
  );
}
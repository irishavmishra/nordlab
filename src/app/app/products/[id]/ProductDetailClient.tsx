'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getStockStatus, formatPrice } from '@/components/products/ProductCard';
import { Package, Minus, Plus, ShoppingCart, ArrowLeft, Edit } from 'lucide-react';
import { ProductWithInventory } from '@/actions/products';
import { cn } from '@/lib/utils';

interface ProductDetailClientProps {
  product: ProductWithInventory;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const stockInfo = getStockStatus(product.inventory);
  const maxQuantity = stockInfo.available;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAddingToCart(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/app/products')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Products
        </Button>
        <a
          href={`/app/products/${product.id}/edit`}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-warm-gray hover:text-copper transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-graphite rounded-lg flex items-center justify-center overflow-hidden">
          <Package className="w-32 h-32 text-slate-mid" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-obsidian text-warm-gray text-sm font-mono rounded">
                {product.sku}
              </span>
              {product.category && (
                <span className="text-sm text-warm-gray">
                  {product.category.name}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-light text-cream serif-display">
              {product.name}
            </h1>
          </div>

          {product.description && (
            <p className="text-warm-gray leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-copper">
              {formatPrice(product.price)}
            </span>
            {product.cost && (
              <span className="text-sm text-warm-gray">
                Cost: {formatPrice(product.cost)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <StatusBadge type="inventory" status={stockInfo.status} />
            {stockInfo.status !== 'out-of-stock' && (
              <span className="text-sm text-warm-gray">
                {stockInfo.available} available
              </span>
            )}
          </div>

          <div className="border-t border-slate-dark pt-6">
            <label className="block text-sm font-medium text-warm-gray mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-dark rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 text-warm-gray hover:text-copper disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(maxQuantity, Math.max(1, parseInt(e.target.value) || 1))
                    )
                  }
                  className="w-16 text-center bg-transparent text-cream border-x border-slate-dark py-2"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= maxQuantity}
                  className="p-2 text-warm-gray hover:text-copper disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={stockInfo.status === 'out-of-stock'}
                loading={addingToCart}
                leftIcon={<ShoppingCart className="w-5 h-5" />}
                className="flex-1"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="text-xs text-warm-gray/60 space-y-1">
            <p>Product ID: {product.id}</p>
            <p>
              Last updated:{' '}
              {new Date(product.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
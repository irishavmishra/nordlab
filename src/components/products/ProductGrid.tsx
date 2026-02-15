import { Package } from 'lucide-react';
import Link from 'next/link';
import { ProductCard, ProductCardData } from './ProductCard';

interface ProductGridProps {
  products: ProductCardData[];
  onAddToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  addingToCartId?: string | null;
}

export function ProductGrid({
  products,
  onAddToCart,
  onProductClick,
  addingToCartId,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-charcoal mb-6">
          <Package className="w-8 h-8 text-warm-gray" />
        </div>
        <h3 className="text-xl font-light text-cream serif-display mb-2">No products yet</h3>
        <p className="text-warm-gray mb-6 max-w-md mx-auto">
          Get started by adding your first product to the catalog. Your dealers will be able to browse and order from here.
        </p>
        <Link
          href="/app/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-copper to-copper-dark text-obsidian text-sm font-medium rounded shadow-[0_4px_24px_-4px_rgba(201,145,90,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(201,145,90,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <Package className="w-4 h-4" />
          Add Your First Product
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onCardClick={onProductClick}
          addingToCart={addingToCartId === product.id}
        />
      ))}
    </div>
  );
}

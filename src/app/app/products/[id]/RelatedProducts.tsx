import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductWithInventory } from '@/actions/products';

interface RelatedProductsProps {
  products: ProductWithInventory[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const mappedProducts = products.map((p) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    price: p.price,
    inventory: p.inventory
      ? {
          quantityOnHand: p.inventory.quantityOnHand,
          quantityReserved: p.inventory.quantityReserved,
        }
      : null,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light text-cream serif-display">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mappedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/app/products/${product.id}`}
            className="block"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
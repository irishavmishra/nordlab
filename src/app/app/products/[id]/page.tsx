import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getProductById, getRelatedProducts } from '@/actions/products';
import { redirect, notFound } from 'next/navigation';
import { ProductDetailClient } from './ProductDetailClient';
import { RelatedProducts } from './RelatedProducts';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const user = session?.user as SessionUser | undefined;
  if (!user) {
    redirect('/login');
  }

  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId })
    .from(schema.users)
    .where(eq(schema.users.id, user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  const organizationId = dbUser.organizationId;
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(id, product.categoryId, organizationId, 4);

  return (
    <div className="space-y-8">
      <ProductDetailClient product={product} />
      
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
}

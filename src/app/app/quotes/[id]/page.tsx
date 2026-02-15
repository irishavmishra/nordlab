import { Suspense } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getQuoteById } from '@/actions/quotes';
import { notFound, redirect } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import QuoteItemsTable from '@/components/quotes/QuoteItemsTable';
import QuoteActions from '@/components/quotes/QuoteActions';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuoteDetailPage({ params }: PageProps) {
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

  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const total = parseFloat(quote.total);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/app/quotes"
            className="p-2 text-warm-gray hover:text-cream transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-cream">{quote.quoteNumber}</h1>
              <StatusBadge type="quote" status={quote.status} />
            </div>
            <p className="text-warm-gray mt-1">
              {quote.organization?.name ?? 'Unknown Customer'}
            </p>
          </div>
        </div>
        <QuoteActions quote={quote} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-cream">Quote Items</h2>
            </CardHeader>
            <CardBody>
              <QuoteItemsTable items={quote.items ?? []} />
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-cream">Quote Details</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">
                  Created
                </p>
                <p className="text-cream">
                  {format(new Date(quote.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">
                  Valid Until
                </p>
                <p className="text-cream">
                  {quote.validUntil
                    ? format(new Date(quote.validUntil), 'MMMM d, yyyy')
                    : 'No expiration'}
                </p>
              </div>
              <div>
                <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">
                  Distributor
                </p>
                <p className="text-cream">{quote.distributor?.name ?? '-'}</p>
              </div>
              {quote.notes && (
                <div>
                  <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">
                    Notes
                  </p>
                  <p className="text-cream text-sm whitespace-pre-wrap">{quote.notes}</p>
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span className="text-cream">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Tax</span>
                  <span className="text-cream">$0.00</span>
                </div>
                <div className="border-t border-slate-dark pt-3">
                  <div className="flex justify-between">
                    <span className="text-cream font-medium">Total</span>
                    <span className="text-copper font-semibold text-lg">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {quote.status === 'converted' && quote.convertedToOrderId && (
            <Card>
              <CardBody>
                <div className="text-center">
                  <p className="text-warm-gray text-sm mb-3">
                    This quote has been converted to an order
                  </p>
                  <Link
                    href={`/app/orders/${quote.convertedToOrderId}`}
                    className="text-copper hover:text-copper-light transition-colors font-medium"
                  >
                    View Order
                  </Link>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

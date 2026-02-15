import { Suspense } from 'react';
import { getQuotes, QuoteStatus } from '@/actions/quotes';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import QuotesTable from './QuotesTable';

const statusTabs: { label: string; value: QuoteStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Expired', value: 'expired' },
  { label: 'Converted', value: 'converted' },
];

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
}

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}

export default async function QuotesPage({ searchParams }: PageProps) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  const user = session?.user as SessionUser | undefined;
  if (!user) {
    redirect('/login');
  }

  // Check DB directly for organizationId
  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId })
    .from(schema.users)
    .where(eq(schema.users.id, user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  const organizationId = dbUser.organizationId;
  const params = await searchParams;
  const statusParam = params.status || 'all';
  const currentStatus: QuoteStatus | 'all' = statusParam as QuoteStatus | 'all';
  const search = params.search || '';
  const page = parseInt(params.page || '1', 10);

  const { quotes, total } = await getQuotes(
    organizationId,
    currentStatus === 'all' ? { search } : { status: currentStatus as QuoteStatus, search },
    page
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cream">Quotes</h1>
          <p className="text-warm-gray mt-1">Manage your quotes and convert them to orders</p>
        </div>
        <Link href="/app/quotes/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>New Quote</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="border-b-0 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={`/app/quotes?status=${tab.value}${search ? `&search=${search}` : ''}`}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    currentStatus === tab.value
                      ? 'bg-copper text-obsidian font-medium'
                      : 'text-warm-gray hover:text-cream hover:bg-graphite'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
            <form className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search by quote number..."
                defaultValue={search}
                className="w-64 px-4 py-2 pl-10 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 focus:outline-none focus:border-copper"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
            </form>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <Suspense fallback={<div className="text-warm-gray">Loading...</div>}>
            <QuotesTable quotes={quotes} total={total} currentPage={page} />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
}

'use client';

import { QuoteWithItems } from '@/actions/quotes';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Link from 'next/link';
import { Eye, Copy, Trash2, Send } from 'lucide-react';
import { format } from 'date-fns';

interface QuotesTableProps {
  quotes: QuoteWithItems[];
  total: number;
  currentPage: number;
}

export default function QuotesTable({ quotes, total, currentPage }: QuotesTableProps) {
  const columns: Column<QuoteWithItems>[] = [
    {
      key: 'quoteNumber',
      header: 'Quote #',
      sortable: true,
      render: (quote) => (
        <Link
          href={`/app/quotes/${quote.id}`}
          className="text-copper-light hover:text-copper transition-colors font-medium"
        >
          {quote.quoteNumber}
        </Link>
      ),
    },
    {
      key: 'organizationId',
      header: 'Customer',
      render: (quote) => quote.organization?.name ?? '-',
    },
    {
      key: 'createdAt',
      header: 'Date',
      sortable: true,
      render: (quote) => format(new Date(quote.createdAt), 'MMM d, yyyy'),
    },
    {
      key: 'validUntil',
      header: 'Valid Until',
      render: (quote) =>
        quote.validUntil ? format(new Date(quote.validUntil), 'MMM d, yyyy') : '-',
    },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (quote) => (
        <span className="font-medium">${parseFloat(quote.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (quote) => <StatusBadge type="quote" status={quote.status} />,
    },
    {
      key: 'id',
      header: 'Actions',
      width: '150px',
      render: (quote) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/app/quotes/${quote.id}`}
            className="p-1.5 text-warm-gray hover:text-cream transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Link>
          {quote.status === 'draft' && (
            <>
              <button
                className="p-1.5 text-warm-gray hover:text-copper transition-colors"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 text-warm-gray hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            className="p-1.5 text-warm-gray hover:text-copper transition-colors"
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={quotes}
      keyExtractor={(quote) => quote.id}
      onRowClick={(quote) => {}}
      emptyMessage="No quotes found"
      pageSize={10}
    />
  );
}
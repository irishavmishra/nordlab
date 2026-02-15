'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { OrdersTable } from '@/components/orders/OrdersTable';
import type { OrderListItem, OrderStatus } from '@/actions/orders';

interface OrdersContentProps {
  initialOrders: OrderListItem[];
  total: number;
  initialStatus?: string;
  initialSearch?: string;
}

const statusTabs: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];

export function OrdersContent({
  initialOrders,
  total,
  initialStatus,
  initialSearch,
}: OrdersContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState(initialStatus || '');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');

  const handleTabChange = (status: string) => {
    setActiveTab(status);
    const params = new URLSearchParams(searchParams.toString());
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    params.delete('page');
    router.push(`/app/orders?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`/app/orders?${params.toString()}`);
  };

  const handleRowClick = (order: OrderListItem) => {
    router.push(`/app/orders/${order.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-cream serif-display">Orders</h1>
          <p className="text-warm-gray text-sm mt-1">{total} total orders</p>
        </div>
        <Button onClick={() => router.push('/app/products')}>
          <Package className="w-4 h-4" />
          New Order
        </Button>
      </div>

      <div className="border-b border-slate-dark">
        <div className="flex gap-1 overflow-x-auto pb-px">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.value
                  ? 'text-copper border-copper'
                  : 'text-warm-gray border-transparent hover:text-cream hover:border-slate-mid'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
          <input
            type="text"
            placeholder="Search by order number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-slate-mid mx-auto mb-4" />
          <p className="text-warm-gray">No orders found</p>
        </div>
      ) : (
        <OrdersTable orders={orders} onRowClick={handleRowClick} />
      )}
    </div>
  );
}
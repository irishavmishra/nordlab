'use client'

import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { OrderListItem, OrderStatus } from '@/actions/orders';

interface OrdersTableProps {
  orders: OrderListItem[];
  onRowClick: (order: OrderListItem) => void;
  loading?: boolean;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

function formatCurrency(amount: string): string {
  return `$${parseFloat(amount).toFixed(2)}`;
}

export function OrdersTable({ orders, onRowClick, loading }: OrdersTableProps) {
  const columns: Column<OrderListItem>[] = [
    {
      key: 'orderNumber',
      header: 'Order #',
      sortable: true,
      render: (order) => (
        <span className="font-medium text-copper">{order.orderNumber}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      sortable: true,
      render: (order) => formatDate(order.createdAt),
    },
    {
      key: 'distributor',
      header: 'Distributor',
      render: (order) => order.distributor?.name || '-',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (order) => (
        <StatusBadge type="order" status={order.status as OrderStatus} />
      ),
    },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (order) => (
        <span className="font-medium">{formatCurrency(order.total)}</span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      keyExtractor={(order) => order.id}
      onRowClick={onRowClick}
      loading={loading}
      emptyMessage="No orders found"
    />
  );
}
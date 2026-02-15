'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, X, Package, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { OrderStatusTimeline } from '@/components/orders/OrderStatusTimeline';
import { cancelOrder, updateOrderStatus, type OrderWithItems, type OrderStatus } from '@/actions/orders';

interface OrderDetailContentProps {
  order: OrderWithItems;
  userId: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function formatCurrency(amount: string): string {
  return `$${parseFloat(amount).toFixed(2)}`;
}

export function OrderDetailContent({ order, userId }: OrderDetailContentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    setIsLoading(true);
    try {
      const result = await cancelOrder(order.id);
      if (result.success) {
        setCurrentStatus('cancelled');
      } else {
        alert(result.error || 'Failed to cancel order');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkReceived = async () => {
    setIsLoading(true);
    try {
      const result = await updateOrderStatus(order.id, 'delivered');
      if (result.success) {
        setCurrentStatus('delivered');
      } else {
        alert(result.error || 'Failed to update order status');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const canCancel = currentStatus !== 'cancelled' && currentStatus !== 'shipped' && currentStatus !== 'delivered';
  const canMarkReceived = currentStatus === 'shipped';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/app/orders')}
          className="!p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-light text-cream serif-display">{order.orderNumber}</h1>
            <StatusBadge type="order" status={currentStatus} />
          </div>
          <p className="text-warm-gray text-sm mt-1">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-cream">Order Status</h2>
        </CardHeader>
        <CardBody>
          <OrderStatusTimeline currentStatus={currentStatus} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-cream">Order Items</h2>
            <span className="text-warm-gray text-sm">{order.items.length} items</span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-slate-dark">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-graphite rounded flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-slate-mid" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-cream font-medium truncate">{item.product?.name || 'Unknown Product'}</p>
                  <p className="text-warm-gray text-sm">SKU: {item.product?.sku || '-'}</p>
                </div>
                <div className="text-right">
                  <p className="text-warm-gray text-sm">Qty: {item.quantity}</p>
                  <p className="text-cream">${formatCurrency(item.unitPrice)} each</p>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-copper font-medium">${formatCurrency(item.totalPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-warm-gray text-sm">Order Total</p>
              {order.notes && <p className="text-warm-gray text-sm mt-1">Notes: {order.notes}</p>}
            </div>
            <p className="text-2xl font-light text-copper">${formatCurrency(order.total)}</p>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-cream">Order Details</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-warm-gray">Order Number</p>
              <p className="text-cream">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-warm-gray">Distributor</p>
              <p className="text-cream">{order.distributor?.name || '-'}</p>
            </div>
            <div>
              <p className="text-warm-gray">Order Date</p>
              <p className="text-cream">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-warm-gray">Last Updated</p>
              <p className="text-cream">{formatDate(order.updatedAt)}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        {canCancel && (
          <Button variant="danger" onClick={handleCancel} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            Cancel Order
          </Button>
        )}
        {canMarkReceived && (
          <Button variant="success" onClick={handleMarkReceived} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Mark as Received
          </Button>
        )}
        <Button variant="secondary" onClick={() => alert('Invoice download coming soon')}>
          <Download className="w-4 h-4" />
          Download Invoice
        </Button>
      </div>
    </div>
  );
}
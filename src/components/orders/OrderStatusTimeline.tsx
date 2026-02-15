'use client'

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/actions/orders';

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
}

const statusSteps: { status: OrderStatus; label: string }[] = [
  { status: 'draft', label: 'Draft' },
  { status: 'pending', label: 'Pending' },
  { status: 'confirmed', label: 'Confirmed' },
  { status: 'processing', label: 'Processing' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' },
];

const statusOrder: OrderStatus[] = ['draft', 'pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
  if (currentStatus === 'cancelled') {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-400 font-medium">Order Cancelled</p>
      </div>
    );
  }

  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === statusSteps.length - 1;

          return (
            <div key={step.status} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                    isCompleted
                      ? 'bg-copper text-obsidian'
                      : 'bg-graphite border border-slate-dark text-warm-gray',
                    isCurrent && 'ring-2 ring-copper ring-offset-2 ring-offset-charcoal'
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium whitespace-nowrap',
                    isCurrent ? 'text-copper' : isCompleted ? 'text-cream' : 'text-warm-gray'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2',
                    index < currentIndex ? 'bg-copper' : 'bg-slate-dark'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
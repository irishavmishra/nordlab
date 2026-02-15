'use client'

import { MovementWithProduct } from '@/actions/inventory';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface MovementHistoryProps {
  movements: MovementWithProduct[];
}

const movementTypeLabels: Record<string, string> = {
  purchase: 'Purchase',
  sale: 'Sale',
  adjustment: 'Adjustment',
  transfer: 'Transfer',
};

export function MovementHistory({ movements }: MovementHistoryProps) {
  if (movements.length === 0) {
    return (
      <div className="text-center py-12 text-warm-gray">
        No movement history found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-dark rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-graphite border-b border-slate-dark">
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Reason
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Reference
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-dark">
          {movements.map((movement) => (
            <tr key={movement.id} className="bg-charcoal hover:bg-graphite transition-colors">
              <td className="px-4 py-3">
                <span className="text-sm text-cream">
                  {new Date(movement.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </td>
              <td className="px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-cream">
                    {movement.productName}
                  </div>
                  <div className="text-xs text-warm-gray font-mono">
                    {movement.sku}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                    movement.type === 'purchase'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : movement.type === 'sale'
                      ? 'bg-blue-500/20 text-blue-400'
                      : movement.type === 'adjustment'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}
                >
                  {movementTypeLabels[movement.type]}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span
                  className={`text-sm font-medium ${
                    movement.quantity >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {movement.quantity >= 0 ? '+' : ''}
                  {movement.quantity}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-warm-gray">
                  {movement.reason || '-'}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-warm-gray font-mono">
                  {movement.referenceId || '-'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

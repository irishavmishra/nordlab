'use client'

import { InventoryItemWithProduct } from '@/actions/inventory';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';

interface InventoryTableProps {
  items: InventoryItemWithProduct[];
  onAdjustStock: (item: InventoryItemWithProduct) => void;
  onViewMovements: (item: InventoryItemWithProduct) => void;
}

export function InventoryTable({
  items,
  onAdjustStock,
  onViewMovements,
}: InventoryTableProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-warm-gray">
        No inventory items found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-dark rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-graphite border-b border-slate-dark">
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              SKU
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              On Hand
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Reserved
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Available
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Reorder Point
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-warm-gray uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-warm-gray uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-dark">
          {items.map((item) => (
            <tr key={item.id} className="bg-charcoal hover:bg-graphite transition-colors">
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-cream">
                  {item.productName}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-warm-gray font-mono">
                  {item.sku}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm text-cream">{item.quantityOnHand}</span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm text-warm-gray">
                  {item.quantityReserved}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span
                  className={`text-sm font-medium ${
                    item.availableQuantity <= 0
                      ? 'text-red-400'
                      : item.availableQuantity <= item.reorderPoint
                      ? 'text-yellow-400'
                      : 'text-cream'
                  }`}
                >
                  {item.availableQuantity}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm text-warm-gray">{item.reorderPoint}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <StatusBadge type="inventory" status={item.status} />
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onAdjustStock(item)}
                  >
                    Adjust
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onViewMovements(item)}
                  >
                    History
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

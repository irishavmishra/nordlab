'use client';

import { QuoteItemWithProduct } from '@/actions/quotes';
import { Pencil, Trash2 } from 'lucide-react';

interface QuoteItemsTableProps {
  items: QuoteItemWithProduct[];
  onUpdateItem?: (itemId: string, quantity: number, unitPrice: string) => void;
  onRemoveItem?: (itemId: string) => void;
  editable?: boolean;
}

export default function QuoteItemsTable({
  items,
  onUpdateItem,
  onRemoveItem,
  editable = false,
}: QuoteItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-warm-gray">
        No items added yet. Add products to create your quote.
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-dark">
            <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Qty
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
              Total
            </th>
            {editable && (
              <th className="px-4 py-3 text-right text-xs font-medium text-warm-gray uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-dark">
          {items.map((item) => (
            <tr key={item.id} className="bg-charcoal">
              <td className="px-4 py-3">
                <div>
                  <p className="text-cream font-medium">
                    {item.product?.name ?? 'Unknown Product'}
                  </p>
                  <p className="text-warm-gray text-xs">
                    {item.product?.sku ?? '-'}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3 text-right text-cream">{item.quantity}</td>
              <td className="px-4 py-3 text-right text-cream">
                ${parseFloat(item.unitPrice).toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right text-copper font-medium">
                ${parseFloat(item.totalPrice).toFixed(2)}
              </td>
              {editable && (
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onUpdateItem && (
                      <button
                        onClick={() => {}}
                        className="p-1.5 text-warm-gray hover:text-copper transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                    {onRemoveItem && (
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-warm-gray hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-slate-dark bg-graphite/30">
            <td colSpan={editable ? 4 : 3} className="px-4 py-3 text-right text-warm-gray font-medium">
              Subtotal
            </td>
            <td className="px-4 py-3 text-right text-copper font-semibold text-lg">
              ${total.toFixed(2)}
            </td>
            {editable && <td></td>}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
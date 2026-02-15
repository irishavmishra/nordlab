'use client'

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectItem } from '@/components/ui/Select';
import { InventoryItemWithProduct, adjustInventory } from '@/actions/inventory';

interface StockAdjustmentModalProps {
  item: InventoryItemWithProduct | null;
  organizationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

type AdjustmentType = 'add' | 'remove' | 'set';

export function StockAdjustmentModal({
  item,
  organizationId,
  open,
  onOpenChange,
  onSuccess,
}: StockAdjustmentModalProps) {
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('add');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (!reason.trim()) {
      setError('Please provide a reason for the adjustment');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await adjustInventory(item.productId, organizationId, qty, reason.trim(), adjustmentType);
      onSuccess();
      onOpenChange(false);
      setQuantity('');
      setReason('');
      setAdjustmentType('add');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to adjust inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setQuantity('');
    setReason('');
    setAdjustmentType('add');
    setError(null);
  };

  if (!item) return null;

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Adjust Stock"
      description={`Adjusting inventory for ${item.productName} (${item.sku})`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-graphite/50 rounded-lg border border-slate-dark">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-warm-gray uppercase tracking-wide">On Hand</p>
              <p className="text-xl font-light text-cream mt-1">{item.quantityOnHand}</p>
            </div>
            <div>
              <p className="text-xs text-warm-gray uppercase tracking-wide">Reserved</p>
              <p className="text-xl font-light text-cream mt-1">{item.quantityReserved}</p>
            </div>
            <div>
              <p className="text-xs text-warm-gray uppercase tracking-wide">Available</p>
              <p className="text-xl font-light text-cream mt-1">{item.availableQuantity}</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-gray mb-2">
            Adjustment Type
          </label>
          <Select
            value={adjustmentType}
            onValueChange={(value) => setAdjustmentType(value as AdjustmentType)}
          >
            <SelectItem value="add">Add to Stock</SelectItem>
            <SelectItem value="remove">Remove from Stock</SelectItem>
            <SelectItem value="set">Set Stock Level</SelectItem>
          </Select>
        </div>

        <Input
          label="Quantity"
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />

        <div>
          <label className="block text-sm font-medium text-warm-gray mb-2">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for adjustment"
            rows={3}
            className="w-full px-4 py-2.5 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 transition-all duration-300 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20 resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Apply Adjustment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

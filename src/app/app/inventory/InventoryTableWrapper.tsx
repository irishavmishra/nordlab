'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InventoryItemWithProduct } from '@/actions/inventory';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { StockAdjustmentModal } from '@/components/inventory/StockAdjustmentModal';

interface InventoryTableWrapperProps {
  initialInventory: InventoryItemWithProduct[];
  organizationId: string;
}

export function InventoryTableWrapper({
  initialInventory,
  organizationId,
}: InventoryTableWrapperProps) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<InventoryItemWithProduct | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdjustStock = (item: InventoryItemWithProduct) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleViewMovements = (item: InventoryItemWithProduct) => {
    router.push(`/app/inventory/movements?productId=${item.productId}`);
  };

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <>
      <InventoryTable
        items={initialInventory}
        onAdjustStock={handleAdjustStock}
        onViewMovements={handleViewMovements}
      />

      <StockAdjustmentModal
        item={selectedItem}
        organizationId={organizationId}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={handleSuccess}
      />
    </>
  );
}
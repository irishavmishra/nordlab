'use client'

import { MovementHistory } from '@/components/inventory/MovementHistory';
import { MovementWithProduct } from '@/actions/inventory';

interface MovementHistoryWrapperProps {
  initialMovements: MovementWithProduct[];
}

export function MovementHistoryWrapper({ initialMovements }: MovementHistoryWrapperProps) {
  return <MovementHistory movements={initialMovements} />;
}
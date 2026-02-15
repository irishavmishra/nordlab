import React from "react";
import { cn } from "@/lib/utils";

export type OrderStatus = "draft" | "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired" | "converted";
export type InventoryStatus = "in-stock" | "low-stock" | "out-of-stock";

export type StatusType = "order" | "quote" | "inventory";

interface StatusConfig {
  label: string;
  className: string;
}

export interface StatusBadgeProps {
  type: StatusType;
  status: OrderStatus | QuoteStatus | InventoryStatus;
  className?: string;
}

const orderStatusConfig: Record<OrderStatus, StatusConfig> = {
  draft: { label: "Draft", className: "bg-slate-mid/30 text-warm-gray" },
  pending: { label: "Pending", className: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "Confirmed", className: "bg-blue-500/20 text-blue-400" },
  processing: { label: "Processing", className: "bg-purple-500/20 text-purple-400" },
  shipped: { label: "Shipped", className: "bg-cyan-500/20 text-cyan-400" },
  delivered: { label: "Delivered", className: "bg-emerald-500/20 text-emerald-400" },
  cancelled: { label: "Cancelled", className: "bg-red-500/20 text-red-400" },
};

const quoteStatusConfig: Record<QuoteStatus, StatusConfig> = {
  draft: { label: "Draft", className: "bg-slate-mid/30 text-warm-gray" },
  sent: { label: "Sent", className: "bg-blue-500/20 text-blue-400" },
  accepted: { label: "Accepted", className: "bg-emerald-500/20 text-emerald-400" },
  rejected: { label: "Rejected", className: "bg-red-500/20 text-red-400" },
  expired: { label: "Expired", className: "bg-orange-500/20 text-orange-400" },
  converted: { label: "Converted", className: "bg-copper/20 text-copper-light" },
};

const inventoryStatusConfig: Record<InventoryStatus, StatusConfig> = {
  "in-stock": { label: "In Stock", className: "bg-emerald-500/20 text-emerald-400" },
  "low-stock": { label: "Low Stock", className: "bg-yellow-500/20 text-yellow-400" },
  "out-of-stock": { label: "Out of Stock", className: "bg-red-500/20 text-red-400" },
};

const statusConfigMap: Record<StatusType, Record<string, StatusConfig>> = {
  order: orderStatusConfig,
  quote: quoteStatusConfig,
  inventory: inventoryStatusConfig,
};

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  const config = statusConfigMap[type][status];

  if (!config) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

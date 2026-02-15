import { Package, AlertTriangle, XCircle, DollarSign } from "lucide-react";

interface InventoryStatsProps {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalValue: number;
}

export function InventoryStats({
  totalProducts,
  lowStockCount,
  outOfStockCount,
  totalValue,
}: InventoryStatsProps) {
  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      iconBg: "bg-graphite",
      iconColor: "text-copper",
    },
    {
      label: "Low Stock Items",
      value: lowStockCount,
      icon: AlertTriangle,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      highlight: lowStockCount > 0,
    },
    {
      label: "Out of Stock",
      value: outOfStockCount,
      icon: XCircle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      highlight: outOfStockCount > 0,
    },
    {
      label: "Total Value",
      value: `$${totalValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="card-dark p-5 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-2 rounded-md ${stat.iconBg} border border-slate-dark`}
              >
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-light text-cream">{stat.value}</p>
              <p className="text-sm text-warm-gray mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
            {stat.highlight && (
              <p className="text-xs text-copper mt-3">Action needed</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

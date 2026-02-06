import { useState } from 'react';

const tabs = [
  { id: 'storefront', label: 'Digital Storefront' },
  { id: 'dealer', label: 'Dealer Portal' },
  { id: 'quoting', label: 'Quoting System' },
  { id: 'inventory', label: 'Inventory Dashboard' },
  { id: 'operations', label: 'Sales Operations' },
];

// Product image component using CSS visuals
function ProductVisual({ type, colorScheme }: { type: 'base-cabinet' | 'wall-cabinet' | 'tall-cabinet' | 'countertop' | 'hardware' | 'accessory'; colorScheme: 'white' | 'grey' | 'oak' | 'stone' | 'metal' }) {
  const bgColors: Record<string, string> = {
    white: 'from-[#e8e4df] via-[#d9d4cd] to-[#cec8bf]',
    grey: 'from-[#8a8d94] via-[#7a7d84] to-[#6d7078]',
    oak: 'from-[#b5885a] via-[#a37a4f] to-[#8f6b42]',
    stone: 'from-[#c4bfb8] via-[#b8b2aa] to-[#a9a299]',
    metal: 'from-[#9ca0a8] via-[#8c9098] to-[#7c8088]',
  };
  const shapeMap: Record<string, React.ReactNode> = {
    'base-cabinet': (
      <div className="relative w-12 h-10">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${bgColors[colorScheme]} shadow-md`} />
        <div className="absolute left-1/2 top-3 -translate-x-1/2 w-5 h-[2px] rounded-full bg-black/15" />
        <div className="absolute left-1/2 top-[22px] -translate-x-1/2 w-5 h-[2px] rounded-full bg-black/15" />
        <div className="absolute bottom-0 left-1 w-1.5 h-1 rounded-b-sm bg-black/10" />
        <div className="absolute bottom-0 right-1 w-1.5 h-1 rounded-b-sm bg-black/10" />
      </div>
    ),
    'wall-cabinet': (
      <div className="relative w-11 h-9">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${bgColors[colorScheme]} shadow-md`} />
        <div className="absolute left-[48%] top-1 bottom-1 w-[1px] bg-black/10" />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-black/15" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-black/15" />
      </div>
    ),
    'tall-cabinet': (
      <div className="relative w-7 h-12">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${bgColors[colorScheme]} shadow-md`} />
        <div className="absolute left-1/2 -translate-x-1/2 top-[30%] w-3 h-[2px] rounded-full bg-black/15" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[50%] w-full h-[1px] bg-black/10" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[70%] w-3 h-[2px] rounded-full bg-black/15" />
      </div>
    ),
    'countertop': (
      <div className="relative w-14 h-5">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-r ${bgColors[colorScheme]} shadow-md`} />
        <div className="absolute inset-0 rounded-sm opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 60% 30%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
        <div className="absolute bottom-0 left-3 right-3 h-5 bg-black/5 rounded-t-sm -z-10 translate-y-2" />
      </div>
    ),
    'hardware': (
      <div className="relative w-8 h-8">
        <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${bgColors[colorScheme]} shadow-md`} />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
      </div>
    ),
    'accessory': (
      <div className="relative w-10 h-6">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-r ${bgColors[colorScheme]} shadow-md`} />
        <div className="absolute top-1 left-1 right-1 bottom-1 rounded-sm border border-black/10" />
      </div>
    ),
  };
  return (
    <div className="w-full h-14 bg-gradient-to-b from-[#1e2028] to-[#1a1c24] rounded mb-2.5 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,145,90,0.5) 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />
      {shapeMap[type]}
    </div>
  );
}

// Compact version for category browsing (no wrapper bg)
function ProductVisualCompact({ type, colorScheme }: { type: 'base-cabinet' | 'wall-cabinet' | 'tall-cabinet' | 'countertop'; colorScheme: 'white' | 'grey' | 'oak' | 'stone' }) {
  const bgColors: Record<string, string> = {
    white: 'from-[#e8e4df] via-[#d9d4cd] to-[#cec8bf]',
    grey: 'from-[#8a8d94] via-[#7a7d84] to-[#6d7078]',
    oak: 'from-[#b5885a] via-[#a37a4f] to-[#8f6b42]',
    stone: 'from-[#c4bfb8] via-[#b8b2aa] to-[#a9a299]',
  };
  const shapes: Record<string, React.ReactNode> = {
    'base-cabinet': (
      <div className="relative w-14 h-11">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${bgColors[colorScheme]} shadow-lg`} />
        <div className="absolute left-1/2 -translate-x-1/2 top-3 w-6 h-[2px] rounded-full bg-black/12" />
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-6 h-[2px] rounded-full bg-black/12" />
        <div className="absolute bottom-0 left-1.5 w-2 h-1 rounded-b-sm bg-black/8" />
        <div className="absolute bottom-0 right-1.5 w-2 h-1 rounded-b-sm bg-black/8" />
      </div>
    ),
    'wall-cabinet': (
      <div className="relative w-13 h-10">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${bgColors[colorScheme]} shadow-lg`} style={{ width: '3.25rem' }} />
        <div className="absolute left-[48%] top-1.5 bottom-1.5 w-[1px] bg-black/8" />
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/12" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/12" />
      </div>
    ),
    'tall-cabinet': (
      <div className="relative w-8 h-12">
        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${bgColors[colorScheme]} shadow-lg`} />
        <div className="absolute left-1/2 -translate-x-1/2 top-[25%] w-4 h-[2px] rounded-full bg-black/12" />
        <div className="absolute left-0 right-0 top-[45%] h-[1px] bg-black/8" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[65%] w-4 h-[2px] rounded-full bg-black/12" />
      </div>
    ),
    'countertop': (
      <div className="relative w-16 h-7">
        <div className={`absolute top-0 left-0 right-0 h-4 rounded-sm bg-gradient-to-r ${bgColors[colorScheme]} shadow-lg`} style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 60% 30%, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
        <div className="absolute bottom-0 left-2 right-2 h-4 bg-[#444]/50 rounded-b-sm" />
      </div>
    ),
  };
  return <>{shapes[type]}</>;
}

function DealerPortalDashboard() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden border border-warm-gray/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161820] border-b border-warm-gray/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[#0f1117] rounded-md px-4 py-1.5 text-[11px] text-warm-gray/40 text-center max-w-md mx-auto">
            portal.nordlab.app/dealer/midwest-kitchen-supply
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-44 bg-[#161820] border-r border-warm-gray/8 py-4 px-3 hidden md:block">
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-7 h-7 rounded bg-copper/20 flex items-center justify-center text-copper text-[10px] font-bold">MK</div>
            <div>
              <div className="text-cream text-[11px] font-medium">Midwest Kitchen</div>
              <div className="text-warm-gray/40 text-[9px]">Dealer Account</div>
            </div>
          </div>
          <nav className="space-y-0.5">
            {[
              { label: 'Dashboard', active: false, icon: '▦' },
              { label: 'Product Catalog', active: true, icon: '◫' },
              { label: 'My Orders', active: false, icon: '☰' },
              { label: 'Quotes', active: false, icon: '◧' },
              { label: 'Invoices', active: false, icon: '▤' },
              { label: 'Support', active: false, icon: '◉' },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-2.5 py-2 rounded text-[11px] ${
                  item.active
                    ? 'bg-copper/10 text-copper'
                    : 'text-warm-gray/40 hover:text-warm-gray/60'
                }`}
              >
                <span className="text-[10px]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-5">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-cream text-sm font-medium">Product Catalog</h3>
              <p className="text-warm-gray/40 text-[11px] mt-0.5">3,247 products - Your pricing applied</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#161820] border border-warm-gray/8 rounded-md px-3 py-1.5 text-[11px] text-warm-gray/40 w-40 hidden sm:block">
                Search products...
              </div>
              <div className="bg-copper/15 text-copper text-[11px] px-3 py-1.5 rounded-md font-medium">
                Cart (3)
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {['All Products', 'Cabinets', 'Countertops', 'Hardware', 'Accessories'].map((cat, i) => (
              <div
                key={cat}
                className={`px-3 py-1.5 rounded-md text-[11px] whitespace-nowrap ${
                  i === 1
                    ? 'bg-copper/15 text-copper'
                    : 'bg-[#161820] text-warm-gray/40 border border-warm-gray/8'
                }`}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'Shaker White 36" Base', sku: 'SW-B36', price: '$342.00', dealer: '$273.60', stock: 'In Stock', stockColor: 'text-green-400/80', imgType: 'base-cabinet' as const, imgColor: 'white' as const },
              { name: 'Shaker White 30" Wall', sku: 'SW-W30', price: '$218.00', dealer: '$174.40', stock: 'In Stock', stockColor: 'text-green-400/80', imgType: 'wall-cabinet' as const, imgColor: 'white' as const },
              { name: 'Modern Grey 24" Base', sku: 'MG-B24', price: '$298.00', dealer: '$238.40', stock: 'Low Stock', stockColor: 'text-yellow-400/80', imgType: 'base-cabinet' as const, imgColor: 'grey' as const },
              { name: 'Shaker White 42" Tall', sku: 'SW-T42', price: '$485.00', dealer: '$388.00', stock: 'In Stock', stockColor: 'text-green-400/80', imgType: 'tall-cabinet' as const, imgColor: 'white' as const },
              { name: 'Heritage Oak 36" Base', sku: 'HO-B36', price: '$412.00', dealer: '$329.60', stock: 'In Stock', stockColor: 'text-green-400/80', imgType: 'base-cabinet' as const, imgColor: 'oak' as const },
              { name: 'Modern Grey 18" Wall', sku: 'MG-W18', price: '$168.00', dealer: '$134.40', stock: 'Out of Stock', stockColor: 'text-red-400/70', imgType: 'wall-cabinet' as const, imgColor: 'grey' as const },
            ].map((product) => (
              <div key={product.sku} className="bg-[#161820] border border-warm-gray/6 rounded-md p-3 hover:border-copper/20 transition-colors">
                <ProductVisual type={product.imgType} colorScheme={product.imgColor} />
                <div className="text-cream text-[11px] font-medium leading-tight">{product.name}</div>
                <div className="text-warm-gray/30 text-[9px] mt-1">SKU: {product.sku}</div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-warm-gray/30 text-[9px] line-through mr-1.5">{product.price}</span>
                    <span className="text-copper text-[12px] font-semibold">{product.dealer}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[9px] ${product.stockColor}`}>{product.stock}</span>
                  <div className="bg-copper/10 text-copper text-[9px] px-2 py-0.5 rounded font-medium cursor-pointer hover:bg-copper/20 transition-colors">
                    Add to Cart
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuotingDashboard() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden border border-warm-gray/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161820] border-b border-warm-gray/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[#0f1117] rounded-md px-4 py-1.5 text-[11px] text-warm-gray/40 text-center max-w-md mx-auto">
            portal.nordlab.app/quotes/QT-2024-1847
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-44 bg-[#161820] border-r border-warm-gray/8 py-4 px-3 hidden md:block">
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-7 h-7 rounded bg-copper/20 flex items-center justify-center text-copper text-[10px] font-bold">N</div>
            <div>
              <div className="text-cream text-[11px] font-medium">NordLab</div>
              <div className="text-warm-gray/40 text-[9px]">Sales Portal</div>
            </div>
          </div>
          <nav className="space-y-0.5">
            {[
              { label: 'All Quotes', active: false, count: '24' },
              { label: 'New Quote', active: true, count: '' },
              { label: 'Pending', active: false, count: '8' },
              { label: 'Accepted', active: false, count: '12' },
              { label: 'Expired', active: false, count: '4' },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-2.5 py-2 rounded text-[11px] ${
                  item.active
                    ? 'bg-copper/10 text-copper'
                    : 'text-warm-gray/40'
                }`}
              >
                <span>{item.label}</span>
                {item.count && (
                  <span className="bg-[#0f1117] text-warm-gray/30 text-[9px] px-1.5 py-0.5 rounded">{item.count}</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-5">
          {/* Quote header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-cream text-sm font-medium">Quote #QT-2024-1847</h3>
                <span className="bg-yellow-500/15 text-yellow-400/80 text-[9px] px-2 py-0.5 rounded-full font-medium">Draft</span>
              </div>
              <p className="text-warm-gray/40 text-[11px] mt-1">Dealer: Henderson Contractors - Created May 15, 2025</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-[#161820] border border-warm-gray/8 text-warm-gray/50 text-[11px] px-3 py-1.5 rounded-md">
                Save Draft
              </div>
              <div className="bg-copper text-obsidian text-[11px] px-4 py-1.5 rounded-md font-medium">
                Send Quote
              </div>
            </div>
          </div>

          {/* Dealer info */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Dealer', value: 'Henderson Contractors' },
              { label: 'Pricing Tier', value: 'Tier 2 - 20% off' },
              { label: 'Valid Until', value: 'Jun 15, 2025' },
              { label: 'Rep', value: 'Sarah Mitchell' },
            ].map((info) => (
              <div key={info.label} className="bg-[#161820] border border-warm-gray/6 rounded-md p-3">
                <div className="text-warm-gray/30 text-[9px] uppercase tracking-wider">{info.label}</div>
                <div className="text-cream text-[11px] mt-1 font-medium">{info.value}</div>
              </div>
            ))}
          </div>

          {/* Line items table */}
          <div className="bg-[#161820] border border-warm-gray/6 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-warm-gray/8 text-[9px] uppercase tracking-wider text-warm-gray/30">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-right">List Price</div>
              <div className="col-span-2 text-right">Dealer Price</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            {[
              { product: 'Shaker White 36" Base Cabinet', sku: 'SW-B36', list: '$342.00', dealer: '$273.60', qty: '12', total: '$3,283.20' },
              { product: 'Shaker White 30" Wall Cabinet', sku: 'SW-W30', list: '$218.00', dealer: '$174.40', qty: '8', total: '$1,395.20' },
              { product: 'Heritage Oak 42" Tall Pantry', sku: 'HO-T42', list: '$485.00', dealer: '$388.00', qty: '4', total: '$1,552.00' },
              { product: 'Soft-Close Hinge Kit (50pk)', sku: 'HW-SCH50', list: '$89.00', dealer: '$71.20', qty: '6', total: '$427.20' },
              { product: 'Granite Countertop - Midnight', sku: 'CT-GM-96', list: '$1,240.00', dealer: '$992.00', qty: '2', total: '$1,984.00' },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-warm-gray/4 text-[11px] hover:bg-warm-gray/3 transition-colors">
                <div className="col-span-5">
                  <div className="text-cream">{item.product}</div>
                  <div className="text-warm-gray/30 text-[9px] mt-0.5">{item.sku}</div>
                </div>
                <div className="col-span-2 text-right text-warm-gray/30 line-through">{item.list}</div>
                <div className="col-span-2 text-right text-copper">{item.dealer}</div>
                <div className="col-span-1 text-center text-warm-gray/60">{item.qty}</div>
                <div className="col-span-2 text-right text-cream font-medium">{item.total}</div>
              </div>
            ))}
            {/* Total row */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3.5 bg-copper/5">
              <div className="col-span-8 text-right text-warm-gray/40 text-[11px]">
                <span className="mr-6">5 items</span>
                Subtotal
              </div>
              <div className="col-span-1" />
              <div className="col-span-3 text-right">
                <span className="text-copper text-base font-semibold">$8,641.60</span>
                <div className="text-warm-gray/30 text-[9px] mt-0.5">Dealer saves $2,160.40</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryDashboard() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden border border-warm-gray/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161820] border-b border-warm-gray/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[#0f1117] rounded-md px-4 py-1.5 text-[11px] text-warm-gray/40 text-center max-w-md mx-auto">
            portal.nordlab.app/inventory/overview
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5">
        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total SKUs', value: '3,247', change: '', color: 'text-cream' },
            { label: 'In Stock', value: '2,891', change: '+24 this week', color: 'text-green-400/80' },
            { label: 'Low Stock Alerts', value: '43', change: 'Needs attention', color: 'text-yellow-400/80' },
            { label: 'Out of Stock', value: '18', change: '12 incoming', color: 'text-red-400/80' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#161820] border border-warm-gray/6 rounded-md p-4">
              <div className="text-warm-gray/30 text-[9px] uppercase tracking-wider">{stat.label}</div>
              <div className={`text-xl font-semibold mt-1 ${stat.color}`}>{stat.value}</div>
              {stat.change && <div className="text-warm-gray/30 text-[9px] mt-1">{stat.change}</div>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Stock movement chart */}
          <div className="lg:col-span-3 bg-[#161820] border border-warm-gray/6 rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-cream text-[12px] font-medium">Stock Movement - Last 8 Weeks</h4>
              <div className="flex gap-3 text-[9px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-copper/70" /> Incoming</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warm-gray/30" /> Outgoing</span>
              </div>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-2 h-32 px-1">
              {[
                { incoming: 65, outgoing: 72 },
                { incoming: 82, outgoing: 68 },
                { incoming: 45, outgoing: 78 },
                { incoming: 90, outgoing: 85 },
                { incoming: 75, outgoing: 62 },
                { incoming: 55, outgoing: 70 },
                { incoming: 88, outgoing: 75 },
                { incoming: 70, outgoing: 58 },
              ].map((week, i) => (
                <div key={i} className="flex-1 flex items-end gap-0.5">
                  <div
                    className="flex-1 bg-copper/30 rounded-t-sm transition-all hover:bg-copper/50"
                    style={{ height: `${week.incoming}%` }}
                  />
                  <div
                    className="flex-1 bg-warm-gray/15 rounded-t-sm transition-all hover:bg-warm-gray/25"
                    style={{ height: `${week.outgoing}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 px-1 text-[8px] text-warm-gray/20">
              {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </div>

          {/* Low stock alerts */}
          <div className="lg:col-span-2 bg-[#161820] border border-warm-gray/6 rounded-md p-4">
            <h4 className="text-cream text-[12px] font-medium mb-3">Low Stock Alerts</h4>
            <div className="space-y-2.5">
              {[
                { name: 'Modern Grey 24" Base', sku: 'MG-B24', stock: 4, reorder: 25, status: 'critical' },
                { name: 'Soft-Close Drawer Slide', sku: 'HW-SCD16', stock: 12, reorder: 50, status: 'warning' },
                { name: 'Heritage Oak 18" Wall', sku: 'HO-W18', stock: 8, reorder: 20, status: 'warning' },
                { name: 'Quartz Top - Arctic', sku: 'CT-QA-72', stock: 2, reorder: 10, status: 'critical' },
                { name: 'Euro Hinge Pair', sku: 'HW-EH2', stock: 18, reorder: 100, status: 'warning' },
              ].map((item) => (
                <div key={item.sku} className="flex items-center justify-between py-2 border-b border-warm-gray/4 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-cream text-[11px] truncate">{item.name}</div>
                    <div className="text-warm-gray/30 text-[9px]">{item.sku}</div>
                  </div>
                  <div className="text-right ml-3">
                    <div className={`text-[11px] font-medium ${item.status === 'critical' ? 'text-red-400/80' : 'text-yellow-400/80'}`}>
                      {item.stock} left
                    </div>
                    <div className="text-warm-gray/20 text-[9px]">Reorder: {item.reorder}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-[#161820] border border-warm-gray/6 rounded-md overflow-hidden mt-4">
          <div className="flex items-center justify-between px-4 py-3 border-b border-warm-gray/6">
            <h4 className="text-cream text-[12px] font-medium">Recent Incoming Orders</h4>
            <span className="text-warm-gray/30 text-[10px]">Last 24 hours</span>
          </div>
          {[
            { order: 'ORD-4821', dealer: 'Pacific Home Supply', items: 14, total: '$6,240.00', status: 'Processing', statusColor: 'bg-blue-400/15 text-blue-400/80' },
            { order: 'ORD-4820', dealer: 'Henderson Contractors', items: 8, total: '$3,180.00', status: 'Confirmed', statusColor: 'bg-green-400/15 text-green-400/80' },
            { order: 'ORD-4819', dealer: 'Summit Builders Group', items: 22, total: '$12,450.00', status: 'Picking', statusColor: 'bg-yellow-400/15 text-yellow-400/80' },
          ].map((order) => (
            <div key={order.order} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-warm-gray/4 text-[11px] hover:bg-warm-gray/3 transition-colors">
              <div className="col-span-2 text-copper font-medium">{order.order}</div>
              <div className="col-span-4 text-cream">{order.dealer}</div>
              <div className="col-span-1 text-warm-gray/40 text-center">{order.items}</div>
              <div className="col-span-3 text-warm-gray/60 text-right">{order.total}</div>
              <div className="col-span-2 text-right">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesOperationsDashboard() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden border border-warm-gray/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161820] border-b border-warm-gray/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[#0f1117] rounded-md px-4 py-1.5 text-[11px] text-warm-gray/40 text-center max-w-md mx-auto">
            portal.nordlab.app/operations/dashboard
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Revenue This Month', value: '$284,600', change: '+12.4% vs last month', positive: true },
            { label: 'Active Dealers', value: '127', change: '4 new this month', positive: true },
            { label: 'Avg Quote Turnaround', value: '14 min', change: 'Was 2.3 days', positive: true },
            { label: 'Order Fill Rate', value: '94.2%', change: '-1.1% from target', positive: false },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-[#161820] border border-warm-gray/6 rounded-md p-4">
              <div className="text-warm-gray/30 text-[9px] uppercase tracking-wider">{kpi.label}</div>
              <div className="text-cream text-xl font-semibold mt-1">{kpi.value}</div>
              <div className={`text-[9px] mt-1 ${kpi.positive ? 'text-green-400/70' : 'text-red-400/70'}`}>{kpi.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Rep performance */}
          <div className="bg-[#161820] border border-warm-gray/6 rounded-md p-4">
            <h4 className="text-cream text-[12px] font-medium mb-4">Sales Rep Performance - May 2025</h4>
            <div className="space-y-3.5">
              {[
                { name: 'Sarah Mitchell', region: 'Northeast', quotes: 48, closed: 38, revenue: '$94,200', pct: 79 },
                { name: 'James Rivera', region: 'Southeast', quotes: 41, closed: 31, revenue: '$78,400', pct: 76 },
                { name: 'Lisa Chen', region: 'Midwest', quotes: 36, closed: 29, revenue: '$68,900', pct: 81 },
                { name: 'David Kowalski', region: 'West Coast', quotes: 32, closed: 22, revenue: '$43,100', pct: 69 },
              ].map((rep) => (
                <div key={rep.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-copper/15 flex items-center justify-center text-copper text-[9px] font-bold">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-cream text-[11px] font-medium">{rep.name}</div>
                        <div className="text-warm-gray/30 text-[9px]">{rep.region}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-copper text-[11px] font-medium">{rep.revenue}</div>
                      <div className="text-warm-gray/30 text-[9px]">{rep.closed}/{rep.quotes} quotes closed</div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-copper/40 rounded-full transition-all group-hover:bg-copper/60"
                      style={{ width: `${rep.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline + recent activity */}
          <div className="space-y-4">
            {/* Pipeline */}
            <div className="bg-[#161820] border border-warm-gray/6 rounded-md p-4">
              <h4 className="text-cream text-[12px] font-medium mb-3">Quote Pipeline</h4>
              <div className="space-y-2.5">
                {[
                  { stage: 'Draft', count: 12, value: '$34,200', pct: 15, color: 'bg-warm-gray/20' },
                  { stage: 'Sent to Dealer', count: 24, value: '$89,600', pct: 40, color: 'bg-copper/30' },
                  { stage: 'Under Review', count: 18, value: '$72,400', pct: 30, color: 'bg-copper/50' },
                  { stage: 'Accepted', count: 8, value: '$41,800', pct: 60, color: 'bg-green-500/40' },
                ].map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-warm-gray/50 text-[11px]">{stage.stage}</span>
                      <span className="text-warm-gray/30 text-[10px]">{stage.count} quotes - {stage.value}</span>
                    </div>
                    <div className="h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                      <div className={`h-full ${stage.color} rounded-full`} style={{ width: `${stage.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity feed */}
            <div className="bg-[#161820] border border-warm-gray/6 rounded-md p-4">
              <h4 className="text-cream text-[12px] font-medium mb-3">Activity Feed</h4>
              <div className="space-y-3">
                {[
                  { action: 'Quote accepted', detail: 'Henderson Contractors - $8,641.60', time: '4 min ago', dot: 'bg-green-400/70' },
                  { action: 'New order placed', detail: 'Pacific Home Supply - 14 items', time: '22 min ago', dot: 'bg-copper/70' },
                  { action: 'Low stock alert', detail: 'MG-B24 dropped below threshold', time: '1 hr ago', dot: 'bg-yellow-400/70' },
                  { action: 'New dealer registered', detail: 'Coastal Kitchen & Bath, FL', time: '3 hrs ago', dot: 'bg-blue-400/70' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${activity.dot}`} />
                    <div className="flex-1">
                      <div className="text-cream text-[11px]">{activity.action}</div>
                      <div className="text-warm-gray/30 text-[10px]">{activity.detail}</div>
                    </div>
                    <span className="text-warm-gray/20 text-[9px] whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DigitalStorefrontDashboard() {
  return (
    <div className="bg-[#0f1117] rounded-lg overflow-hidden border border-warm-gray/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161820] border-b border-warm-gray/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[#0f1117] rounded-md px-4 py-1.5 text-[11px] text-warm-gray/40 text-center max-w-md mx-auto">
            www.midwestcabinetdistributors.com
          </div>
        </div>
      </div>

      <div className="p-0">
        {/* Top navigation */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#161820] border-b border-warm-gray/6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-copper/20 flex items-center justify-center">
              <span className="text-copper text-xs font-bold">MCD</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-cream text-[12px] font-semibold tracking-wide">Midwest Cabinet Distributors</div>
              <div className="text-warm-gray/30 text-[9px]">Premium Kitchen & Bath Since 1998</div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-warm-gray/40 text-[11px] hover:text-cream cursor-pointer transition-colors hidden md:inline">Products</span>
            <span className="text-warm-gray/40 text-[11px] hover:text-cream cursor-pointer transition-colors hidden md:inline">Collections</span>
            <span className="text-warm-gray/40 text-[11px] hover:text-cream cursor-pointer transition-colors hidden md:inline">About</span>
            <span className="text-warm-gray/40 text-[11px] hover:text-cream cursor-pointer transition-colors hidden md:inline">Contact</span>
            <div className="bg-copper/15 text-copper text-[11px] px-3.5 py-1.5 rounded-md font-medium cursor-pointer hover:bg-copper/25 transition-colors">
              Dealer Login
            </div>
          </div>
        </div>

        {/* Hero Banner with kitchen scene */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a2520 0%, #1a1814 40%, #14120f 100%)' }}>
          {/* Ambient kitchen atmosphere */}
          <div className="absolute inset-0">
            {/* Warm lighting glow */}
            <div className="absolute top-0 right-[30%] w-64 h-32 bg-[#c9915a]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-[20%] w-48 h-24 bg-[#c9915a]/5 rounded-full blur-2xl" />
            {/* Cabinet silhouettes - right side */}
            <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block">
              {/* Upper wall cabinets */}
              <div className="absolute right-8 top-4 flex gap-1">
                <div className="w-20 h-16 rounded-sm bg-gradient-to-b from-[#d9d4cd] to-[#c4bfb7] shadow-lg">
                  <div className="absolute left-[48%] top-1.5 bottom-1.5 w-[1px] bg-black/8" />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#b5885a]/40" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#b5885a]/40" />
                </div>
                <div className="w-14 h-16 rounded-sm bg-gradient-to-b from-[#d9d4cd] to-[#c4bfb7] shadow-lg">
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#b5885a]/40" />
                </div>
                <div className="w-20 h-16 rounded-sm bg-gradient-to-b from-[#d9d4cd] to-[#c4bfb7] shadow-lg">
                  <div className="absolute left-[48%] top-1.5 bottom-1.5 w-[1px] bg-black/8" />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#b5885a]/40" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#b5885a]/40" />
                </div>
              </div>
              {/* Countertop */}
              <div className="absolute right-6 top-[76px]">
                <div className="w-[234px] h-3 bg-gradient-to-r from-[#c4bfb8] via-[#b8b2aa] to-[#a9a299] rounded-t-sm shadow-md" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 55% 30%, rgba(255,255,255,0.1) 0.5px, transparent 0.5px), radial-gradient(circle at 85% 60%, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '10px 6px' }} />
              </div>
              {/* Lower base cabinets */}
              <div className="absolute right-8 top-[82px] flex gap-1">
                <div className="w-20 h-20 rounded-sm bg-gradient-to-b from-[#d4cfca] to-[#bfb9b2] shadow-lg relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-3 w-8 h-[2px] rounded-full bg-[#b5885a]/30" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-7 w-8 h-[2px] rounded-full bg-[#b5885a]/30" />
                  <div className="absolute bottom-0 left-1.5 w-2 h-1 rounded-b-sm bg-black/8" />
                  <div className="absolute bottom-0 right-1.5 w-2 h-1 rounded-b-sm bg-black/8" />
                </div>
                <div className="w-14 h-20 rounded-sm bg-gradient-to-b from-[#d4cfca] to-[#bfb9b2] shadow-lg relative">
                  <div className="absolute right-3 top-4 w-1.5 h-1.5 rounded-full bg-[#b5885a]/30" />
                  <div className="absolute bottom-0 left-1 w-1.5 h-1 rounded-b-sm bg-black/8" />
                  <div className="absolute bottom-0 right-1 w-1.5 h-1 rounded-b-sm bg-black/8" />
                </div>
                <div className="w-20 h-20 rounded-sm bg-gradient-to-b from-[#d4cfca] to-[#bfb9b2] shadow-lg relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-3 w-8 h-[2px] rounded-full bg-[#b5885a]/30" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-7 w-8 h-[2px] rounded-full bg-[#b5885a]/30" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-[42px] w-8 h-[2px] rounded-full bg-[#b5885a]/30" />
                  <div className="absolute bottom-0 left-1.5 w-2 h-1 rounded-b-sm bg-black/8" />
                  <div className="absolute bottom-0 right-1.5 w-2 h-1 rounded-b-sm bg-black/8" />
                </div>
              </div>
              {/* Subtle floor reflection */}
              <div className="absolute right-6 bottom-0 w-60 h-8 bg-gradient-to-t from-[#c9915a]/3 to-transparent" />
            </div>
            {/* Shadow overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1814] via-[#1a1814]/80 to-transparent" />
          </div>

          <div className="relative px-6 md:px-10 py-10 md:py-14">
            <div className="max-w-lg">
              <div className="text-copper/60 text-[10px] tracking-[0.25em] uppercase mb-3">New Collection 2025</div>
              <div className="text-cream text-xl md:text-2xl font-semibold leading-tight mb-2">Modern Frameless Cabinetry</div>
              <div className="text-warm-gray/50 text-[12px] leading-relaxed mb-5 max-w-sm">
                Clean lines, soft-close everything, and 14 finish options. Available for immediate dealer ordering.
              </div>
              <div className="flex gap-3">
                <div className="bg-copper text-obsidian text-[11px] px-4 py-2 rounded-md font-medium cursor-pointer">
                  View Collection
                </div>
                <div className="bg-warm-gray/8 border border-warm-gray/10 text-cream text-[11px] px-4 py-2 rounded-md cursor-pointer hover:bg-warm-gray/12 transition-colors">
                  Request Catalog
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories with visual icons */}
        <div className="px-6 md:px-10 py-6 border-b border-warm-gray/6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-cream text-[13px] font-medium">Browse by Category</h3>
            <span className="text-copper text-[11px] cursor-pointer">View All Products</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Base Cabinets', count: '86 products', type: 'base-cabinet' as const, color: 'white' as const },
              { name: 'Wall Cabinets', count: '64 products', type: 'wall-cabinet' as const, color: 'grey' as const },
              { name: 'Tall & Pantry', count: '28 products', type: 'tall-cabinet' as const, color: 'oak' as const },
              { name: 'Countertops', count: '42 products', type: 'countertop' as const, color: 'stone' as const },
            ].map((cat) => (
              <div key={cat.name} className="bg-[#161820] border border-warm-gray/6 rounded-md p-4 hover:border-copper/20 cursor-pointer transition-colors text-center group">
                <div className="h-14 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <ProductVisualCompact type={cat.type} colorScheme={cat.color} />
                </div>
                <div className="text-cream text-[11px] font-medium">{cat.name}</div>
                <div className="text-warm-gray/30 text-[9px] mt-0.5">{cat.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products with visual product images */}
        <div className="px-6 md:px-10 py-6 border-b border-warm-gray/6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-cream text-[13px] font-medium">Best Sellers</h3>
            <span className="text-warm-gray/30 text-[10px]">Updated weekly</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'Shaker White 36" Base', price: 'From $273', tag: 'Most Popular', type: 'base-cabinet' as const, color: 'white' as const, bgAccent: 'from-[#e8e4df]/5 to-[#d9d4cd]/3' },
              { name: 'Modern Grey 30" Wall', price: 'From $174', tag: '', type: 'wall-cabinet' as const, color: 'grey' as const, bgAccent: 'from-[#8a8d94]/5 to-[#7a7d84]/3' },
              { name: 'Heritage Oak Pantry', price: 'From $388', tag: 'New', type: 'tall-cabinet' as const, color: 'oak' as const, bgAccent: 'from-[#b5885a]/5 to-[#a37a4f]/3' },
              { name: 'Quartz Arctic 72"', price: 'From $992', tag: '', type: 'countertop' as const, color: 'stone' as const, bgAccent: 'from-[#c4bfb8]/5 to-[#b8b2aa]/3' },
            ].map((product) => (
              <div key={product.name} className="bg-[#161820] border border-warm-gray/6 rounded-md overflow-hidden hover:border-copper/20 cursor-pointer transition-colors group">
                <div className={`h-20 bg-gradient-to-b ${product.bgAccent} flex items-center justify-center relative`}>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <ProductVisualCompact type={product.type} colorScheme={product.color} />
                  </div>
                  {/* Subtle light reflection */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.02] to-transparent" />
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-copper/20 text-copper text-[8px] px-1.5 py-0.5 rounded font-medium">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-cream text-[11px] font-medium leading-tight">{product.name}</div>
                  <div className="text-copper text-[11px] mt-1.5">{product.price}</div>
                  <div className="text-warm-gray/25 text-[9px] mt-0.5">Dealer pricing available</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar + CTA */}
        <div className="px-6 md:px-10 py-5 bg-[#161820] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-cream text-sm font-semibold">200+</div>
              <div className="text-warm-gray/25 text-[8px] uppercase tracking-wider">Active Dealers</div>
            </div>
            <div className="w-px h-6 bg-warm-gray/8" />
            <div className="text-center">
              <div className="text-cream text-sm font-semibold">3,200</div>
              <div className="text-warm-gray/25 text-[8px] uppercase tracking-wider">SKUs Available</div>
            </div>
            <div className="w-px h-6 bg-warm-gray/8" />
            <div className="text-center">
              <div className="text-cream text-sm font-semibold">27 yrs</div>
              <div className="text-warm-gray/25 text-[8px] uppercase tracking-wider">In Business</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-warm-gray/30 text-[11px]">Are you a dealer?</span>
            <div className="bg-copper/15 text-copper text-[11px] px-3 py-1.5 rounded-md font-medium cursor-pointer">
              Apply for an Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dashboards: Record<string, React.FC> = {
  storefront: DigitalStorefrontDashboard,
  dealer: DealerPortalDashboard,
  quoting: QuotingDashboard,
  inventory: InventoryDashboard,
  operations: SalesOperationsDashboard,
};

const captions: Record<string, string> = {
  storefront: 'Your company website becomes the front door to everything. Dealers find your catalog, new partners evaluate your brand, and everyone sees a business that runs like a modern operation.',
  dealer: 'Your dealers browse your catalog with their negotiated pricing, add products to cart, and place orders without a single phone call.',
  quoting: 'Your reps build quotes in minutes with automatic dealer-tier pricing, line-item details, and one-click send. No spreadsheets involved.',
  inventory: 'Sales, warehouse, and purchasing teams all see the same real-time stock data. Low stock alerts trigger before you run out, not after.',
  operations: 'Track rep performance, quote pipeline, dealer activity, and revenue from one screen. See what is working and what needs attention.',
};

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState('storefront');
  const ActiveDashboard = dashboards[activeTab];

  return (
    <section className="relative py-24 md:py-32 bg-[#0a0b0f]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,145,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,145,90,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            See It In Action
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            This Is What Your Team <span className="serif-italic copper-text">Actually Gets</span>
          </h2>
          <p className="text-warm-gray/50 text-base max-w-2xl mx-auto">
            Not wireframes. Not pitch decks. These are the systems we build - dealer portals, quoting tools, inventory dashboards, and operations views your team uses every day.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-copper/15 text-copper border border-copper/30'
                  : 'bg-charcoal/40 text-warm-gray/40 border border-warm-gray/8 hover:text-warm-gray/60 hover:border-warm-gray/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Caption */}
        <p className="text-center text-warm-gray/40 text-sm mb-6 max-w-xl mx-auto">
          {captions[activeTab]}
        </p>

        {/* Dashboard display */}
        <div className="transition-opacity duration-300">
          <ActiveDashboard />
        </div>

        {/* Bottom note */}
        <p className="text-center text-warm-gray/25 text-xs mt-8 max-w-lg mx-auto">
          Every dashboard is custom-built for the client. What you see here reflects the type of systems we deliver, tailored to your product catalog, pricing structure, and workflow.
        </p>
      </div>
    </section>
  );
}

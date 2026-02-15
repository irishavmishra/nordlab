'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus } from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: string;
}

interface QuoteItemFormProps {
  products: Product[];
  onAddItem: (productId: string, quantity: number, unitPrice: string) => void;
  editingItem?: {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: string;
  };
  onCancelEdit?: () => void;
}

export default function QuoteItemForm({
  products,
  onAddItem,
  editingItem,
  onCancelEdit,
}: QuoteItemFormProps) {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('1');
  const [unitPrice, setUnitPrice] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingItem) {
      const product = products.find((p) => p.id === editingItem.productId);
      if (product) {
        setSelectedProduct(product);
        setQuantity(String(editingItem.quantity));
        setUnitPrice(editingItem.unitPrice);
      }
    } else {
      resetForm();
    }
  }, [editingItem, products]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setUnitPrice(product.price);
    setSearch('');
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (!selectedProduct || !quantity || !unitPrice) return;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return;

    onAddItem(selectedProduct.id, qty, unitPrice);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setQuantity('1');
    setUnitPrice('');
    setSearch('');
  };

  const lineTotal = selectedProduct
    ? (parseFloat(unitPrice || '0') * parseInt(quantity || '0', 10)).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-warm-gray mb-2">
            Product
          </label>
          {selectedProduct ? (
            <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal border border-copper rounded">
              <div>
                <p className="text-cream font-medium">{selectedProduct.name}</p>
                <p className="text-warm-gray text-xs">{selectedProduct.sku}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-warm-gray hover:text-cream text-sm"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full px-4 py-2.5 pl-10 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
              {showDropdown && search && filteredProducts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-charcoal border border-slate-dark rounded shadow-xl max-h-60 overflow-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="w-full px-4 py-2.5 text-left hover:bg-graphite transition-colors"
                    >
                      <p className="text-cream">{product.name}</p>
                      <p className="text-warm-gray text-xs">
                        {product.sku} - ${product.price}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <Input
            label="Quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <Input
            label="Unit Price"
            type="number"
            step="0.01"
            min="0"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-warm-gray">
          Line Total:{' '}
          <span className="text-copper font-semibold">${lineTotal}</span>
        </div>
        <div className="flex gap-2">
          {editingItem && onCancelEdit && (
            <Button variant="secondary" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!selectedProduct || !quantity || !unitPrice}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
        </div>
      </div>
    </div>
  );
}
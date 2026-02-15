'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import QuoteItemForm from '@/components/quotes/QuoteItemForm';
import QuoteItemsTable from '@/components/quotes/QuoteItemsTable';
import { QuoteItemWithProduct } from '@/actions/quotes';
import { useRouter } from 'next/navigation';
import { createQuote } from '@/actions/quotes';
import { ArrowLeft, Save, Send } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: string;
}

export default function NewQuotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<QuoteItemWithProduct[]>([]);
  const [notes, setNotes] = useState('');
  const [validUntil, setValidUntil] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]));
  }, []);

  const total = items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);

  const handleAddItem = (productId: string, quantity: number, unitPrice: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingIndex = items.findIndex((i) => i.productId === productId);
    if (existingIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity,
        unitPrice,
        totalPrice: (parseFloat(unitPrice) * quantity).toFixed(2),
      };
      setItems(updatedItems);
    } else {
      const newItem: QuoteItemWithProduct = {
        id: `temp-${Date.now()}`,
        quoteId: '',
        productId,
        quantity,
        unitPrice,
        totalPrice: (parseFloat(unitPrice) * quantity).toFixed(2),
        notes: null,
        product: {
          id: product.id,
          sku: product.sku,
          name: product.name,
          price: product.price,
        },
      };
      setItems([...items, newItem]);
    }
  };

  const handleUpdateItem = (itemId: string, quantity: number, unitPrice: string) => {
    const index = items.findIndex((i) => i.id === itemId);
    if (index < 0) return;

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity,
      unitPrice,
      totalPrice: (parseFloat(unitPrice) * quantity).toFixed(2),
    };
    setItems(updatedItems);
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter((i) => i.id !== itemId));
  };

  const handleSave = async (sendQuote: boolean = false) => {
    if (items.length === 0) {
      alert('Please add at least one item to the quote');
      return;
    }

    setLoading(true);
    try {
      const result = await createQuote({
        distributorId: 'default',
        validUntil: validUntil ? new Date(validUntil) : undefined,
        notes: notes || undefined,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      });

      if (sendQuote) {
        const { updateQuoteStatus } = await import('@/actions/quotes');
        await updateQuoteStatus(result.id, 'sent');
      }

      router.push(`/app/quotes/${result.id}`);
    } catch (error) {
      console.error('Failed to create quote:', error);
      alert('Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/app/quotes"
          className="p-2 text-warm-gray hover:text-cream transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-cream">New Quote</h1>
          <p className="text-warm-gray mt-1">Create a new quote for a customer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-cream">Quote Items</h2>
            </CardHeader>
            <CardBody>
              <QuoteItemForm products={products} onAddItem={handleAddItem} />
              <div className="mt-6">
                <QuoteItemsTable
                  items={items}
                  onUpdateItem={handleUpdateItem}
                  onRemoveItem={handleRemoveItem}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-cream">Quote Details</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Valid Until"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20"
                  placeholder="Add any notes for this quote..."
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span className="text-cream">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Tax</span>
                  <span className="text-cream">$0.00</span>
                </div>
                <div className="border-t border-slate-dark pt-3">
                  <div className="flex justify-between">
                    <span className="text-cream font-medium">Total</span>
                    <span className="text-copper font-semibold text-lg">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex-col gap-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleSave(false)}
                loading={loading}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save as Draft
              </Button>
              <Button
                className="w-full"
                onClick={() => handleSave(true)}
                loading={loading}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send Quote
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { CartItem } from '@/components/cart/CartItem';
import { updateCartItem, removeFromCart, clearCart } from '@/actions/cart';
import type { CartItemWithProduct } from '@/actions/cart';

interface CartContentProps {
  initialItems: CartItemWithProduct[];
  initialSubtotal: number;
  itemCount: number;
}

export function CartContent({ initialItems, initialSubtotal, itemCount }: CartContentProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [subtotal, setSubtotal] = useState(initialSubtotal);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = async (id: string, quantity: number) => {
    const result = await updateCartItem(items[0].userId, id, quantity);
    if (result.success) {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const price = parseFloat(item.product?.price || '0');
            return { ...item, quantity };
          }
          return item;
        })
      );
      recalculateTotal();
    }
  };

  const handleRemove = async (id: string) => {
    const result = await removeFromCart(items[0].userId, id);
    if (result.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      recalculateTotal();
    }
  };

  const handleClearCart = async () => {
    if (items.length === 0) return;
    const result = await clearCart(items[0].userId);
    if (result.success) {
      setItems([]);
      setSubtotal(0);
    }
  };

  const recalculateTotal = () => {
    const newSubtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.product?.price || '0');
      return sum + price * item.quantity;
    }, 0);
    setSubtotal(newSubtotal);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    router.push('/app/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="w-16 h-16 text-slate-mid mx-auto mb-4" />
        <h2 className="text-xl font-light text-cream serif-display mb-2">Your cart is empty</h2>
        <p className="text-warm-gray mb-6">Add some products to get started</p>
        <Button onClick={() => router.push('/app/products')}>
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-light text-cream serif-display">Shopping Cart</h1>
          <Button variant="secondary" size="sm" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
        <p className="text-warm-gray text-sm">{itemCount} items in your cart</p>

        <div className="space-y-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              product={item.product}
              quantity={item.quantity}
              inventory={item.inventory}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardBody>
            <h2 className="text-lg font-medium text-cream mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-warm-gray">Subtotal ({itemCount} items)</span>
                <span className="text-cream">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray">Tax</span>
                <span className="text-warm-gray">Calculated at checkout</span>
              </div>
              <div className="border-t border-slate-dark pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-cream font-medium">Estimated Total</span>
                  <span className="text-copper text-lg font-medium">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button className="w-full" onClick={handleCheckout} loading={isCheckingOut}>
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
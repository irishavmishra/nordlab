'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectItem } from '@/components/ui/Select';
import { createProduct, CreateProductData } from '@/actions/products';
import { ArrowLeft, Save } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface NewProductFormProps {
  categories: Category[];
}

interface FormState {
  sku: string;
  name: string;
  description: string;
  price: string;
  cost: string;
  categoryId: string;
  isActive: boolean;
}

const initialState: FormState = {
  sku: '',
  name: '',
  description: '',
  price: '',
  cost: '',
  categoryId: '',
  isActive: true,
};

export function NewProductForm({ categories }: NewProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!/^[A-Z0-9-]+$/i.test(form.sku)) {
      newErrors.sku = 'SKU can only contain letters, numbers, and hyphens';
    }

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!form.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(form.price)) || parseFloat(form.price) < 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (form.cost && (isNaN(parseFloat(form.cost)) || parseFloat(form.cost) < 0)) {
      newErrors.cost = 'Cost must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const data: CreateProductData = {
      sku: form.sku.trim().toUpperCase(),
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      price: form.price,
      cost: form.cost.trim() || undefined,
      categoryId: form.categoryId || undefined,
      isActive: form.isActive,
    };

    const result = await createProduct(data);

    setIsSubmitting(false);

    if (result.success) {
      router.push(`/app/products/${result.product?.id}`);
    } else {
      setErrors({ submit: result.error ?? 'Failed to create product' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card-dark rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="SKU"
            id="sku"
            value={form.sku}
            onChange={(e) => handleChange('sku', e.target.value)}
            placeholder="e.g., PROD-001"
            error={errors.sku}
            className="font-mono uppercase"
          />

          <Input
            label="Name"
            id="name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Product name"
            error={errors.name}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-warm-gray mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Product description (optional)"
            rows={4}
            className="w-full px-4 py-2.5 bg-charcoal border border-slate-dark rounded text-cream placeholder:text-warm-gray/50 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/20 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Price"
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="0.00"
            error={errors.price}
          />

          <Input
            label="Cost"
            id="cost"
            type="number"
            step="0.01"
            min="0"
            value={form.cost}
            onChange={(e) => handleChange('cost', e.target.value)}
            placeholder="0.00 (optional)"
            error={errors.cost}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-warm-gray mb-2">
              Category
            </label>
            <Select
              value={form.categoryId || 'none'}
              onValueChange={(value) => handleChange('categoryId', value === 'none' ? '' : value)}
              placeholder="Select category"
            >
              <SelectItem value="none">No category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-gray mb-2">
              Status
            </label>
            <div className="flex items-center gap-4 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-dark bg-charcoal text-copper focus:ring-copper/20 focus:ring-2"
                />
                <span className="text-cream">Active</span>
              </label>
              <span className="text-xs text-warm-gray">
                Inactive products won&apos;t appear in the catalog
              </span>
            </div>
          </div>
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
            {errors.submit}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Create Product
        </Button>
      </div>
    </form>
  );
}

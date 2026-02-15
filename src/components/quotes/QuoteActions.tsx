'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { QuoteWithItems, QuoteStatus, updateQuoteStatus, deleteQuote, duplicateQuote, convertQuoteToOrder } from '@/actions/quotes';
import { useRouter } from 'next/navigation';
import { Send, Check, X, Copy, Trash2, ShoppingBag, Edit } from 'lucide-react';
import Link from 'next/link';

interface QuoteActionsProps {
  quote: QuoteWithItems;
}

export default function QuoteActions({ quote }: QuoteActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);

  const handleStatusUpdate = async (status: QuoteStatus) => {
    setLoading(status);
    try {
      await updateQuoteStatus(quote.id, status);
      router.refresh();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update quote status');
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async () => {
    setLoading('delete');
    try {
      await deleteQuote(quote.id);
      router.push('/app/quotes');
    } catch (error) {
      console.error('Failed to delete quote:', error);
      alert('Failed to delete quote');
    } finally {
      setLoading(null);
      setShowDeleteModal(false);
    }
  };

  const handleDuplicate = async () => {
    setLoading('duplicate');
    try {
      const newQuote = await duplicateQuote(quote.id);
      router.push(`/app/quotes/${newQuote.id}`);
    } catch (error) {
      console.error('Failed to duplicate quote:', error);
      alert('Failed to duplicate quote');
    } finally {
      setLoading(null);
    }
  };

  const handleConvert = async () => {
    setLoading('convert');
    try {
      const result = await convertQuoteToOrder(quote.id);
      router.push(`/app/orders/${result.orderId}`);
    } catch (error) {
      console.error('Failed to convert quote:', error);
      alert('Failed to convert quote to order');
    } finally {
      setLoading(null);
      setShowConvertModal(false);
    }
  };

  const renderDraftActions = () => (
    <>
      <Link href={`/app/quotes/${quote.id}/edit`}>
        <Button variant="secondary" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
          Edit
        </Button>
      </Link>
      <Button
        size="sm"
        onClick={() => handleStatusUpdate('sent')}
        loading={loading === 'sent'}
        leftIcon={<Send className="w-4 h-4" />}
      >
        Send
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleDuplicate}
        loading={loading === 'duplicate'}
        leftIcon={<Copy className="w-4 h-4" />}
      >
        Duplicate
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => setShowDeleteModal(true)}
        leftIcon={<Trash2 className="w-4 h-4" />}
      >
        Delete
      </Button>
    </>
  );

  const renderSentActions = () => (
    <>
      <Button
        variant="success"
        size="sm"
        onClick={() => handleStatusUpdate('accepted')}
        loading={loading === 'accepted'}
        leftIcon={<Check className="w-4 h-4" />}
      >
        Accept
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleStatusUpdate('rejected')}
        loading={loading === 'rejected'}
        leftIcon={<X className="w-4 h-4" />}
      >
        Reject
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleDuplicate}
        loading={loading === 'duplicate'}
        leftIcon={<Copy className="w-4 h-4" />}
      >
        Duplicate
      </Button>
      <Button
        size="sm"
        onClick={() => setShowConvertModal(true)}
        leftIcon={<ShoppingBag className="w-4 h-4" />}
      >
        Convert to Order
      </Button>
    </>
  );

  const renderAcceptedActions = () => (
    <>
      <Button
        size="sm"
        onClick={() => setShowConvertModal(true)}
        loading={loading === 'convert'}
        leftIcon={<ShoppingBag className="w-4 h-4" />}
      >
        Convert to Order
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleDuplicate}
        loading={loading === 'duplicate'}
        leftIcon={<Copy className="w-4 h-4" />}
      >
        Duplicate
      </Button>
    </>
  );

  const renderRejectedActions = () => (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleDuplicate}
      loading={loading === 'duplicate'}
      leftIcon={<Copy className="w-4 h-4" />}
    >
      Duplicate
    </Button>
  );

  const renderExpiredActions = () => (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleDuplicate}
      loading={loading === 'duplicate'}
      leftIcon={<Copy className="w-4 h-4" />}
    >
      Duplicate
    </Button>
  );

  const renderConvertedActions = () => {
    if (!quote.convertedToOrderId) return null;
    return (
      <Link href={`/app/orders/${quote.convertedToOrderId}`}>
        <Button size="sm" leftIcon={<ShoppingBag className="w-4 h-4" />}>
          View Order
        </Button>
      </Link>
    );
  };

  const renderActions = () => {
    switch (quote.status) {
      case 'draft':
        return renderDraftActions();
      case 'sent':
        return renderSentActions();
      case 'accepted':
        return renderAcceptedActions();
      case 'rejected':
        return renderRejectedActions();
      case 'expired':
        return renderExpiredActions();
      case 'converted':
        return renderConvertedActions();
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">{renderActions()}</div>

      <Modal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Delete Quote"
        description="Are you sure you want to delete this quote? This action cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={loading === 'delete'}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-warm-gray">
          Quote <span className="text-cream font-medium">{quote.quoteNumber}</span> will be permanently deleted.
        </p>
      </Modal>

      <Modal
        open={showConvertModal}
        onOpenChange={setShowConvertModal}
        title="Convert to Order"
        description="This will create a new order from this quote and mark the quote as converted."
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowConvertModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleConvert} loading={loading === 'convert'}>
              Convert to Order
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-graphite rounded">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-warm-gray">Quote Number</span>
              <span className="text-cream">{quote.quoteNumber}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-warm-gray">Items</span>
              <span className="text-cream">{quote.items?.length ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warm-gray">Total</span>
              <span className="text-copper font-medium">
                ${parseFloat(quote.total).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
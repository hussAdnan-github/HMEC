'use client';

import React, { useState } from 'react';
import { ProductsSection } from '@/components/dashboard/ProductsSection';
import { ProductModal, DeleteConfirmModal } from '@/components/dashboard/Modals';
import { ApiProduct, ApiAgent } from '@/types/api';
import { 
  createProductServerAction, 
  updateProductServerAction, 
  deleteProductServerAction,
  addProductImageServerAction,
  deleteProductImageServerAction,
  getProductByIdServerAction
} from '@/actions/productActions';
import { Loader2 } from 'lucide-react';
import { ToastNotification, ToastMessage } from '@/components/ui/ToastNotification';

interface ProductsDashboardClientProps {
  initialProducts: ApiProduct[];
  agents: ApiAgent[];
}

export default function ProductsDashboardClient({ 
  initialProducts = [], 
  agents = [] 
}: ProductsDashboardClientProps) {
  const [products, setProducts] = useState<ApiProduct[]>(initialProducts);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ApiProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleSaveProduct = async (
    formData: FormData,
    newSubImages: File[],
    deletedSubImageIds: number[]
  ) => {
    setIsSubmitting(true);
    try {
      let productId: number | string | undefined;
      const isEditing = !!editingProduct;

      if (editingProduct) {
        // Update product
        const res = await updateProductServerAction(editingProduct.id, formData);
        if (res.success && res.data) {
          productId = res.data.id;
        } else {
          setToast({ type: 'error', message: res.error || 'حدث خطأ أثناء تعديل بيانات المنتج' });
          return;
        }
      } else {
        // Create product
        const res = await createProductServerAction(formData);
        if (res.success && res.data) {
          productId = res.data.id;
        } else {
          setToast({ type: 'error', message: res.error || 'حدث خطأ أثناء إضافة المنتج الجديد' });
          return;
        }
      }

      if (productId) {
        // 1. Delete removed sub-images
        if (deletedSubImageIds && deletedSubImageIds.length > 0) {
          for (const imgId of deletedSubImageIds) {
            await deleteProductImageServerAction(imgId);
          }
        }

        // 2. Upload new sub-images to /products/productimage/
        if (newSubImages && newSubImages.length > 0) {
          for (const file of newSubImages) {
            await addProductImageServerAction(productId, file);
          }
        }

        // 3. Fetch latest product with full updated product_images
        const updatedProduct = await getProductByIdServerAction(productId);
        if (updatedProduct) {
          if (isEditing) {
            setProducts((prev) =>
              prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
            setToast({ type: 'success', message: 'تم تعديل بيانات المنتج بنجاح ⚡' });
          } else {
            setProducts((prev) => [updatedProduct, ...prev]);
            setToast({ type: 'success', message: 'تمت إضافة المنتج الجديد بنجاح ⚡' });
          }
        } else {
          setToast({ type: 'success', message: isEditing ? 'تم التعديل بنجاح' : 'تمت الإضافة بنجاح' });
        }
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      setToast({ type: 'error', message: error?.message || 'فشلت العملية، يرجى المحاولة مرة أخرى' });
    } finally {
      setIsSubmitting(false);
      setEditingProduct(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const res = await deleteProductServerAction(deleteTarget.id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setToast({ type: 'success', message: 'تم حذف المنتج بنجاح 🗑️' });
      } else {
        setToast({ type: 'error', message: res.error || 'حدث خطأ أثناء حذف المنتج من السيرفر' });
      }
    } catch (error: any) {
      console.error('Error deleting product:', error);
      setToast({ type: 'error', message: error?.message || 'فشل حذف المنتج، يرجى التحقق من الاتصال بالشبكة' });
    } finally {
      setIsSubmitting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="relative">
      {/* Global loading spinner overlay during submit/delete */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-card border border-border p-6 rounded-3xl shadow-xl flex items-center gap-3 text-sm font-bold text-foreground">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span>جاري معالجة طلبك</span>
          </div>
        </div>
      )}

      <ProductsSection
        products={products}
        onAddProduct={() => {
          setEditingProduct(null);
          setIsProductModalOpen(true);
        }}
        onEditProduct={(prod) => {
          setEditingProduct(prod);
          setIsProductModalOpen(true);
        }}
        onDeleteProduct={(prod) => setDeleteTarget(prod)}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
        agents={agents}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget ? (deleteTarget.name_product_ar || deleteTarget.name_product_en) : ''}
      />

      {/* Floating Bottom Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

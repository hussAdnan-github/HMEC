'use client';

import React, { useState } from 'react';
import { ProductsSection } from '@/components/dashboard/ProductsSection';
import { ProductItem, initialProducts } from '@/data/dashboardMockData';
import { ProductModal, DeleteConfirmModal } from '@/components/dashboard/Modals';

export default function ProductsDashboardPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);

  const handleSaveProduct = (prodData: Partial<ProductItem>) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? ({ ...p, ...prodData } as ProductItem) : p))
      );
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        name: prodData.name || 'منتج جديد',
        brand: prodData.brand || 'شنايدر إلكتريك',
        category: prodData.category || 'عام',
        price: prodData.price || 10000,
        sku: prodData.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
        stock: prodData.stock || 10,
        status: prodData.status || 'available',
        image: prodData.image || '⚡',
        description: prodData.description || '',
      };
      setProducts((prev) => [newProd, ...prev]);
    }
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <>
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
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.name || ''}
      />
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { OrdersSection } from '@/components/dashboard/OrdersSection';
import { OrderItem, initialOrders } from '@/data/dashboardMockData';
import { OrderModal, DeleteConfirmModal } from '@/components/dashboard/Modals';

export default function OrdersDashboardPage() {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<OrderItem | null>(null);

  const handleSaveOrder = (orderData: Partial<OrderItem>) => {
    if (editingOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? ({ ...o, ...orderData } as OrderItem) : o))
      );
    } else {
      const newOrder: OrderItem = {
        id: `ord-${Date.now()}`,
        orderNumber: orderData.orderNumber || `ORD-2025-${Math.floor(Math.random() * 900 + 100)}`,
        customerName: orderData.customerName || 'عميل جديد',
        customerPhone: orderData.customerPhone || '+967 ',
        customerCity: orderData.customerCity || 'المكلا',
        totalAmount: orderData.totalAmount || 50000,
        status: orderData.status || 'new',
        createdAt: new Date().toISOString().split('T')[0],
        itemsCount: orderData.itemsCount || 1,
        notes: orderData.notes || '',
      };
      setOrders((prev) => [newOrder, ...prev]);
    }
    setEditingOrder(null);
  };

  const handleOrderStatusChange = (orderId: string, status: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <OrdersSection
        orders={orders}
        onAddOrder={() => {
          setEditingOrder(null);
          setIsOrderModalOpen(true);
        }}
        onEditOrder={(ord) => {
          setEditingOrder(ord);
          setIsOrderModalOpen(true);
        }}
        onDeleteOrder={(ord) => setDeleteTarget(ord)}
        onStatusChange={handleOrderStatusChange}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSave={handleSaveOrder}
        order={editingOrder}
        onStatusChange={handleOrderStatusChange}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.orderNumber || ''}
      />
    </>
  );
}

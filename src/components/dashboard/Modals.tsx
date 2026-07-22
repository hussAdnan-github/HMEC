'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Package, FolderPlus, MapPin, ShoppingBag } from 'lucide-react';
import { ProductItem, ProjectItem, BranchItem, OrderItem } from '@/data/dashboardMockData';

// --- Modal 1: Add/Edit Product Modal ---
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<ProductItem>) => void;
  initialData?: ProductItem | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'شنايدر إلكتريك',
    category: 'قواطع وحماية',
    price: 10000,
    sku: '',
    stock: 10,
    status: 'available' as 'available' | 'low' | 'out_of_stock',
    image: '⚡',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        brand: initialData.brand,
        category: initialData.category,
        price: initialData.price,
        sku: initialData.sku,
        stock: initialData.stock,
        status: initialData.status,
        image: initialData.image,
        description: initialData.description || '',
      });
    } else {
      setFormData({
        name: '',
        brand: 'شنايدر إلكتريك',
        category: 'قواطع وحماية',
        price: 10000,
        sku: `SKU-${Math.floor(Math.random() * 9000 + 1000)}`,
        stock: 10,
        status: 'available',
        image: '⚡',
        description: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {initialData ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم المنتج الكهربائي *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: قاطع كهربائي ثلاثي شنايدر 100A"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">العلامة التجارية</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="شنايدر إلكتريك">شنايدر إلكتريك</option>
                <option value="إيه بي بي (ABB)">إيه بي بي (ABB)</option>
                <option value="لوغراند (Legrand)">لوغراند (Legrand)</option>
                <option value="فيليبس (Philips)">فيليبس (Philips)</option>
                <option value="سيمنز (Siemens)">سيمنز (Siemens)</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">فئة المنتج</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="قواطع وحماية">قواطع وحماية</option>
                <option value="أنظمة طاقة شمسية">أنظمة طاقة شمسية</option>
                <option value="إنارة LED">إنارة LED</option>
                <option value="أسلاك وكابلات">أسلاك وكابلات</option>
                <option value="لوحات توزيع">لوحات توزيع</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">السعر الفردي (ر.ي) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">كمية المخزون *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">رمز الـ SKU</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">وصف المنتج</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="اكتب مواصفات المنتج التفصيلية..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Check className="w-4 h-4" />
              حفظ المنتج
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 2: Add/Edit Project Modal ---
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<ProjectItem>) => void;
  initialData?: ProjectItem | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: 'المكلا',
    date: '2025',
    status: 'in_progress' as 'completed' | 'in_progress' | 'planned',
    category: 'توريدات كهربائية',
    budget: '$10,000',
    image: '🏢',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        client: initialData.client,
        location: initialData.location,
        date: initialData.date,
        status: initialData.status,
        category: initialData.category,
        budget: initialData.budget,
        image: initialData.image,
        description: initialData.description || '',
      });
    } else {
      setFormData({
        title: '',
        client: '',
        location: 'المكلا',
        date: new Date().getFullYear().toString(),
        status: 'in_progress',
        category: 'توريدات كهربائية',
        budget: '$25,000',
        image: '🏢',
        description: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FolderPlus className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {initialData ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم المشروع *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: مشروع تجهيز شبكة كهرباء مستشفى الشحر"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">العميل / الجهة *</label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="اسم العميل"
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">الموقع / المدينة</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="المكلا">المكلا</option>
                <option value="سيئون">سيئون</option>
                <option value="الشحر">الشحر</option>
                <option value="تريم">تريم</option>
                <option value="عدن">عدن</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">حالة المشروع</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="in_progress">قيد التنفيذ 🟡</option>
                <option value="completed">مكتمل ومسلّم 🟢</option>
                <option value="planned">مخطط له 🔵</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">الميزانية التقديرية</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">وصف المشروع والأنظمة الموردة</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Check className="w-4 h-4" />
              حفظ المشروع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 3: Add/Edit Branch Modal ---
interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (branch: Partial<BranchItem>) => void;
  initialData?: BranchItem | null;
}

export const BranchModal: React.FC<BranchModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: 'المكلا',
    address: '',
    phone: '',
    manager: '',
    email: '',
    status: 'active' as 'active' | 'maintenance' | 'closed',
    workingHours: '8:00 ص - 8:00 م',
    isMainBranch: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        city: initialData.city,
        address: initialData.address,
        phone: initialData.phone,
        manager: initialData.manager,
        email: initialData.email,
        status: initialData.status,
        workingHours: initialData.workingHours,
        isMainBranch: initialData.isMainBranch || false,
      });
    } else {
      setFormData({
        name: '',
        city: 'المكلا',
        address: '',
        phone: '+967 05 ',
        manager: '',
        email: 'branch@hmec-ye.com',
        status: 'active',
        workingHours: '8:00 ص - 8:00 م',
        isMainBranch: false,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {initialData ? 'تعديل بيانات الفرع' : 'إضافة فرع جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم الفرع *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: فرع سيئون - الشارع العام"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">المدينة</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">حالة الفرع</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="active">مفتوح ويعمل 🟢</option>
                <option value="maintenance">تحت الصيانة 🟡</option>
                <option value="closed">مغلق مؤقتاً 🔴</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">العنوان التفصيلي</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="اسم الشارع، المعلم المقابل..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">رقم هاتف الفرع</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">مدير / مسؤول الفرع</label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Check className="w-4 h-4" />
              حفظ الفرع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 4: Add/Edit Order Modal ---
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Partial<OrderItem>) => void;
  order?: OrderItem | null;
  onStatusChange?: (orderId: string, status: OrderItem['status']) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSave, order }) => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    customerPhone: '',
    customerCity: 'المكلا',
    totalAmount: 50000,
    status: 'new' as OrderItem['status'],
    itemsCount: 1,
    notes: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerCity: order.customerCity,
        totalAmount: order.totalAmount,
        status: order.status,
        itemsCount: order.itemsCount,
        notes: order.notes || '',
      });
    } else {
      setFormData({
        orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
        customerName: '',
        customerPhone: '+967 ',
        customerCity: 'المكلا',
        totalAmount: 50000,
        status: 'new',
        itemsCount: 1,
        notes: '',
      });
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {order ? `تفاصيل الطلب ${order.orderNumber}` : 'إضافة طلب توريد جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم العميل / المؤسسة *</label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="مثال: شركة حضرموت للمقاولات"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">رقم الهاتف</label>
              <input
                type="text"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">المدينة / المنطقة</label>
              <input
                type="text"
                value={formData.customerCity}
                onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">المبلغ الإجمالي (ر.ي)</label>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">حالة الطلب</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="new">طلب جديد 🔴</option>
                <option value="processing">قيد المعالجة 🟡</option>
                <option value="shipped">تم الشحن 🔵</option>
                <option value="completed">مكتمل 🟢</option>
                <option value="cancelled">ملغى ⚪</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">ملاحظات الطلب والمنتجات التابعة</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Check className="w-4 h-4" />
              حفظ الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 5: Delete Confirm Modal ---
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-sm shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 text-center">
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto text-xl font-black">
          🗑️
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-base text-foreground">تأكيد عملية الحذف النهائية</h3>
          <p className="text-xs text-muted-foreground">
            هل أنت تأكد من رغبتك في حذف "<span className="font-bold text-foreground">{title}</span>"؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-input text-xs font-bold hover:bg-muted"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold shadow-md shadow-destructive/20 hover:opacity-90"
          >
            نعم، قم بالحذف
          </button>
        </div>
      </div>
    </div>
  );
};

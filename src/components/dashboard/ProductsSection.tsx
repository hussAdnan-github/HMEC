'use client';

import React, { useState } from 'react';
import { Package, Search, Plus, Edit, Trash2, ShieldCheck, Filter } from 'lucide-react';
import { ProductItem } from '@/data/dashboardMockData';

interface ProductsSectionProps {
  products: ProductItem[];
  onAddProduct: () => void;
  onEditProduct: (product: ProductItem) => void;
  onDeleteProduct: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'all' || prod.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-6 rounded-3xl border border-border/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground">إدارة المنتجات والمخزون</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-black">
                {products.length} منتج
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              عرض وإضافة وتعديل وحذف المنتجات الكهربائية لمختلف الوكالات
            </p>
          </div>
        </div>

        <button
          onClick={onAddProduct}
          className="px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs sm:text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-card border border-border/80 p-4 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المنتج أو الـ SKU..."
            className="w-full pl-4 pr-10 py-2 rounded-2xl bg-background/50 border border-input text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-background/50 border border-input text-xs font-bold text-foreground"
          >
            <option value="all">كافة العلامات التجارية</option>
            <option value="شنايدر إلكتريك">شنايدر إلكتريك</option>
            <option value="إيه بي بي (ABB)">إيه بي بي (ABB)</option>
            <option value="لوغراند (Legrand)">لوغراند (Legrand)</option>
            <option value="فيليبس (Philips)">فيليبس (Philips)</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-background/50 border border-input text-xs font-bold text-foreground"
          >
            <option value="all">كافة الفئات</option>
            <option value="قواطع وحماية">قواطع وحماية</option>
            <option value="أنظمة طاقة شمسية">أنظمة طاقة شمسية</option>
            <option value="إنارة LED">إنارة LED</option>
            <option value="لوحات توزيع">لوحات توزيع</option>
          </select>
        </div>
      </div>

      {/* Empty State Banner when products array is empty */}
      {filteredProducts.length === 0 ? (
        <div className="bg-card text-card-foreground border border-dashed border-border/80 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto text-2xl">
            ⚡
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-extrabold text-base text-foreground">لا توجد منتجات مسجلة حتى الآن</h3>
            <p className="text-xs text-muted-foreground">
              ابدأ بإضافة أول منتج كهربائي لمركز حضرموت ليظهر في قوائم المعرض واللوحة.
            </p>
          </div>
          <button
            onClick={onAddProduct}
            className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs inline-flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            إضافة أول منتج الآن
          </button>
        </div>
      ) : (
        /* Data Table View */
        <div className="bg-card border border-border/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border font-bold">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">العلامة والفئة</th>
                  <th className="p-4">السعر الفردي</th>
                  <th className="p-4">المخزون والـ SKU</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-lg shrink-0">
                          {prod.image}
                        </div>
                        <div>
                          <span className="font-extrabold text-foreground block">{prod.name}</span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {prod.description || 'بدون وصف إضافي'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-primary block">{prod.brand}</span>
                        <span className="text-[11px] text-muted-foreground block">{prod.category}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-black text-foreground">{prod.price.toLocaleString()} ر.ي</span>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-foreground block">{prod.stock} قطعة</span>
                        <span className="text-[10px] text-muted-foreground block dir-ltr text-right">{prod.sku}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          prod.status === 'available'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : prod.status === 'low'
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                            : 'bg-red-500/10 text-red-600 border border-red-500/30'
                        }`}
                      >
                        {prod.status === 'available' ? 'متوفر 🟢' : prod.status === 'low' ? 'مخزون منخفض 🟡' : 'نفذ المخزون 🔴'}
                      </span>
                    </td>

                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditProduct(prod)}
                          className="p-2 rounded-xl border border-input hover:bg-muted text-foreground"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod)}
                          className="p-2 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

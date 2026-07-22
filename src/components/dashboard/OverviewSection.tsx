'use client';

import React from 'react';
import {
  Package,
  FolderKanban,
  Building2,
  ShoppingBag,
  Plus,
  Zap,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { ProductItem, ProjectItem, BranchItem, OrderItem } from '@/data/dashboardMockData';

interface OverviewSectionProps {
  products: ProductItem[];
  projects: ProjectItem[];
  branches: BranchItem[];
  orders: OrderItem[];
  onNavigateTab: (tab: string) => void;
  onOpenProductModal: () => void;
  onOpenProjectModal: () => void;
  onOpenBranchModal: () => void;
  onOpenOrderModal: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  products,
  projects,
  branches,
  orders,
  onNavigateTab,
  onOpenProductModal,
  onOpenProjectModal,
  onOpenBranchModal,
  onOpenOrderModal,
}) => {
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-primary/10 text-card-foreground border border-border/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary/10 text-primary">
                <Zap className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                أهلاً بك في لوحة تحكم مركز حضرموت الحديث (HMEC)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              إدارة المنتجات الكهربائية، المشاريع المنجزة، الفروع، محتوى صفحات الموقع، ومتابعة الطلبات بكل سهولة وسلاسة.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateTab('site_cms')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs hover:brightness-110 shadow-lg transition-all flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              إدارة محتوى الموقع
            </button>
            <button
              onClick={onOpenProductModal}
              className="px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              منتج جديد
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Products */}
        <div
          onClick={() => onNavigateTab('products')}
          className="bg-card hover:border-primary/50 text-card-foreground border border-border/80 p-5 rounded-3xl shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">إجمالي المنتجات</span>
            <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{products.length}</span>
            <span className="text-xs font-bold text-primary">المخزون</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">انقر لإدارة القائمة والمخزون</p>
        </div>

        {/* Card 2: Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-card hover:border-amber-500/50 text-card-foreground border border-border/80 p-5 rounded-3xl shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">الطلبات والاستفسارات</span>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{orders.length}</span>
            {newOrdersCount > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-bold animate-pulse">
                {newOrdersCount} جديد🔴
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">محدث فوراً</span>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">طلبات جملة وتوريدات سكنية</p>
        </div>

        {/* Card 3: Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-card hover:border-blue-500/50 text-card-foreground border border-border/80 p-5 rounded-3xl shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">المشاريع المسجلة</span>
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{projects.length}</span>
            <span className="text-xs font-bold text-blue-500">مشاريع HMEC</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">في المكلا وسيئون والشحر</p>
        </div>

        {/* Card 4: Branches */}
        <div
          onClick={() => onNavigateTab('branches')}
          className="bg-card hover:border-emerald-500/50 text-card-foreground border border-border/80 p-5 rounded-3xl shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">الفروع ومنافذ البيع</span>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{branches.length}</span>
            <span className="text-xs font-bold text-emerald-500">فروع حضرموت</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">فروع المركز والخدمة</p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-extrabold text-foreground text-base">إدارة محتوى الموقع العام (CMS)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              محدث ⚡
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            تحكّم في نصوص الصفحة الرئيسية، البنرات الترويجية، الماركات العالمية (شنايدر، ABB، لوغراند)، تقييمات العملاء، وأرقام التواصل ببطاقات تفاعلية مميزة.
          </p>
          <button
            onClick={() => onNavigateTab('site_cms')}
            className="w-full py-2.5 rounded-2xl bg-primary/10 text-primary font-extrabold text-xs hover:bg-primary hover:text-primary-foreground transition-all"
          >
            الانتقال لبطاقات إدارة محتوى الموقع
          </button>
        </div>

        <div className="bg-card border border-border/80 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-extrabold text-foreground text-base">إضافة سريعة وقوائم الجداول</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              عمليات متطابقة
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={onOpenProductModal}
              className="p-3 rounded-2xl bg-muted/40 hover:bg-muted font-bold text-foreground flex items-center justify-center gap-1.5 border border-border"
            >
              <Plus className="w-4 h-4 text-primary" />
              إضافة منتج
            </button>
            <button
              onClick={onOpenProjectModal}
              className="p-3 rounded-2xl bg-muted/40 hover:bg-muted font-bold text-foreground flex items-center justify-center gap-1.5 border border-border"
            >
              <Plus className="w-4 h-4 text-blue-500" />
              إضافة مشروع
            </button>
            <button
              onClick={onOpenBranchModal}
              className="p-3 rounded-2xl bg-muted/40 hover:bg-muted font-bold text-foreground flex items-center justify-center gap-1.5 border border-border"
            >
              <Plus className="w-4 h-4 text-emerald-500" />
              إضافة فرع
            </button>
            <button
              onClick={onOpenOrderModal}
              className="p-3 rounded-2xl bg-muted/40 hover:bg-muted font-bold text-foreground flex items-center justify-center gap-1.5 border border-border"
            >
              <Plus className="w-4 h-4 text-amber-500" />
              إضافة طلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

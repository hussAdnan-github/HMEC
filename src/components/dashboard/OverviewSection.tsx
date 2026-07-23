'use client';

import React from 'react';
import {
  Package,
  FolderKanban,
  Building2,
  ShoppingBag,
   Zap,
 
} from 'lucide-react';
import { ProductItem, ProjectItem, BranchItem, OrderItem } from '@/data/dashboardMockData';

interface OverviewSectionProps {
  products: ProductItem[];
  projects: ProjectItem[];
  branches: BranchItem[];
  orders: OrderItem[];
  onNavigateTab: (tab: string) => void;
 
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  products,
  projects,
  branches,
  orders,
  onNavigateTab,
 
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

      
      
    </div>
  );
};

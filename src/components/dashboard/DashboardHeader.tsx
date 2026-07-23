'use client';

import React from 'react';
import { Menu, X, Plus, Sun, Moon, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  isMobileOpen: boolean;
  onToggleMobile: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapsed: () => void;
  onOpenAddProduct: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  showNotifications: boolean;
  onToggleNotifications: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isMobileOpen,
  onToggleMobile,
  isSidebarCollapsed,
  onToggleSidebarCollapsed,
  onOpenAddProduct,
  isDarkMode,
  onToggleDarkMode,
  showNotifications,
  onToggleNotifications,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl border border-input text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop collapse sidebar toggle */}
        <button
          onClick={onToggleSidebarCollapsed}
          className="hidden lg:flex p-2 rounded-xl border border-input text-muted-foreground hover:text-foreground hover:bg-muted"
          title="طي/توسيع القائمة الجانبية"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center text-primary-foreground font-black text-lg shadow-md shadow-primary/20">
            ⚡
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm sm:text-base text-foreground tracking-tight block leading-none">
              مركز حضرموت الحديث
            </span>
            <span className="text-[10px] font-bold text-primary tracking-wide">
              لوحة تحكم إدارة المحتوى | HMEC Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Product Button */}
          {/* <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenAddProduct}
              className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 shadow-sm transition-opacity flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              إضافة منتج
            </button>
          </div> */}

        {/* Theme Mode Switch */}
        {/* <button
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-xl border border-input text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button> */}

     

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2 pr-2 border-r border-border">
          <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
            M
          </div>
          <div className="hidden lg:block text-right">
            <span className="font-bold text-xs block text-foreground leading-none">مدير النظام</span>
            <span className="text-[10px] text-muted-foreground">المدير العام لـ HMEC</span>
          </div>
        </div>
      </div>
    </header>
  );
};

'use client';

import { useState, useMemo } from 'react';
import type { ApiProduct, ApiContent } from '@/types/api';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { Search, ArrowLeft, ArrowRight, Package, SlidersHorizontal } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductCard from '@/components/products/ProductCard';

interface ProductsProps {
  products?: ApiProduct[];
  content?: ApiContent;
  isHomePage?: boolean;
}

export default function Products({ products = [], isHomePage = false }: ProductsProps) {
  const tSections = useTranslations('Sections');
  const tProducts = useTranslations('Products');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');

  const safeProducts = useMemo(() => (Array.isArray(products) ? products : []), [products]);

  // Extract unique groups/categories for filtering with count
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { all: safeProducts.length };
    safeProducts.forEach((p) => {
      if (p.number_group) {
        counts[p.number_group] = (counts[p.number_group] || 0) + 1;
      }
    });
    return counts;
  }, [safeProducts]);

  const groups = useMemo(() => {
    const allGroups = safeProducts
      .map((p) => p.number_group)
      .filter((g): g is string => !!g);
    return ['all', ...Array.from(new Set(allGroups))];
  }, [safeProducts]);

  // Filter products based on search and selected group
  const filteredProducts = useMemo(() => {
    return safeProducts.filter((product) => {
      const name = locale === 'ar' ? product.name_product_ar : (product.name_product_en || product.name_product_ar);
      const desc = locale === 'ar' ? product.description_product_ar : (product.description_product_en || product.description_product_ar);
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.number_product && product.number_product.includes(searchQuery));

      const matchesGroup = selectedGroup === 'all' || product.number_group === selectedGroup;

      return matchesSearch && matchesGroup && product.is_active;
    });
  }, [safeProducts, searchQuery, selectedGroup, locale]);

  // If homepage, display only first 3 items
  const displayProducts = useMemo(() => {
    return isHomePage ? filteredProducts.slice(0, 3) : filteredProducts;
  }, [filteredProducts, isHomePage]);

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden animate-fade-in" id="products">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge={`📦 ${tSections('products')}`}
          titlePart1={tProducts('title_part1')}
          titlePart2={tProducts('title_part2')}
          subtitle={tProducts('subtitle')}
        />

        {/* Filters & Search Toolbar - Hidden on Homepage */}
        {!isHomePage && (
          <div className="flex flex-col gap-6 mb-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md w-full">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Search Field */}
              <div className="relative w-full md:max-w-md">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  placeholder={tProducts('search_placeholder')}
                  className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 text-sm font-semibold placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Counter status */}
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200/60">
                <SlidersHorizontal size={16} className="text-primary" />
                {locale === 'ar' ? `عدد المنتجات: ${filteredProducts.length}` : `Products Count: ${filteredProducts.length}`}
              </div>

            </div>

            {/* Group Category Filter Tabs */}
            <div className="flex gap-2 flex-wrap items-center pt-4 border-t border-slate-100">
              {groups.map((group) => {
                const count = groupCounts[group] || 0;
                const isSelected = selectedGroup === group;

                return (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={cn(
                      "px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 border",
                      isSelected
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/50 hover:bg-slate-100"
                    )}
                  >
                    <span>{group === 'all' ? tProducts('all_categories') : group}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-black",
                        isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View More Products Button - Always Visible on Homepage */}
            {isHomePage && (
              <div className="text-center mt-16">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-extrabold text-lg rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {tCommon('view_more_products')}
                  {locale === 'ar' ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-1">{tProducts('no_products')}</h3>
          </div>
        )}

      </div>
    </section>
  );
}

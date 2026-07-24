'use client';

import { useState, useMemo, useEffect } from 'react';
import type { ApiProduct, ApiContent, ApiAgent } from '@/types/api';
import { cn, getImageUrl } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { Search, ArrowLeft, ArrowRight, Package, SlidersHorizontal, Award } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductCard from '@/components/products/ProductCard';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ProductsProps {
  products?: ApiProduct[];
  content?: ApiContent;
  isHomePage?: boolean;
  agents?: ApiAgent[];
  selectedAgentId?: string;
  agentCounts?: Record<string, number>;
}

export default function Products({ products = [], isHomePage = false, agents = [], selectedAgentId, agentCounts = {} }: ProductsProps) {
  const tSections = useTranslations('Sections');
  const tProducts = useTranslations('Products');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Debounce search query and push to router
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) {
        params.set('search', searchQuery);
      } else {
        params.delete('search');
      }
      
      // Only push if the search param actually changed
      if (params.get('search') !== searchParams.get('search')) {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, pathname, router, searchParams]);

  const safeProducts = useMemo(() => (Array.isArray(products) ? products : []), [products]);

  // Filter out inactive products (active status should ideally be handled by the server, but we double-check)
  const filteredProducts = useMemo(() => {
    return safeProducts.filter((product) => product.is_active);
  }, [safeProducts]);

  // If homepage, display only first 3 items
  const displayProducts = useMemo(() => {
    return isHomePage ? filteredProducts.slice(0, 3) : filteredProducts;
  }, [filteredProducts, isHomePage]);

  const handleAgentClick = (agentId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (agentId) {
      params.set('agent', agentId);
    } else {
      params.delete('agent');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="py-12  bg-slate-50/50 relative overflow-hidden animate-fade-in" id="products">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <SectionHeader
     
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

            {/* Agents (Brands) Filter Tabs */}
            {agents && agents.length > 0 && (
              <div className="flex gap-2 flex-wrap items-center pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleAgentClick()}
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 border",
                    !selectedAgentId
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/50 hover:bg-slate-100"
                  )}
                >
                  <span>{locale === 'ar' ? 'جميع الوكلاء' : 'All Brands'}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black",
                      !selectedAgentId ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {agentCounts['all'] || 0}
                  </span>
                </button>
                
                {agents.map((agent) => {
                  const isSelected = selectedAgentId === agent.id.toString();
                  const count = agentCounts[agent.id] || 0;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => handleAgentClick(agent.id.toString())}
                      className={cn(
                        "px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 border",
                        isSelected
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/50 hover:bg-slate-100"
                      )}
                    >
                      <span>{locale === 'ar' ? agent.name_ar : (agent.name_en || agent.name_ar)}</span>
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
            )}

            
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

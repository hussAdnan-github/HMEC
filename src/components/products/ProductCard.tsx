'use client';

import { useState } from 'react';
import type { ApiProduct } from '@/types/api';
import { getImageUrl, cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { Eye, Info, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/routing';

interface ProductCardProps {
  product: ApiProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const tProducts = useTranslations('Products');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const name =
    locale === 'ar'
      ? product.name_product_ar
      : product.name_product_en || product.name_product_ar;

  const desc =
    locale === 'ar'
      ? product.description_product_ar
      : product.description_product_en || product.description_product_ar;

  const startingUnit = product.name_uint?.[0];
  const brandName =
    locale === 'ar'
      ? product.agent_name_ar
      : product.agent_name_en || product.agent_name_ar;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id.toString(),
      name,
      price: startingUnit?.price || '0.00',
      image: getImageUrl(product.image),
      unit: startingUnit
        ? locale === 'ar'
          ? startingUnit.name_unit_ar
          : startingUnit.name_unit_en || startingUnit.name_unit_ar
        : undefined
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-[0_25px_50px_rgba(27,166,156,0.18)] hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden group">
      {/* Top Status & Brand Badges */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold backdrop-blur-md shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          {locale === 'ar' ? 'متوفر' : 'In Stock'}
        </span>

        {brandName && (
          <span className="bg-slate-900/80 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
            {brandName}
          </span>
        )}
      </div>

      {/* Product Image Link */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/80 border-b border-slate-100 shrink-0 block"
      >
        <img
          src={getImageUrl(product.image)}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Image Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View Details Floating CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
          <span className="px-5 py-2.5 rounded-full bg-white/95 text-slate-900 font-extrabold text-xs flex items-center gap-2 shadow-xl border border-white/40">
            <Eye size={15} className="text-primary" />
            {tProducts('view_details')}
          </span>
        </div>

        {/* Group Category Tag */}
        {product.number_group && (
          <span className="absolute bottom-3 right-3 bg-white/95 text-slate-700 text-[10px] font-extrabold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm border border-slate-100">
            {product.number_group}
          </span>
        )}
      </Link>

      {/* Product Body Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Code Tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-md">
            {tProducts('product_number')}: {product.number_product || '#'}
          </span>
        </div>

        {/* Product Title Link */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-5 font-medium">
          {desc}
        </p>

        <div className="mt-auto flex flex-col gap-4">
          {/* Price Banner */}
          {startingUnit && (
            <div className="bg-gradient-to-r from-primary-subtle/50 via-slate-50 to-primary-subtle/30 p-3.5 rounded-2xl border border-primary/10 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {tProducts('price_starts_from')}
              </span>
              <span className="text-base font-black text-primary flex items-baseline gap-1">
                {startingUnit.price}{' '}
                <span className="text-[11px] font-bold text-slate-500">
                  /{' '}
                  {locale === 'ar'
                    ? startingUnit.name_unit_ar
                    : startingUnit.name_unit_en || startingUnit.name_unit_ar}
                </span>
              </span>
            </div>
          )}

          {/* Interactive Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full py-3.5 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md',
                isAdded
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20 scale-[0.99]'
                  : 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5'
              )}
            >
              <ShoppingCart size={16} />
              {isAdded ? tCommon('added_to_cart') : tCommon('add_to_cart')}
            </button>

            <Link
              href={`/products/${product.id}`}
              className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/50 bg-slate-50 hover:bg-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Info size={15} className="text-primary" />
              {tProducts('view_details')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

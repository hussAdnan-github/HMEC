'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { ApiProduct, ApiContent } from '@/types/api';
import { getImageUrl } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Tag,
  Share2,
  Check,
  ArrowUpRight
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGallery from '@/components/products/ProductGallery';
import ProductUnitSelector from '@/components/products/ProductUnitSelector';
import ProductGuarantees from '@/components/products/ProductGuarantees';
import ProductCard from '@/components/products/ProductCard';

interface ProductDetailsClientProps {
  product: ApiProduct;
  content?: ApiContent;
  relatedProducts?: ApiProduct[];
}

export default function ProductDetailsClient({
  product,
  content,
  relatedProducts = []
}: ProductDetailsClientProps) {
  const locale = useLocale();
  const tCommon = useTranslations('Common');
  const tProducts = useTranslations('Products');

  const [copied, setCopied] = useState<boolean>(false);

  const name =
    locale === 'ar'
      ? product.name_product_ar
      : product.name_product_en || product.name_product_ar;

  const desc =
    locale === 'ar'
      ? product.description_product_ar
      : product.description_product_en || product.description_product_ar;

  const brandName =
    locale === 'ar'
      ? product.agent_name_ar
      : product.agent_name_en || product.agent_name_ar;

  const units = product.name_uint || [];

  // All images array
  const allImages = [
    getImageUrl(product.image),
    ...(product.product_images?.map((img) => getImageUrl(img.image)) || [])
  ].filter((img, idx, self) => self.indexOf(img) === idx);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Filter related products by agent or group
  const sameCategoryProducts = relatedProducts
    .filter(
      (p) =>
        p.agent === product.agent ||
        p.number_group === product.number_group
    )
    .slice(0, 3);

  const breadcrumbItems = [
    { label: locale === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { label: locale === 'ar' ? 'المنتجات' : 'Products', href: '/products' },
    { label: name }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar contactInfo={content} />

      {/* Breadcrumb Header */}
      <div className="pt-32 pb-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_30%_50%,_rgba(27,166,156,0.25)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Details Section */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Top Navigation & Share Toolbar */}
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
            >
              {locale === 'ar' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              {locale === 'ar' ? 'العودة لقائمة المنتجات' : 'Back to Products'}
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              {copied ? (
                <Check size={16} className="text-emerald-500" />
              ) : (
                <Share2 size={16} />
              )}
              {copied
                ? locale === 'ar'
                  ? 'تم نسخ الرابط'
                  : 'Link Copied'
                : locale === 'ar'
                ? 'مشاركة المنتج'
                : 'Share'}
            </button>
          </div>

          {/* Product Layout Grid */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden mb-16">
            <div className="grid lg:grid-cols-12 gap-8 p-6 lg:p-10">
              {/* Media Gallery (6 cols) */}
              <div className="lg:col-span-6">
                <ProductGallery
                  images={allImages}
                  productName={name}
                  categoryGroup={product.number_group}
                />
              </div>

              {/* Info & Purchase Options (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Brand & Code Header */}
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    {brandName && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-subtle text-primary font-bold text-xs">
                        <Building size={14} />
                        {brandName}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                      <Tag size={14} />
                      {tProducts('product_number')}: {product.number_product || '#'}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                    {name}
                  </h1>

                  {/* Description */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 text-slate-600 text-sm leading-relaxed">
                    <h3 className="font-bold text-slate-800 mb-2 text-xs uppercase tracking-wider">
                      {locale === 'ar' ? 'وصف المنتج' : 'Product Description'}
                    </h3>
                    <p className="whitespace-pre-line">{desc}</p>
                  </div>

                  {/* Unit Selector & Quantity Control */}
                  <ProductUnitSelector
                    productId={product.id}
                    productName={name}
                    productCode={product.number_product}
                    productImage={getImageUrl(product.image)}
                    units={units}
                    whatsappContact={content?.whatsapp}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Guarantees & Features */}
          <ProductGuarantees />

          {/* Related Products Section */}
          {sameCategoryProducts.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-subtle text-primary font-bold text-xs mb-2">
                    📦 {locale === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {locale === 'ar' ? 'قد يعجبك أيضاً' : 'You Might Also Like'}
                  </h3>
                </div>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  {tCommon('browse_products')}
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sameCategoryProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer content={content} />
    </div>
  );
}

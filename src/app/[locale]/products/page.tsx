import Products from '@/components/Products';
import { getProductsServerAction } from '@/actions/productActions';
import { Link } from '@/i18n/routing';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default async function ProductsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const productsRes = await getProductsServerAction();
  const products = productsRes?.data?.results || [];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col flex-1">
      {/* Top Spacer & Breadcrumb */}
      <div className="pt-32 pb-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_50%,_rgba(27,166,156,0.2)_0%,_transparent_50%)]" />
      </div>

      {/* Catalog */}
      <div className="flex-1">
        <Products products={products} isHomePage={false} />
      </div>
    </main>
  );
}

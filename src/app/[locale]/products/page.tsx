import Products from '@/components/Products';
import { getProductsServerAction, getAgentsServerAction } from '@/actions/products.actions';
import { Link } from '@/i18n/routing';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default async function ProductsPage({
 
  searchParams
}: {
 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const agentParam = resolvedSearchParams?.agent;
  const searchParam = resolvedSearchParams?.search;

  const [productsRes, agentsRes, allProductsRes] = await Promise.all([
    getProductsServerAction({ 
      agent: typeof agentParam === 'string' ? agentParam : undefined,
      search: typeof searchParam === 'string' ? searchParam : undefined
    }),
    getAgentsServerAction(),
    getProductsServerAction({ 
      search: typeof searchParam === 'string' ? searchParam : undefined
    }) // To calculate total counts for each agent
  ]);

  const products = productsRes?.data?.results || [];
  const allProducts = allProductsRes?.data?.results || [];
  const agents = agentsRes?.data?.results || agentsRes?.data || [];

  // Calculate agent counts from all products
  const agentCounts: Record<string, number> = { all: allProducts.length };
  allProducts.forEach((p) => {
    if (p.agent) {
      agentCounts[p.agent] = (agentCounts[p.agent] || 0) + 1;
    }
  });

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col flex-1">
      {/* Top Spacer & Breadcrumb */}
      <div className="pt-32 pb-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_50%,_rgba(27,166,156,0.2)_0%,_transparent_50%)]" />
      </div>

      {/* Catalog */}
      <div className="flex-1">
        <Products 
          products={products} 
          agents={Array.isArray(agents) ? agents : []} 
          agentCounts={agentCounts}
          selectedAgentId={typeof agentParam === 'string' ? agentParam : undefined}
          isHomePage={false} 
        />
      </div>
    </main>
  );
}

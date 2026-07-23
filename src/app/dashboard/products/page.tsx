import { getProductsServerAction, getAgentsServerAction } from '@/actions/productActions';
import ProductsDashboardClient from '@/components/dashboard/ProductsDashboardClient';

export const revalidate = 0; // Disable server-side caching for the dashboard page

export default async function ProductsDashboardPage() {
  const [productsRes, agentsRes] = await Promise.all([
    getProductsServerAction(),
    getAgentsServerAction()
  ]);

  const initialProducts = productsRes?.data?.results || [];
  const agents = agentsRes?.data?.results || [];

  return (
    <ProductsDashboardClient
      initialProducts={initialProducts}
      agents={agents}
    />
  );
}

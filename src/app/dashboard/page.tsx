'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { ProductItem, ProjectItem, BranchItem, OrderItem, initialProducts, initialProjects, initialBranches, initialOrders } from '@/data/dashboardMockData';
import { ProductModal, ProjectModal, BranchModal, OrderModal } from '@/components/dashboard/Modals';

export default function OverviewDashboardPage() {
  const router = useRouter();

  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [branches, setBranches] = useState<BranchItem[]>(initialBranches);
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <>
      <OverviewSection
        products={products}
        projects={projects}
        branches={branches}
        orders={orders}
        onNavigateTab={(path) => {
          if (path === 'site_cms') router.push('/dashboard/site-cms');
          else if (path === 'products') router.push('/dashboard/products');
          else if (path === 'projects') router.push('/dashboard/projects');
          else if (path === 'branches') router.push('/dashboard/branches');
          else if (path === 'orders') router.push('/dashboard/orders');
          else router.push(`/dashboard/${path}`);
        }}
        onOpenProductModal={() => setIsProductModalOpen(true)}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={(prod) => {
          setProducts((prev) => [{ id: `prod-${Date.now()}`, ...prod } as ProductItem, ...prev]);
        }}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={(proj) => {
          setProjects((prev) => [{ id: `proj-${Date.now()}`, ...proj } as ProjectItem, ...prev]);
        }}
      />

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        onSave={(branch) => {
          setBranches((prev) => [{ id: `branch-${Date.now()}`, ...branch } as BranchItem, ...prev]);
        }}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSave={(ord) => {
          setOrders((prev) => [{ id: `ord-${Date.now()}`, ...ord } as OrderItem, ...prev]);
        }}
      />
    </>
  );
}

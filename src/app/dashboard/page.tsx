'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { ProductItem, ProjectItem, BranchItem, OrderItem, initialProducts, initialProjects, initialBranches, initialOrders } from '@/data/dashboardMockData';

export default function OverviewDashboardPage() {
  const router = useRouter();

  const [products] = useState<ProductItem[]>(initialProducts);
  const [projects] = useState<ProjectItem[]>(initialProjects);
  const [branches] = useState<BranchItem[]>(initialBranches);
  const [orders] = useState<OrderItem[]>(initialOrders);

  return (
    <OverviewSection
      products={products}
      projects={projects}
      branches={branches}
      orders={orders}
      onNavigateTab={(path) => {
        if (path === 'products') router.push('/dashboard/products');
        else if (path === 'projects') router.push('/dashboard/projects');
        else if (path === 'branches') router.push('/dashboard/branches');
        else if (path === 'orders') router.push('/dashboard/orders');
        else router.push(`/dashboard/${path}`);
      }}
    />
  );
}

'use client';

import React, { useState } from 'react';
import { BranchesSection } from '@/components/dashboard/BranchesSection';
import { BranchItem, initialBranches } from '@/data/dashboardMockData';
import { BranchModal, DeleteConfirmModal } from '@/components/dashboard/Modals';

export default function BranchesDashboardPage() {
  const [branches, setBranches] = useState<BranchItem[]>(initialBranches);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BranchItem | null>(null);

  const handleSaveBranch = (branchData: Partial<BranchItem>) => {
    if (editingBranch) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editingBranch.id ? ({ ...b, ...branchData } as BranchItem) : b))
      );
    } else {
      const newBranch: BranchItem = {
        id: `branch-${Date.now()}`,
        name: branchData.name || 'فرع جديد',
        city: branchData.city || 'المكلا',
        address: branchData.address || 'العنوان الرئيسي',
        phone: branchData.phone || '+967 05 000000',
        manager: branchData.manager || 'أخصائي الفرع',
        email: branchData.email || 'branch@hmec-ye.com',
        status: branchData.status || 'active',
        workingHours: branchData.workingHours || '8:00 ص - 8:00 م',
        isMainBranch: branchData.isMainBranch || false,
      };
      setBranches((prev) => [...prev, newBranch]);
    }
    setEditingBranch(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setBranches((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <BranchesSection
        branches={branches}
        onAddBranch={() => {
          setEditingBranch(null);
          setIsBranchModalOpen(true);
        }}
        onEditBranch={(branch) => {
          setEditingBranch(branch);
          setIsBranchModalOpen(true);
        }}
        onDeleteBranch={(branch) => setDeleteTarget(branch)}
      />

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        onSave={handleSaveBranch}
        initialData={editingBranch}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.name || ''}
      />
    </>
  );
}

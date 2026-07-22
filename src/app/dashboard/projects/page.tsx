'use client';

import React, { useState } from 'react';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { ProjectItem, initialProjects } from '@/data/dashboardMockData';
import { ProjectModal, DeleteConfirmModal } from '@/components/dashboard/Modals';

export default function ProjectsDashboardPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);

  const handleSaveProject = (projData: Partial<ProjectItem>) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...projData } as ProjectItem) : p))
      );
    } else {
      const newProj: ProjectItem = {
        id: `proj-${Date.now()}`,
        title: projData.title || 'مشروع جديد',
        client: projData.client || 'مؤسسة عامة',
        location: projData.location || 'المكلا',
        date: projData.date || '2025',
        status: projData.status || 'in_progress',
        category: projData.category || 'مشاريع كهربائية',
        budget: projData.budget || '$50,000',
        image: projData.image || '🏢',
        description: projData.description || '',
        brandsUsed: projData.brandsUsed || ['شنايدر إلكتريك'],
      };
      setProjects((prev) => [newProj, ...prev]);
    }
    setEditingProject(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <ProjectsSection
        projects={projects}
        onAddProject={() => {
          setEditingProject(null);
          setIsProjectModalOpen(true);
        }}
        onEditProject={(proj) => {
          setEditingProject(proj);
          setIsProjectModalOpen(true);
        }}
        onDeleteProject={(proj) => setDeleteTarget(proj)}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.title || ''}
      />
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { ProjectModal, DeleteConfirmModal } from '@/components/dashboard/Modals';
import { ApiProject, ApiAgent } from '@/types/api';
import { 
  createProjectServerAction, 
  updateProjectServerAction, 
  deleteProjectServerAction,
  addProjectImageServerAction,
  deleteProjectImageServerAction,
  getProjectByIdServerAction
} from '@/actions/projectActions';
import { Loader2 } from 'lucide-react';
import { ToastNotification, ToastMessage } from '@/components/ui/ToastNotification';

interface ProjectsDashboardClientProps {
  initialProjects: ApiProject[];
  agents: ApiAgent[];
}

export default function ProjectsDashboardClient({ 
  initialProjects = [], 
  agents = [] 
}: ProjectsDashboardClientProps) {
  const [projects, setProjects] = useState<ApiProject[]>(initialProjects);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ApiProject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ApiProject | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleSaveProject = async (
    formData: FormData,
    newSubImages: File[],
    deletedSubImageIds: number[]
  ) => {
    setIsSubmitting(true);
    try {
      let projectId: number | string | undefined;
      const isEditing = !!editingProject;

      if (editingProject) {
        // Update project
        const res = await updateProjectServerAction(editingProject.id, formData);
        if (res.success && res.data) {
          projectId = res.data.id;
        } else {
          setToast({ type: 'error', message: res.error || 'حدث خطأ أثناء تعديل بيانات المشروع' });
          return;
        }
      } else {
        // Create project
        const res = await createProjectServerAction(formData);
        if (res.success && res.data) {
          projectId = res.data.id;
        } else {
          setToast({ type: 'error', message: res.error || 'حدث خطأ أثناء إضافة المشروع الجديد' });
          return;
        }
      }

      if (projectId) {
        // 1. Delete removed sub-images from server
        if (deletedSubImageIds && deletedSubImageIds.length > 0) {
          for (const imgId of deletedSubImageIds) {
            await deleteProjectImageServerAction(imgId);
          }
        }

        // 2. Upload new sub-images to /gallery/projectimage/
        if (newSubImages && newSubImages.length > 0) {
          for (const file of newSubImages) {
            const subRes = await addProjectImageServerAction(projectId, file);
            if (!subRes.success) {
              setToast({ type: 'error', message: subRes.error || 'فشل رفع إحدى الصور الفرعية للمشروع' });
            }
          }
        }

        // 3. Fetch latest project with full updated project_images
        const updatedProject = await getProjectByIdServerAction(projectId);
        if (updatedProject) {
          if (isEditing) {
            setProjects((prev) =>
              prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
            );
            setToast({ type: 'success', message: 'تم تعديل بيانات المشروع بنجاح ⚡' });
          } else {
            setProjects((prev) => [updatedProject, ...prev]);
            setToast({ type: 'success', message: 'تمت إضافة المشروع الجديد بنجاح ⚡' });
          }
        } else {
          setToast({ type: 'success', message: isEditing ? 'تم التعديل بنجاح' : 'تمت الإضافة بنجاح' });
        }
      }
    } catch (error: any) {
      console.error('Error saving project:', error);
      setToast({ type: 'error', message: error?.message || 'فشلت العملية، يرجى المحاولة مرة أخرى' });
    } finally {
      setIsSubmitting(false);
      setEditingProject(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const res = await deleteProjectServerAction(deleteTarget.id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setToast({ type: 'success', message: 'تم حذف المشروع بنجاح 🗑️' });
      } else {
        setToast({ type: 'error', message: res.error || 'حدث خطأ أثناء حذف المشروع من السيرفر' });
      }
    } catch (error: any) {
      console.error('Error deleting project:', error);
      setToast({ type: 'error', message: error?.message || 'فشل حذف المشروع، يرجى التحقق من الاتصال بالشبكة' });
    } finally {
      setIsSubmitting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="relative">
      {/* Global loading spinner overlay during submit/delete */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-card border border-border p-6 rounded-3xl shadow-xl flex items-center gap-3 text-sm font-bold text-foreground">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span>جاري معالجة طلبك</span>
          </div>
        </div>
      )}

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
        agents={agents}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget ? (deleteTarget.name_ar || deleteTarget.name_en) : ''}
      />

      {/* Floating Bottom Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

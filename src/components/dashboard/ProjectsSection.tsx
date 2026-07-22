'use client';

import React, { useState } from 'react';
import { FolderKanban, Search, Plus, Edit, Trash2, MapPin, Building, Calendar } from 'lucide-react';
import { ProjectItem } from '@/data/dashboardMockData';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: () => void;
  onEditProject: (project: ProjectItem) => void;
  onDeleteProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || proj.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-6 rounded-3xl border border-border/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground">إدارة المشاريع المنجزة والجارية</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-black">
                {projects.length} مشروع
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              عرض وإضافة وتعديل وحذف مشاريع التوريدات الكهربائية في المكلا والمحافظات
            </p>
          </div>
        </div>

        <button
          onClick={onAddProject}
          className="px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs sm:text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع جديد
        </button>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-card border border-border/80 p-4 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المشروع، العميل، أو المدينة..."
            className="w-full pl-4 pr-10 py-2 rounded-2xl bg-background/50 border border-input text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3.5 py-2 rounded-2xl bg-background/50 border border-input text-xs font-bold text-foreground w-full md:w-auto"
        >
          <option value="all">كافة الحالات</option>
          <option value="in_progress">قيد التنفيذ 🟡</option>
          <option value="completed">مكتمل ومسلّم 🟢</option>
          <option value="planned">مخطط له 🔵</option>
        </select>
      </div>

      {/* Empty State Banner */}
      {filteredProjects.length === 0 ? (
        <div className="bg-card text-card-foreground border border-dashed border-border/80 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mx-auto text-2xl">
            🏢
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-extrabold text-base text-foreground">لا توجد مشاريع مسجلة حتى الآن</h3>
            <p className="text-xs text-muted-foreground">
              سجل أول مشروع منجز أو قيد التنفيذ لإظهاره لعملاء ومهندسي المركز.
            </p>
          </div>
          <button
            onClick={onAddProject}
            className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs inline-flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            إضافة أول مشروع الآن
          </button>
        </div>
      ) : (
        /* Data Table View */
        <div className="bg-card border border-border/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border font-bold">
                <tr>
                  <th className="p-4">اسم المشروع</th>
                  <th className="p-4">العميل والموقع</th>
                  <th className="p-4">الميزانية والتاريخ</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg shrink-0">
                          {proj.image}
                        </div>
                        <div>
                          <span className="font-extrabold text-foreground block">{proj.title}</span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {proj.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-foreground block flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-muted-foreground" />
                          {proj.client}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {proj.location}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-black text-foreground block">{proj.budget}</span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          عام {proj.date}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          proj.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : proj.status === 'in_progress'
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                            : 'bg-blue-500/10 text-blue-600 border border-blue-500/30'
                        }`}
                      >
                        {proj.status === 'completed' ? 'مكتمل ومسلّم 🟢' : proj.status === 'in_progress' ? 'قيد التنفيذ 🟡' : 'مخطط له 🔵'}
                      </span>
                    </td>

                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditProject(proj)}
                          className="p-2 rounded-xl border border-input hover:bg-muted text-foreground"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProject(proj)}
                          className="p-2 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

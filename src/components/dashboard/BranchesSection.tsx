'use client';

import React, { useState } from 'react';
import { Building2, Search, Plus, Edit, Trash2, MapPin, Phone, User, Clock } from 'lucide-react';
import { BranchItem } from '@/data/dashboardMockData';

interface BranchesSectionProps {
  branches: BranchItem[];
  onAddBranch: () => void;
  onEditBranch: (branch: BranchItem) => void;
  onDeleteBranch: (branch: BranchItem) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  branches,
  onAddBranch,
  onEditBranch,
  onDeleteBranch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredBranches = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.manager.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || b.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-6 rounded-3xl border border-border/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground">إدارة الفروع ومنافذ البيع</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-black">
                {branches.length} فرع
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              عرض وإضافة وتعديل وحذف فروع المركز والمسؤولين في مختلف المدن
            </p>
          </div>
        </div>

        <button
          onClick={onAddBranch}
          className="px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs sm:text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة فرع جديد
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
            placeholder="ابحث باسم الفرع، المدينة، أو مسؤول الفرع..."
            className="w-full pl-4 pr-10 py-2 rounded-2xl bg-background/50 border border-input text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3.5 py-2 rounded-2xl bg-background/50 border border-input text-xs font-bold text-foreground w-full md:w-auto"
        >
          <option value="all">كافة الفروع</option>
          <option value="active">مفتوح ويعمل 🟢</option>
          <option value="maintenance">تحت الصيانة 🟡</option>
          <option value="closed">مغلق مؤقتاً 🔴</option>
        </select>
      </div>

      {/* Empty State Banner */}
      {filteredBranches.length === 0 ? (
        <div className="bg-card text-card-foreground border border-dashed border-border/80 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-2xl">
            🏬
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-extrabold text-base text-foreground">لا توجد فروع مسجلة حتى الآن</h3>
            <p className="text-xs text-muted-foreground">
              أضف فرعك الرئيسي وفروع المدن المعتمدة لإتاحة بيانتها للعملاء والزوار.
            </p>
          </div>
          <button
            onClick={onAddBranch}
            className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs inline-flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            إضافة أول فرع الآن
          </button>
        </div>
      ) : (
        /* Data Table View */
        <div className="bg-card border border-border/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border font-bold">
                <tr>
                  <th className="p-4">اسم الفرع والمدينة</th>
                  <th className="p-4">العنوان ووقات العمل</th>
                  <th className="p-4">مسؤول الفرع والهاتف</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-extrabold shrink-0">
                          🏢
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-foreground">{branch.name}</span>
                            {branch.isMainBranch && (
                              <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-black">
                                الفرع الرئيسي
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-muted-foreground block">{branch.city}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-foreground block flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {branch.address}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {branch.workingHours}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-foreground block flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          {branch.manager}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 dir-ltr text-right">
                          <Phone className="w-3.5 h-3.5" />
                          {branch.phone}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          branch.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : branch.status === 'maintenance'
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                            : 'bg-red-500/10 text-red-600 border border-red-500/30'
                        }`}
                      >
                        {branch.status === 'active' ? 'مفتوح ويعمل 🟢' : branch.status === 'maintenance' ? 'تحت الصيانة 🟡' : 'مغلق مؤقتاً 🔴'}
                      </span>
                    </td>

                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditBranch(branch)}
                          className="p-2 rounded-xl border border-input hover:bg-muted text-foreground"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteBranch(branch)}
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

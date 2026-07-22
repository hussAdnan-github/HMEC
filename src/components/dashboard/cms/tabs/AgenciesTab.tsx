'use client';

import React from 'react';
import { Plus, Edit, Trash2, Sparkles } from 'lucide-react';
import { CmsAgency } from '@/data/siteCmsMockData';

interface AgenciesTabProps {
  agencies: CmsAgency[];
  onAddAgency: () => void;
  onEditAgency: (agency: CmsAgency) => void;
  onDeleteAgency: (id: string) => void;
}

export const AgenciesTab: React.FC<AgenciesTabProps> = ({
  agencies,
  onAddAgency,
  onEditAgency,
  onDeleteAgency,
}) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-card p-5 rounded-3xl border border-border shadow-sm">
        <div>
          <h3 className="font-extrabold text-foreground text-base">إدارة وكلاء العلامات التجارية المعتمدة</h3>
          <p className="text-xs text-muted-foreground mt-0.5">شنايدر إلكتريك، ABB، لوغراند، فيليبس، سيمنز</p>
        </div>
        <button
          onClick={onAddAgency}
          className="px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة وكالة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  {agency.logo}
                </span>
                {agency.isFeatured && (
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-black flex items-center gap-1 shadow">
                    <Sparkles className="w-3.5 h-3.5" />
                    علامة مفضلة
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-base text-foreground">{agency.name}</h4>
                <span className="text-xs text-primary font-bold block">{agency.nameEn}</span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{agency.description}</p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <button
                onClick={() => onEditAgency(agency)}
                className="p-2 rounded-xl border border-input hover:bg-muted text-foreground"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteAgency(agency.id)}
                className="p-2 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Plus, Edit, Trash2, Check, Sparkles } from 'lucide-react';
import { CmsService } from '@/data/siteCmsMockData';

interface ServicesTabProps {
  services: CmsService[];
  onAddService: () => void;
  onEditService: (service: CmsService) => void;
  onDeleteService: (id: string) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  onAddService,
  onEditService,
  onDeleteService,
}) => {
  return (
    <div className="space-y-5">
      {/* Top Header Card - Matching GoalsTab design */}
      <div className="flex items-center justify-between bg-card p-5 rounded-3xl border border-border shadow-sm">
        <div>
          <h3 className="font-extrabold text-foreground text-base">إدارة قائمة الخدمات المستقلة والميزات</h3>
          <p className="text-xs text-muted-foreground mt-0.5">التوريدات، أنظمة الطاقة الشمسية، الإنارة LED، والصيانة الهندسية</p>
        </div>
        <button
          onClick={onAddService}
          className="px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة خدمة جديدة
        </button>
      </div>

      {/* 3-Column Cards Grid - Matching GoalsTab layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((serv) => (
          <div
            key={serv.id}
            className="bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Top Icon & Badge Row */}
              <div className="flex items-center justify-between">
                <span className="text-3xl p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                  {serv.icon}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                  {serv.features.length} ميزات
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="font-extrabold text-base text-foreground leading-snug">{serv.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{serv.description}</p>
              </div>

              {/* Service Features Badges */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-muted-foreground block">ميزات الخدمة المخصصة:</span>
                <div className="flex flex-wrap gap-1.5">
                  {serv.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-muted/60 text-foreground text-[11px] font-bold border border-border flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-primary" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar - Matching GoalsTab */}
            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <button
                onClick={() => onEditService(serv)}
                className="p-2 rounded-xl border border-input text-muted-foreground hover:text-foreground hover:bg-muted"
                title="تعديل الخدمة"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteService(serv.id)}
                className="p-2 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10"
                title="حذف الخدمة"
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

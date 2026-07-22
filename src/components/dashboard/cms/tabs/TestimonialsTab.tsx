'use client';

import React from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { CmsTestimonial } from '@/data/siteCmsMockData';

interface TestimonialsTabProps {
  testimonials: CmsTestimonial[];
  onAddTestimonial: () => void;
  onEditTestimonial: (testimonial: CmsTestimonial) => void;
  onDeleteTestimonial: (id: string) => void;
  onToggleApproved: (id: string) => void;
}

export const TestimonialsTab: React.FC<TestimonialsTabProps> = ({
  testimonials,
  onAddTestimonial,
  onEditTestimonial,
  onDeleteTestimonial,
  onToggleApproved,
}) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-card p-5 rounded-3xl border border-border shadow-sm">
        <div>
          <h3 className="font-extrabold text-foreground text-base">إدارة تقييمات وآراء العملاء</h3>
          <p className="text-xs text-muted-foreground mt-0.5">آراء المهندسين والمقاولين والشركات في حضرموت</p>
        </div>
        <button
          onClick={onAddTestimonial}
          className="px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة تقييم جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2.5 rounded-2xl bg-primary/10 border border-primary/20">
                    {test.avatar}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{test.name}</h4>
                    <span className="text-[11px] text-muted-foreground block">
                      {test.role} - {test.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/40 p-3.5 rounded-2xl border border-border/50">
                "{test.text}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                <span>تاريخ: {test.date}</span>
                <button
                  onClick={() => onToggleApproved(test.id)}
                  className={`px-3 py-1 rounded-full font-bold text-[10px] transition-all ${
                    test.isApproved
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                  }`}
                >
                  {test.isApproved ? '🟢 معتمد ومصلان' : '🟡 قيد المراجعة'}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <button
                onClick={() => onEditTestimonial(test)}
                className="p-2 rounded-xl border border-input hover:bg-muted text-foreground"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteTestimonial(test.id)}
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

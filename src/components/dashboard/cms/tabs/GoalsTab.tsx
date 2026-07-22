'use client';

import React from 'react';
import { Plus, Edit, Trash2, Sparkles } from 'lucide-react';
import { CmsGoal } from '@/data/siteCmsMockData';

interface GoalsTabProps {
  goals: CmsGoal[];
  onAddGoal: () => void;
  onEditGoal: (goal: CmsGoal) => void;
  onDeleteGoal: (id: string) => void;
}

export const GoalsTab: React.FC<GoalsTabProps> = ({
  goals,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
}) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-card p-5 rounded-3xl border border-border shadow-sm">
        <div>
          <h3 className="font-extrabold text-foreground text-base">إدارة أهداف المركز وركائز التمايز</h3>
          <p className="text-xs text-muted-foreground mt-0.5">مميزات "لماذا تختارنا" والأهداف الاستراتيجية</p>
        </div>
        <button
          onClick={onAddGoal}
          className="px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          إضافة هدف جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map((g) => (
          <div
            key={g.id}
            className="bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  {g.icon}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {g.category}
                </span>
              </div>

              <h4 className="font-extrabold text-base text-foreground">{g.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{g.description}</p>
              {g.stat && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-accent/15 text-accent-foreground font-black text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  شارة الرقم: {g.stat}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <button
                onClick={() => onEditGoal(g)}
                className="p-2 rounded-xl border border-input text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteGoal(g.id)}
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

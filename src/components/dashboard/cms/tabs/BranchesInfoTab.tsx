'use client';

import React from 'react';
import { Building2, Save } from 'lucide-react';
import { BranchesInfoConfig } from '@/data/siteCmsMockData';

interface BranchesInfoTabProps {
  branchesInfo: BranchesInfoConfig;
  setBranchesInfo: React.Dispatch<React.SetStateAction<BranchesInfoConfig>>;
  onSave: (msg: string) => void;
}

export const BranchesInfoTab: React.FC<BranchesInfoTabProps> = ({
  branchesInfo,
  setBranchesInfo,
  onSave,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave('تم حفظ نصوص ومحتوى قسم الفروع بنجاح');
      }}
      className="bg-card text-card-foreground border border-border/80 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 max-w-4xl"
    >
      <div className="flex items-center gap-2.5 pb-4 border-b border-border">
        <Building2 className="w-6 h-6 text-primary" />
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-foreground">
            النص التوضيحي لقسم الفروع وخط الاستفسارات
          </h3>
          <p className="text-xs text-muted-foreground">صياغة عنوان الفروع وساعات استقبال الزوار في حضرموت</p>
        </div>
      </div>

      <div>
        <label className="block mb-1.5 font-bold text-foreground">العنوان الرئيسي لقسم الفروع</label>
        <input
          type="text"
          value={branchesInfo.introTitle}
          onChange={(e) => setBranchesInfo({ ...branchesInfo, introTitle: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block mb-1.5 font-bold text-foreground">النص الترحيبي لقسم الفروع</label>
        <textarea
          rows={3}
          value={branchesInfo.introSubtitle}
          onChange={(e) => setBranchesInfo({ ...branchesInfo, introSubtitle: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block mb-1.5 font-bold text-foreground">رقم الهاتف المباشر للفرع الرئيسي</label>
          <input
            type="text"
            value={branchesInfo.customerHotline}
            onChange={(e) => setBranchesInfo({ ...branchesInfo, customerHotline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
          />
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-foreground">أيام وأوقات استقبال الزوار</label>
          <input
            type="text"
            value={branchesInfo.workingDays}
            onChange={(e) => setBranchesInfo({ ...branchesInfo, workingDays: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-sm hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" />
          حفظ نصوص قسم الفروع
        </button>
      </div>
    </form>
  );
};

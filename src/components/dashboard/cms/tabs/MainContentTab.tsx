'use client';

import React from 'react';
import { FileText, Save } from 'lucide-react';
import { MainContentConfig, CmsAgency } from '@/data/siteCmsMockData';
import { LiveWebsitePreview } from '../LiveWebsitePreview';

interface MainContentTabProps {
  mainContent: MainContentConfig;
  setMainContent: React.Dispatch<React.SetStateAction<MainContentConfig>>;
  agencies: CmsAgency[];
  onSave: (msg: string) => void;
}

export const MainContentTab: React.FC<MainContentTabProps> = ({
  mainContent,
  setMainContent,
  agencies,
  onSave,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Form Inputs (7 cols) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave('تم حفظ نصوص المحتوى الرئيسي بنجاح');
        }}
        className="lg:col-span-7 bg-card text-card-foreground border border-border/80 p-6 rounded-3xl shadow-xl space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-extrabold text-base text-foreground">النصوص التعريفية لصفحة الاستقبال (Hero & About)</h3>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-primary/20"
          >
            <Save className="w-3.5 h-3.5" />
            حفظ
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1.5 font-bold text-foreground">عنوان الموقع الرئيسي (Hero Title)</label>
            <input
              type="text"
              value={mainContent.heroTitle}
              onChange={(e) => setMainContent({ ...mainContent, heroTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block mb-1.5 font-bold text-foreground">الشارة الترويجية (Badge Tag)</label>
            <input
              type="text"
              value={mainContent.heroBadge}
              onChange={(e) => setMainContent({ ...mainContent, heroBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-foreground">الوصف الرئيسي بالهيدر (Hero Subtitle)</label>
          <textarea
            rows={2}
            value={mainContent.heroSubtitle}
            onChange={(e) => setMainContent({ ...mainContent, heroSubtitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 focus:ring-2 focus:ring-primary resize-none text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2 border-t border-border">
          <div>
            <label className="block mb-1.5 font-bold text-foreground">عنوان قسم (عن المركز)</label>
            <input
              type="text"
              value={mainContent.aboutTitle}
              onChange={(e) => setMainContent({ ...mainContent, aboutTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>
          <div>
            <label className="block mb-1.5 font-bold text-foreground">شارة خبرة المركز (Experience Chip)</label>
            <input
              type="text"
              value={mainContent.yearsExperience}
              onChange={(e) => setMainContent({ ...mainContent, yearsExperience: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1.5 font-bold text-foreground">الوصف الشامل لـ (عن مركز حضرموت)</label>
          <textarea
            rows={3}
            value={mainContent.aboutText}
            onChange={(e) => setMainContent({ ...mainContent, aboutText: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1.5 font-bold text-foreground">نص رؤية المركز (Vision)</label>
            <textarea
              rows={3}
              value={mainContent.visionText}
              onChange={(e) => setMainContent({ ...mainContent, visionText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs"
            />
          </div>
          <div>
            <label className="block mb-1.5 font-bold text-foreground">نص رسالة المركز (Mission)</label>
            <textarea
              rows={3}
              value={mainContent.missionText}
              onChange={(e) => setMainContent({ ...mainContent, missionText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-sm hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Save className="w-4 h-4" />
            حفظ التغييرات الرئيسية
          </button>
        </div>
      </form>

      {/* Live Preview (5 cols) */}
      <div className="lg:col-span-5">
        <LiveWebsitePreview mainContent={mainContent} agencies={agencies} />
      </div>
    </div>
  );
};

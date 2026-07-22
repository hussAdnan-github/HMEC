'use client';

import React, { useState, useEffect } from 'react';
import { Wrench, Save, ShieldCheck, MapPin, Edit, Check } from 'lucide-react';
import { GeneralServiceConfig } from '@/data/siteCmsMockData';

interface GeneralServiceTabProps {
  generalService: GeneralServiceConfig;
  setGeneralService: React.Dispatch<React.SetStateAction<GeneralServiceConfig>>;
  onSave: (msg: string) => void;
}

export const GeneralServiceTab: React.FC<GeneralServiceTabProps> = ({
  generalService,
  setGeneralService,
  onSave,
}) => {
  const [formData, setFormData] = useState<GeneralServiceConfig>(generalService);

  useEffect(() => {
    setFormData(generalService);
  }, [generalService]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralService(formData);
    onSave('تم حفظ إعدادات ونصوص الخدمات العامة بنجاح');
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      {/* Top Header Card - Matching GoalsTab design */}
      <div className="flex items-center justify-between bg-card p-5 rounded-3xl border border-border shadow-sm">
        <div>
          <h3 className="font-extrabold text-foreground text-base">إدارة قواعد وقيم الخدمات العامة</h3>
          <p className="text-xs text-muted-foreground mt-0.5">النص الموحد للخدمات، الكفالة الرسمية، والتغطية الجغرافية في حضرموت</p>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
        >
          <Save className="w-4 h-4" />
          حفظ كافة القواعد
        </button>
      </div>

      {/* 3-Column Cards Grid - Matching GoalsTab layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Main Title & Subtitle */}
        <div className="bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                🛠️
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                الهيدر العام
              </span>
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-foreground">العنوان الرئيسي لقسم الخدمات</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background/50 font-bold text-xs focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-foreground">الوصف التمهيدي الموحد</label>
              <textarea
                rows={3}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span>شارة التعريف الرئيسية</span>
            <span className="text-primary font-bold">جاهز للحفظ</span>
          </div>
        </div>

        {/* Card 2: Guarantee Badge Card */}
        <div className="bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                🛡️
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">
                الكفالة والضمان
              </span>
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-foreground">شارة الضمان الرسمي المعتمد</label>
              <input
                type="text"
                value={formData.guaranteeText}
                onChange={(e) => setFormData({ ...formData, guaranteeText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background/50 font-bold text-xs focus:ring-2 focus:ring-primary"
              />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-2">
              تظهر هذه الشارة على كافة بطاقات الخدمات الفردية لطمأنة العملاء والمهندسين.
            </p>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              ضمان معتمد
            </span>
            <span className="text-amber-500 font-bold">HMEC Guarantee</span>
          </div>
        </div>

        {/* Card 3: Support Coverage Card */}
        <div className="bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                📍
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                النطاق الجغرافي
              </span>
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-foreground">نص التغطية الجغرافية للخدمات</label>
              <input
                type="text"
                value={formData.supportCoverage}
                onChange={(e) => setFormData({ ...formData, supportCoverage: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background/50 font-bold text-xs focus:ring-2 focus:ring-primary"
              />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-2">
              تغطي خدمات التوريد والتركيب والصيانة فروع المكلا وسيئون والشحر وجميع مديريات حضرموت.
            </p>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <MapPin className="w-3.5 h-3.5" />
              حضرموت قاطبة
            </span>
            <span className="text-emerald-500 font-bold">تغطية شاملة</span>
          </div>
        </div>
      </div>
    </form>
  );
};

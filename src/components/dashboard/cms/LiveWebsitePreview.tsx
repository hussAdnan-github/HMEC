'use client';

import React from 'react';
import { Laptop } from 'lucide-react';
import { MainContentConfig, CmsAgency } from '@/data/siteCmsMockData';

interface LiveWebsitePreviewProps {
  mainContent: MainContentConfig;
  agencies: CmsAgency[];
}

export const LiveWebsitePreview: React.FC<LiveWebsitePreviewProps> = ({ mainContent, agencies }) => {
  return (
    <div className="bg-card border border-primary/30 p-5 rounded-3xl shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Laptop className="w-5 h-5 text-primary animate-pulse" />
          <span className="font-extrabold text-xs text-foreground">معاينة حية لمظر الموقع للمستخدمين</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
          مباشر 🟢
        </span>
      </div>

      {/* Hero Banner Simulation */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-slate-900 text-white p-6 shadow-inner space-y-3">
        <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-extrabold">
          {mainContent.heroBadge}
        </div>
        <h3 className="font-black text-lg leading-tight">{mainContent.heroTitle}</h3>
        <p className="text-xs text-white/90 line-clamp-3 leading-relaxed">{mainContent.heroSubtitle}</p>
        <div className="pt-2 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white text-primary font-bold text-xs shadow">
            استكشف المنتجات
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white/20 text-white font-bold text-xs backdrop-blur-md">
            تواصل معنا
          </span>
        </div>
      </div>

      {/* About Section Simulation */}
      <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-foreground">{mainContent.aboutTitle}</span>
          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
            {mainContent.yearsExperience}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{mainContent.aboutText}</p>
      </div>

      {/* Agencies Ticker Simulation */}
      <div className="pt-1">
        <span className="text-[10px] font-bold text-muted-foreground block mb-2">الوكالات العالمية المعتمدة:</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {agencies.map((ag) => (
            <span
              key={ag.id}
              className="px-2.5 py-1 rounded-lg bg-card border border-border text-foreground text-xs font-bold whitespace-nowrap flex items-center gap-1"
            >
              <span>{ag.logo}</span>
              <span>{ag.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

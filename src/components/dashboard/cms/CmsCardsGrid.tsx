'use client';

import React from 'react';
import {
  FileText,
  Target,
  Image as ImageIcon,
  Award,
  Wrench,
  Layers,
  Building2,
  PhoneCall,
  Star,
  ChevronLeft
} from 'lucide-react';
import { SliderSlide, CmsGoal, CmsAgency, CmsService, CmsTestimonial } from '@/data/siteCmsMockData';

export type SubTabType =
  | 'overview_cards'
  | 'content'
  | 'goals'
  | 'slider'
  | 'agencies'
  | 'general_service'
  | 'services'
  | 'branches_info'
  | 'contact_info'
  | 'testimonials';

interface CmsCardsGridProps {
  slides: SliderSlide[];
  goals: CmsGoal[];
  agencies: CmsAgency[];
  services: CmsService[];
  testimonials: CmsTestimonial[];
  onSelectTab: (tab: SubTabType) => void;
}

export const CmsCardsGrid: React.FC<CmsCardsGridProps> = ({
  slides,
  goals,
  agencies,
  services,
  testimonials,
  onSelectTab,
}) => {
  const cmsCards = [
    {
      id: 'content',
      title: 'المحتوى الرئيسي',
      subtitle: 'العناوين الرئيسية، الهيدر، نصوص من نحن، والخبرة المسجلة',
      icon: FileText,
      badge: 'النص التعريفي',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      actionText: 'إدارة وتعديل المحتوى',
    },
    {
      id: 'goals',
      title: 'الأهداف والتمايز',
      subtitle: 'أهداف المركز وركائز مميزات "لماذا تختارنا"',
      icon: Target,
      badge: `${goals.length} عناصر`,
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      actionText: 'إدارة الأهداف والتمايز',
    },
    {
      id: 'slider',
      title: 'شريط التمرير والبنرات',
      subtitle: 'بنرات السلايدر الرئيسي وصور العروض الترويجية في الواجهة',
      icon: ImageIcon,
      badge: `${slides.length} بنرات`,
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      actionText: 'إدارة السلايدر والبنرات',
    },
    {
      id: 'agencies',
      title: 'وكلاؤنا المعتمدون',
      subtitle: 'العلامات التجارية العالمية (شنايدر، ABB، لوغراند، فيليبس...)',
      icon: Award,
      badge: `${agencies.length} وكلاء`,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      actionText: 'إدارة وتعديل الوكلاء',
    },
    {
      id: 'general_service',
      title: 'خدمة عامة',
      subtitle: 'النص التعريفي الموحد للخدمات، شارات الكفالة والضمان',
      icon: Wrench,
      badge: 'قواعد الخدمة',
      badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
      actionText: 'إعدادات الخدمات العامة',
    },
    {
      id: 'services',
      title: 'الخدمات التفصيلية',
      subtitle: 'قائمة خدمات التوريد والطاقة الشمسية والإنارة والصيانة',
      icon: Layers,
      badge: `${services.length} خدمات`,
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      actionText: 'إدارة قائمة الخدمات',
    },
    {
      id: 'branches_info',
      title: 'محتوى الفروع',
      subtitle: 'النص التوضيحي لفروع المكلا وسيئون والشحر وخط التواصل',
      icon: Building2,
      badge: 'نص الفروع',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      actionText: 'إدارة نص قسم الفروع',
    },
    {
      id: 'contact_info',
      title: 'اتصل بنا وقنوات التواصل',
      subtitle: 'أرقام الهاتف، الواتساب، البريد، خرائط جوجل، والسوشيال ميديا',
      icon: PhoneCall,
      badge: 'بيانات التواصل',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      actionText: 'إدارة قنوات الاتصال',
    },
    {
      id: 'testimonials',
      title: 'تقييمات وآراء العملاء',
      subtitle: 'مراجعات وتقييمات العملاء والمهندسين مع النجوم واعتماد العرض',
      icon: Star,
      badge: `${testimonials.length} مراجعات`,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      actionText: 'إدارة التقييمات والمراجعات',
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Quick Metrics Ticker Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border/80 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground block">شرائح السلايدر النشطة</span>
          <span className="text-xl font-black text-foreground">{slides.filter((s) => s.isActive).length} بنرات</span>
        </div>
        <div className="bg-card border border-border/80 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground block">الوكالات والماركات</span>
          <span className="text-xl font-black text-primary">{agencies.length} وكلاء معتمدون</span>
        </div>
        <div className="bg-card border border-border/80 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground block">الخدمات الفردية</span>
          <span className="text-xl font-black text-foreground">{services.length} خدمات مخصصة</span>
        </div>
        <div className="bg-card border border-border/80 p-4 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground block">تقييمات العملاء</span>
          <span className="text-xl font-black text-amber-500">{testimonials.length} مراجعات معتمدة</span>
        </div>
      </div>

      {/* Cards Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cmsCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectTab(card.id as SubTabType)}
              className="group bg-card text-card-foreground border border-border/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 border-l-4 border-l-primary"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                <span className="group-hover:underline">{card.actionText}</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

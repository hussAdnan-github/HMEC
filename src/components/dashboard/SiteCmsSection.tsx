'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

import {
  initialSlides,
  initialCmsGoals,
  initialCmsAgencies,
  initialCmsServices,
  initialCmsTestimonials,
  initialMainContent,
  initialGeneralService,
  initialBranchesInfo,
  initialContactInfo,
  SliderSlide,
  CmsGoal,
  CmsAgency,
  CmsService,
  CmsTestimonial,
  MainContentConfig,
  GeneralServiceConfig,
  BranchesInfoConfig,
  ContactInfoConfig
} from '@/data/siteCmsMockData';

import { CmsCardsGrid, SubTabType } from './cms/CmsCardsGrid';
import { MainContentTab } from './cms/tabs/MainContentTab';
import { GoalsTab } from './cms/tabs/GoalsTab';
import { SliderTab } from './cms/tabs/SliderTab';
import { AgenciesTab } from './cms/tabs/AgenciesTab';
import { GeneralServiceTab } from './cms/tabs/GeneralServiceTab';
import { ServicesTab } from './cms/tabs/ServicesTab';
import { BranchesInfoTab } from './cms/tabs/BranchesInfoTab';
import { ContactInfoTab } from './cms/tabs/ContactInfoTab';
import { TestimonialsTab } from './cms/tabs/TestimonialsTab';

import {
  SliderModal,
  GoalModal,
  AgencyModal,
  ServiceModal,
  TestimonialModal
} from './cms/SubModals';

export const SiteCmsSection: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read active section from URL search params (e.g. ?section=goals)
  const currentSectionParam = (searchParams.get('section') as SubTabType) || 'overview_cards';
  const [subTab, setSubTab] = useState<SubTabType>(currentSectionParam);

  // Sync state when URL search params change (supports page refresh & back button)
  useEffect(() => {
    const param = searchParams.get('section') as SubTabType;
    if (param) {
      setSubTab(param);
    } else {
      setSubTab('overview_cards');
    }
  }, [searchParams]);

  // Navigate to sub-section via URL parameter
  const handleSelectSubTab = (tab: SubTabType) => {
    setSubTab(tab);
    if (tab === 'overview_cards') {
      router.push('/dashboard/site-cms');
    } else {
      router.push(`/dashboard/site-cms?section=${tab}`);
    }
  };

  // Datasets states
  const [slides, setSlides] = useState<SliderSlide[]>(initialSlides);
  const [goals, setGoals] = useState<CmsGoal[]>(initialCmsGoals);
  const [agencies, setAgencies] = useState<CmsAgency[]>(initialCmsAgencies);
  const [services, setServices] = useState<CmsService[]>(initialCmsServices);
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>(initialCmsTestimonials);

  const [mainContent, setMainContent] = useState<MainContentConfig>(initialMainContent);
  const [generalService, setGeneralService] = useState<GeneralServiceConfig>(initialGeneralService);
  const [branchesInfo, setBranchesInfo] = useState<BranchesInfoConfig>(initialBranchesInfo);
  const [contactInfo, setContactInfo] = useState<ContactInfoConfig>(initialContactInfo);

  // Toast feedback state
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const triggerSaveNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Modals state
  const [isSliderModalOpen, setIsSliderModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SliderSlide | null>(null);

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CmsGoal | null>(null);

  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<CmsAgency | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<CmsService | null>(null);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<CmsTestimonial | null>(null);

  // Handlers for Slider
  const handleSaveSlide = (data: Partial<SliderSlide>) => {
    if (editingSlide) {
      setSlides((prev) => prev.map((s) => (s.id === editingSlide.id ? ({ ...s, ...data } as SliderSlide) : s)));
    } else {
      setSlides((prev) => [
        {
          id: `slide-${Date.now()}`,
          badge: data.badge || '⚡ شريحة جديدة',
          title: data.title || 'عنوان الشريحة',
          subtitle: data.subtitle || '',
          ctaText: data.ctaText || 'عرض التفاصيل',
          ctaLink: data.ctaLink || '#',
          image: data.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
          isActive: data.isActive ?? true,
        },
        ...prev,
      ]);
    }
    setEditingSlide(null);
    triggerSaveNotification('تم تحديث شريحة السلايدر بنجاح');
  };

  // Handlers for Goals
  const handleSaveGoal = (data: Partial<CmsGoal>) => {
    if (editingGoal) {
      setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? ({ ...g, ...data } as CmsGoal) : g)));
    } else {
      setGoals((prev) => [
        {
          id: `goal-${Date.now()}`,
          title: data.title || 'هدف جديد',
          description: data.description || '',
          icon: data.icon || '🎯',
          stat: data.stat,
          category: data.category || 'لماذا تختارنا',
        },
        ...prev,
      ]);
    }
    setEditingGoal(null);
    triggerSaveNotification('تمت إضافة الهدف والتمايز بنجاح');
  };

  // Handlers for Agencies
  const handleSaveAgency = (data: Partial<CmsAgency>) => {
    if (editingAgency) {
      setAgencies((prev) => prev.map((a) => (a.id === editingAgency.id ? ({ ...a, ...data } as CmsAgency) : a)));
    } else {
      setAgencies((prev) => [
        {
          id: `agency-${Date.now()}`,
          name: data.name || 'وكالة جديدة',
          nameEn: data.nameEn || '',
          logo: data.logo || '⚡',
          description: data.description || '',
          isFeatured: data.isFeatured ?? true,
        },
        ...prev,
      ]);
    }
    setEditingAgency(null);
    triggerSaveNotification('تم حفظ بيانات الوكالة بنجاح');
  };

  // Handlers for Services
  const handleSaveService = (data: Partial<CmsService>) => {
    if (editingService) {
      setServices((prev) => prev.map((s) => (s.id === editingService.id ? ({ ...s, ...data } as CmsService) : s)));
    } else {
      setServices((prev) => [
        {
          id: `serv-${Date.now()}`,
          title: data.title || 'خدمة جديدة',
          description: data.description || '',
          icon: data.icon || '⚡',
          features: data.features || [],
        },
        ...prev,
      ]);
    }
    setEditingService(null);
    triggerSaveNotification('تم حفظ بيانات الخدمة بنجاح');
  };

  // Handlers for Testimonials
  const handleSaveTestimonial = (data: Partial<CmsTestimonial>) => {
    if (editingTestimonial) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === editingTestimonial.id ? ({ ...t, ...data } as CmsTestimonial) : t))
      );
    } else {
      setTestimonials((prev) => [
        {
          id: `test-${Date.now()}`,
          name: data.name || 'عميل جديد',
          role: data.role || 'عميل مميز',
          company: data.company || '',
          rating: data.rating || 5,
          text: data.text || '',
          date: data.date || new Date().toISOString().split('T')[0],
          avatar: data.avatar || '👤',
          isApproved: data.isApproved ?? true,
        },
        ...prev,
      ]);
    }
    setEditingTestimonial(null);
    triggerSaveNotification('تم تحديث التقييم والمراجعة بنجاح');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Main Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-primary/10 text-card-foreground border border-border/80 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center text-primary-foreground font-extrabold shadow-lg shadow-primary/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  إدارة محتوى وعناصر الموقع العام (CMS Hub)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-black tracking-wider">
                  حفظ المسار بالرابط 2.0
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                اختر أي كارت من الأقسام الـ 9 لتعديل وإدارة المحتوى، مع حفظ المسار التلقائي عند تحديث الصفحة
              </p>
            </div>
          </div>

          {saveSuccessMsg && (
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {saveSuccessMsg}
            </div>
          )}
        </div>
      </div>

      {/* Back Button linked to URL search param reset */}
      {subTab !== 'overview_cards' && (
        <div className="flex items-center justify-start">
          <button
            onClick={() => handleSelectSubTab('overview_cards')}
            className="px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <ArrowRight className="w-4 h-4" />
            الرجوع خلفاً للكروت الرئيسية
          </button>
        </div>
      )}

      {/* ==================== VIEW 1: THE 9 CARDS GRID OVERVIEW ==================== */}
      {subTab === 'overview_cards' && (
        <CmsCardsGrid
          slides={slides}
          goals={goals}
          agencies={agencies}
          services={services}
          testimonials={testimonials}
          onSelectTab={handleSelectSubTab}
        />
      )}

      {/* ==================== VIEW 2: SUB-SECTION EDITORS ==================== */}
      {subTab === 'content' && (
        <MainContentTab
          mainContent={mainContent}
          setMainContent={setMainContent}
          agencies={agencies}
          onSave={triggerSaveNotification}
        />
      )}

      {subTab === 'goals' && (
        <GoalsTab
          goals={goals}
          onAddGoal={() => {
            setEditingGoal(null);
            setIsGoalModalOpen(true);
          }}
          onEditGoal={(g) => {
            setEditingGoal(g);
            setIsGoalModalOpen(true);
          }}
          onDeleteGoal={(id) => {
            setGoals((prev) => prev.filter((item) => item.id !== id));
            triggerSaveNotification('تم حذف الهدف');
          }}
        />
      )}

      {subTab === 'slider' && (
        <SliderTab
          slides={slides}
          onAddSlide={() => {
            setEditingSlide(null);
            setIsSliderModalOpen(true);
          }}
          onEditSlide={(s) => {
            setEditingSlide(s);
            setIsSliderModalOpen(true);
          }}
          onDeleteSlide={(id) => {
            setSlides((prev) => prev.filter((item) => item.id !== id));
            triggerSaveNotification('تم حذف الشريحة');
          }}
          onToggleActive={(id) => {
            setSlides((prev) =>
              prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
            );
          }}
        />
      )}

      {subTab === 'agencies' && (
        <AgenciesTab
          agencies={agencies}
          onAddAgency={() => {
            setEditingAgency(null);
            setIsAgencyModalOpen(true);
          }}
          onEditAgency={(ag) => {
            setEditingAgency(ag);
            setIsAgencyModalOpen(true);
          }}
          onDeleteAgency={(id) => {
            setAgencies((prev) => prev.filter((a) => a.id !== id));
            triggerSaveNotification('تم حذف الوكالة');
          }}
        />
      )}

      {subTab === 'general_service' && (
        <GeneralServiceTab
          generalService={generalService}
          setGeneralService={setGeneralService}
          onSave={triggerSaveNotification}
        />
      )}

      {subTab === 'services' && (
        <ServicesTab
          services={services}
          onAddService={() => {
            setEditingService(null);
            setIsServiceModalOpen(true);
          }}
          onEditService={(serv) => {
            setEditingService(serv);
            setIsServiceModalOpen(true);
          }}
          onDeleteService={(id) => {
            setServices((prev) => prev.filter((s) => s.id !== id));
            triggerSaveNotification('تم حذف الخدمة');
          }}
        />
      )}

      {subTab === 'branches_info' && (
        <BranchesInfoTab
          branchesInfo={branchesInfo}
          setBranchesInfo={setBranchesInfo}
          onSave={triggerSaveNotification}
        />
      )}

      {subTab === 'contact_info' && (
        <ContactInfoTab
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          onSave={triggerSaveNotification}
        />
      )}

      {subTab === 'testimonials' && (
        <TestimonialsTab
          testimonials={testimonials}
          onAddTestimonial={() => {
            setEditingTestimonial(null);
            setIsTestimonialModalOpen(true);
          }}
          onEditTestimonial={(t) => {
            setEditingTestimonial(t);
            setIsTestimonialModalOpen(true);
          }}
          onDeleteTestimonial={(id) => {
            setTestimonials((prev) => prev.filter((t) => t.id !== id));
            triggerSaveNotification('تم حذف التقييم');
          }}
          onToggleApproved={(id) => {
            setTestimonials((prev) =>
              prev.map((item) => (item.id === id ? { ...item, isApproved: !item.isApproved } : item))
            );
          }}
        />
      )}

      {/* Global CMS Modals */}
      <SliderModal
        isOpen={isSliderModalOpen}
        onClose={() => setIsSliderModalOpen(false)}
        onSave={handleSaveSlide}
        initialData={editingSlide}
      />

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
        initialData={editingGoal}
      />

      <AgencyModal
        isOpen={isAgencyModalOpen}
        onClose={() => setIsAgencyModalOpen(false)}
        onSave={handleSaveAgency}
        initialData={editingAgency}
      />

      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={handleSaveService}
        initialData={editingService}
      />

      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        onSave={handleSaveTestimonial}
        initialData={editingTestimonial}
      />
    </div>
  );
};

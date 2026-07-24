'use client';

import React from 'react';
import { PhoneCall, Save } from 'lucide-react';
import { ContactInfoConfig } from '@/data/siteCmsMockData';

interface ContactInfoTabProps {
  contactInfo: ContactInfoConfig;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfoConfig>>;
  onSave: (msg: string) => void;
}

export const ContactInfoTab: React.FC<ContactInfoTabProps> = ({
  contactInfo,
  setContactInfo,
  onSave,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave('تم حفظ كافة أرقام وقنوات التواصل بنجاح');
      }}
      className="bg-card text-card-foreground border border-border/80 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 max-w-4xl"
    >
      <div className="flex items-center gap-2.5 pb-4 border-b border-border">
        <PhoneCall className="w-6 h-6 text-primary" />
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-foreground">
            بيانات اتصل بنا وقنوات التواصل المباشرة
          </h3>
          <p className="text-xs text-muted-foreground">أرقام المبيعات، الواتساب، البريد، الخرائط، والسوشيال ميديا</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <label className="block mb-1.5 font-bold text-foreground">الهاتف الرئيسي للمركز</label>
          <input
            type="text"
            value={contactInfo.phoneMain}
            onChange={(e) => setContactInfo({ ...contactInfo, phoneMain: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
          />
        </div>
        <div>
          <label className="block mb-1.5 font-bold text-foreground">هاتف المبيعات والاستفسارات</label>
          <input
            type="text"
            value={contactInfo.phoneSales}
            onChange={(e) => setContactInfo({ ...contactInfo, phoneSales: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
          />
        </div>
        <div>
          <label className="block mb-1.5 font-bold text-foreground">رقم الواتساب المباشر</label>
          <input
            type="text"
            value={contactInfo.whatsapp}
            onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block mb-1.5 font-bold text-foreground">البريد الإلكتروني الرسمي</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
          />
        </div>
        <div>
          <label className="block mb-1.5 font-bold text-foreground">عنوان المقر الرئيسي بالمكلا</label>
          <input
            type="text"
            value={contactInfo.hqAddress}
            onChange={(e) => setContactInfo({ ...contactInfo, hqAddress: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <label className="block mb-1.5 font-bold text-foreground">رابط خرائط جوجل (Google Maps)</label>
          <input
            type="text"
            value={contactInfo.googleMapsUrl}
            onChange={(e) => setContactInfo({ ...contactInfo, googleMapsUrl: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-semibold"
          />
        </div>
        <div>
          <label className="block mb-1.5 font-bold text-foreground">صفحة الفيسبوك (Facebook)</label>
          <input
            type="text"
            value={contactInfo.facebookUrl}
            onChange={(e) => setContactInfo({ ...contactInfo, facebookUrl: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-semibold"
          />
        </div>
        <div>
          <label className="block mb-1.5 font-bold text-foreground">حساب الانستغرام (Instagram)</label>
          <input
            type="text"
            value={contactInfo.instagramUrl}
            onChange={(e) => setContactInfo({ ...contactInfo, instagramUrl: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-semibold"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-sm hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" />
          حفظ بيانات اتصل بنا
        </button>
      </div>
    </form>
  );
};

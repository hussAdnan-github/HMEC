'use client';

import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Palette,
  Globe,
  Save,
  Download,
  CheckCircle2,
  Bell,
  Lock
} from 'lucide-react';

export const SettingsSection: React.FC = () => {
  const [centerName, setCenterName] = useState('مركز حضرموت الحديث للكهربائيات');
  const [hqAddress, setHqAddress] = useState('المكلا - شارع البنوك - مقابل بنك اليمن والكويت');
  const [phone, setPhone] = useState('+967 05 302211');
  const [email, setEmail] = useState('info@hmec-ye.com');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        center: centerName,
        exportDate: new Date().toISOString(),
        status: "HMEC Dashboard State Backup Ready",
      })
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `HMEC_Dashboard_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div className="bg-card text-card-foreground border border-border p-5 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">إعدادات لوحة التحكم والهوية</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            ضبط البيانات الأساسية لمركز حضرموت الحديث وتفضيلات النظام
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2 rounded-xl border border-input hover:bg-muted font-bold text-xs flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-primary" />
          تصدير نسخة احتياطية
        </button>
      </div>

      {/* Brand Identity Showcase */}
      <div className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-base text-foreground">الهوية البصرية المعتمدة (HMEC Design Tokens)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/10 space-y-2">
            <span className="text-xs font-bold text-muted-foreground block">اللون الرئيسي (Teal Emerald)</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#12827a] border border-white" />
              <span className="font-mono text-xs font-bold text-foreground">#12827a</span>
            </div>
            <p className="text-[11px] text-muted-foreground">يعكس الثقة والأمان الكهربائي الفاخر</p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2">
            <span className="text-xs font-bold text-muted-foreground block">اللون الثانوي (Amber Gold)</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ffad33] border border-white" />
              <span className="font-mono text-xs font-bold text-foreground">#ffad33</span>
            </div>
            <p className="text-[11px] text-muted-foreground">يعكس طاقة الإضاءة والشرارات والتوجه المستقبلي</p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/40 space-y-2">
            <span className="text-xs font-bold text-muted-foreground block">الخط الرسمي العربي</span>
            <div className="text-base font-bold text-foreground">خط كايرو (Cairo Google Font)</div>
            <p className="text-[11px] text-muted-foreground">قراءة عصرية عالية الوضوح لـ RTL</p>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-card text-card-foreground border border-border p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-base text-foreground">بيانات المركز والتواصل الرسمية</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-semibold text-foreground">اسم المركز التجاري</label>
            <input
              type="text"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background font-semibold"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-foreground">رقم هاتف الدعم الفني والمبيعات</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background font-semibold dir-ltr text-right"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-semibold text-foreground">البريد الإلكتروني للـ Admin</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background font-semibold"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-foreground">عنوان المقر الرئيسي</label>
            <input
              type="text"
              value={hqAddress}
              onChange={(e) => setHqAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background font-semibold"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          {isSaved ? (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              تم حفظ الإعدادات بنجاح
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">التغييرات تحفظ محلياً في الجلسة</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
};

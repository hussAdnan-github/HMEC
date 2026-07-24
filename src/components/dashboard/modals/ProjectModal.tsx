'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, FolderPlus, Upload, Video } from 'lucide-react';
import { ApiProject, ApiAgent, ApiProjectImage } from '@/types/api';
import { getImageUrl } from '@/lib/utils';
import { getAgentsServerAction } from '@/actions/productActions';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    formData: FormData,
    newSubImages: File[],
    deletedSubImageIds: number[]
  ) => void;
  initialData?: ApiProject | null;
  agents?: ApiAgent[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  agents = []
}) => {
  const [localAgents, setLocalAgents] = useState<ApiAgent[]>(agents || []);
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    short_description_ar: '',
    short_description_en: '',
    description_ar: '',
    description_en: '',
    location_ar: '',
    location_en: '',
    commit_owner_ar: '',
    commit_owner_en: '',
    name_owner_ar: '',
    name_owner_en: '',
    attribute_ar: '',
    attribute_en: '',
    start: '',
    completed: '',
    video_files: '',
    agent: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Sync or fetch agents list
  useEffect(() => {
    if (agents && agents.length > 0) {
      setLocalAgents(agents);
    } else if (isOpen) {
      getAgentsServerAction().then((res) => {
        if (res?.data?.results) {
          setLocalAgents(res.data.results);
        }
      });
    }
  }, [agents, isOpen]);

  // Set default agent selection when localAgents are loaded
  useEffect(() => {
    if (!initialData && localAgents.length > 0 && !formData.agent) {
      setFormData((prev) => ({
        ...prev,
        agent: String(localAgents[0].id),
      }));
    }
  }, [localAgents, initialData, formData.agent]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_ar: initialData.name_ar || '',
        name_en: initialData.name_en || '',
        short_description_ar: initialData.short_description_ar || '',
        short_description_en: initialData.short_description_en || '',
        description_ar: initialData.description_ar || '',
        description_en: initialData.description_en || '',
        location_ar: initialData.location_ar || '',
        location_en: initialData.location_en || '',
        commit_owner_ar: initialData.commit_owner_ar || '',
        commit_owner_en: initialData.commit_owner_en || '',
        name_owner_ar: initialData.name_owner_ar || '',
        name_owner_en: initialData.name_owner_en || '',
        attribute_ar: initialData.attribute_ar || '',
        attribute_en: initialData.attribute_en || '',
        start: initialData.start || '',
        completed: initialData.completed || '',
        video_files: initialData.video_files || '',
        agent: initialData.agent ? String(initialData.agent) : '',
      });
      setImageFile(null);
      setImagePreview(getImageUrl(initialData.image));
      setVideoFile(null);
      setVideoPreview(initialData.video_files ? getImageUrl(initialData.video_files) : null);
    } else {
      setFormData({
        name_ar: '',
        name_en: '',
        short_description_ar: '',
        short_description_en: '',
        description_ar: '',
        description_en: '',
        location_ar: '',
        location_en: '',
        commit_owner_ar: '',
        commit_owner_en: '',
        name_owner_ar: '',
        name_owner_en: '',
        attribute_ar: '',
        attribute_en: '',
        start: '',
        completed: '',
        video_files: '',
        agent: localAgents[0] ? String(localAgents[0].id) : '',
      });
      setImageFile(null);
      setImagePreview(null);
      setVideoFile(null);
      setVideoPreview(null);
    }
  }, [initialData, isOpen, localAgents]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-5xl lg:max-w-6xl max-h-[92vh] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <FolderPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-foreground">
                {initialData ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">قم بإدخال تفاصيل المشروع والعميل والتواريخ والوسائط</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData();
            data.append('name_ar', formData.name_ar);
            data.append('name_en', formData.name_en);
            data.append('short_description_ar', formData.short_description_ar);
            data.append('short_description_en', formData.short_description_en);
            data.append('description_ar', formData.description_ar);
            data.append('description_en', formData.description_en);
            data.append('location_ar', formData.location_ar);
            data.append('location_en', formData.location_en);
            data.append('commit_owner_ar', formData.commit_owner_ar);
            data.append('commit_owner_en', formData.commit_owner_en);
            data.append('name_owner_ar', formData.name_owner_ar);
            data.append('name_owner_en', formData.name_owner_en);
            data.append('attribute_ar', formData.attribute_ar);
            data.append('attribute_en', formData.attribute_en);
            if (formData.start) data.append('start', formData.start);
            if (formData.completed) data.append('completed', formData.completed);
            if (videoFile) {
              data.append('video_files', videoFile);
            }
            if (formData.agent) data.append('agent', formData.agent);
            if (imageFile) data.append('image', imageFile);

            onSave(data, [], []);
            onClose();
          }}
          className="space-y-6 text-xs sm:text-sm"
        >
          {/* Section 1: Basic Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-bold text-xs text-primary uppercase tracking-wider">بيانات المشروع والوكيل</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1.5 font-bold text-foreground">اسم المشروع (العربية) *</label>
                <input
                  type="text"
                  required
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  placeholder="اسم المشروع"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">اسم المشروع (الإنجليزية)</label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="Project Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الوكيل / العلامة التجارية *</label>
                <select
                  value={formData.agent}
                  required
                  onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary text-xs"
                >
                  <option value="">اختر الوكيل</option>
                  {localAgents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name_ar || agent.name_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Owner & Location Details (Arabic & English) */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-bold text-xs text-primary uppercase tracking-wider">بيانات العميل والموقع والتصنيف (العربية والإنجليزية)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block mb-1.5 font-bold text-foreground">اسم المالك (العربية)</label>
                <input
                  type="text"
                  value={formData.name_owner_ar}
                  onChange={(e) => setFormData({ ...formData, name_owner_ar: e.target.value })}
                  placeholder="اسم المالك"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">اسم المالك (الإنجليزية)</label>
                <input
                  type="text"
                  value={formData.name_owner_en}
                  onChange={(e) => setFormData({ ...formData, name_owner_en: e.target.value })}
                  placeholder="Owner Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الموقع (العربية)</label>
                <input
                  type="text"
                  value={formData.location_ar}
                  onChange={(e) => setFormData({ ...formData, location_ar: e.target.value })}
                  placeholder="الموقع"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الموقع (الإنجليزية)</label>
                <input
                  type="text"
                  value={formData.location_en}
                  onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                  placeholder="Location"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-foreground">صفة المالك (العربية)</label>
                <input
                  type="text"
                  value={formData.commit_owner_ar}
                  onChange={(e) => setFormData({ ...formData, commit_owner_ar: e.target.value })}
                  placeholder="صفة المالك"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">صفة المالك (الإنجليزية)</label>
                <input
                  type="text"
                  value={formData.commit_owner_en}
                  onChange={(e) => setFormData({ ...formData, commit_owner_en: e.target.value })}
                  placeholder="Client Role"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">تصنيف المشروع (العربية)</label>
                <input
                  type="text"
                  value={formData.attribute_ar}
                  onChange={(e) => setFormData({ ...formData, attribute_ar: e.target.value })}
                  placeholder="تصنيف المشروع"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">تصنيف المشروع (الإنجليزية)</label>
                <input
                  type="text"
                  value={formData.attribute_en}
                  onChange={(e) => setFormData({ ...formData, attribute_en: e.target.value })}
                  placeholder="Project Attribute"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Dates & Media */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-bold text-xs text-primary uppercase tracking-wider">التواريخ والوسائط</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 font-bold text-foreground">تاريخ البدء</label>
                <input
                  type="date"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">تاريخ الانتهاء</label>
                <input
                  type="date"
                  value={formData.completed}
                  onChange={(e) => setFormData({ ...formData, completed: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الصورة الرئيسية للمشروع *</label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border bg-muted shrink-0 shadow-sm">
                      <img src={imagePreview} alt="Project Main Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-input hover:border-primary rounded-2xl p-4 cursor-pointer transition-colors text-center text-xs font-bold text-muted-foreground bg-background/30 hover:bg-primary/5">
                    <Upload className="w-5 h-5 mb-1 text-primary" />
                    <span>اختر الصورة الرئيسية</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-foreground">فيديو المشروع</label>
                <div className="flex items-center gap-4">
                  {videoPreview && (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border bg-black shrink-0 shadow-sm flex items-center justify-center">
                      <video src={videoPreview} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-input hover:border-primary rounded-2xl p-4 cursor-pointer transition-colors text-center text-xs font-bold text-muted-foreground bg-background/30 hover:bg-primary/5">
                    <Video className="w-5 h-5 mb-1 text-primary" />
                    <span className="truncate max-w-[180px]">{videoFile ? videoFile.name : (initialData?.video_files ? 'تغيير الفيديو' : 'اختر ملف الفيديو')}</span>
                    <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Descriptions (Arabic & English) */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-bold text-xs text-primary uppercase tracking-wider">وصف وملخص المشروع (العربية والإنجليزية)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الوصف القصير (العربية)</label>
                <textarea
                  rows={2}
                  value={formData.short_description_ar}
                  onChange={(e) => setFormData({ ...formData, short_description_ar: e.target.value })}
                  placeholder="الوصف القصير"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الوصف القصير (الإنجليزية)</label>
                <textarea
                  rows={2}
                  value={formData.short_description_en}
                  onChange={(e) => setFormData({ ...formData, short_description_en: e.target.value })}
                  placeholder="Short description"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الوصف التفصيلي (العربية)</label>
                <textarea
                  rows={3}
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  placeholder="الوصف التفصيلي"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-foreground">الوصف التفصيلي (الإنجليزية)</label>
                <textarea
                  rows={3}
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  placeholder="Detailed description"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-input hover:bg-muted text-xs font-bold transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              <Check className="w-4 h-4" />
              حفظ المشروع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Package, FolderPlus, MapPin, ShoppingBag, Upload, Plus } from 'lucide-react';
import { ProjectItem, BranchItem, OrderItem } from '@/data/dashboardMockData';
import { ApiProduct, ApiAgent, ApiProductImage } from '@/types/api';
import { getImageUrl } from '@/lib/utils';
import { getAgentsServerAction } from '@/actions/productActions';

// --- Modal 1: Add/Edit Product Modal ---
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    formData: FormData,
    newSubImages: File[],
    deletedSubImageIds: number[]
  ) => void;
  initialData?: ApiProduct | null;
  agents?: ApiAgent[];
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData,
  agents = []
}) => {
  const [localAgents, setLocalAgents] = useState<ApiAgent[]>(agents || []);
  const [formData, setFormData] = useState({
    name_product_ar: '',
    name_product_en: '',
    number_group: '',
    number_product: '',
    agent: '',
    description_product_ar: '',
    description_product_en: '',
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Sub-images (Gallery) state
  const [existingSubImages, setExistingSubImages] = useState<ApiProductImage[]>([]);
  const [deletedSubImageIds, setDeletedSubImageIds] = useState<number[]>([]);
  const [newSubImageFiles, setNewSubImageFiles] = useState<{ file: File; preview: string }[]>([]);

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
      setFormData(prev => ({
        ...prev,
        agent: String(localAgents[0].id)
      }));
    }
  }, [localAgents, initialData, formData.agent]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_product_ar: initialData.name_product_ar || '',
        name_product_en: initialData.name_product_en || '',
        number_group: initialData.number_group || '',
        number_product: initialData.number_product || '',
        agent: initialData.agent ? String(initialData.agent) : '',
        description_product_ar: initialData.description_product_ar || '',
        description_product_en: initialData.description_product_en || '',
        is_active: initialData.is_active,
      });
      setImageFile(null);
      setImagePreview(getImageUrl(initialData.image));
      setExistingSubImages(initialData.product_images || []);
      setDeletedSubImageIds([]);
      setNewSubImageFiles([]);
    } else {
      setFormData({
        name_product_ar: '',
        name_product_en: '',
        number_group: '',
        number_product: '',
        agent: localAgents[0] ? String(localAgents[0].id) : '',
        description_product_ar: '',
        description_product_en: '',
        is_active: true,
      });
      setImageFile(null);
      setImagePreview(null);
      setExistingSubImages([]);
      setDeletedSubImageIds([]);
      setNewSubImageFiles([]);
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

  const handleNewSubImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const items = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewSubImageFiles((prev) => [...prev, ...items]);
    }
  };

  const removeNewSubImage = (index: number) => {
    setNewSubImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingSubImage = (id: number) => {
    setExistingSubImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedSubImageIds((prev) => [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground animate-pulse">
              {initialData ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData();
            data.append('name_product_ar', formData.name_product_ar);
            data.append('name_product_en', formData.name_product_en);
            data.append('number_group', formData.number_group);
            data.append('number_product', formData.number_product);
            data.append('is_active', String(formData.is_active));
            data.append('description_product_ar', formData.description_product_ar);
            data.append('description_product_en', formData.description_product_en);
            if (formData.agent) {
              data.append('agent', formData.agent);
            }
            if (imageFile) {
              data.append('image', imageFile);
            }
            onSave(
              data,
              newSubImageFiles.map((item) => item.file),
              deletedSubImageIds
            );
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">الاسم (العربية) *</label>
              <input
                type="text"
                required
                value={formData.name_product_ar}
                onChange={(e) => setFormData({ ...formData, name_product_ar: e.target.value })}
                placeholder="مثال: قاطع كهربائي ثلاثي"
                className="w-full px-3.5 py-2 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">الاسم (الإنجليزية)</label>
              <input
                type="text"
                value={formData.name_product_en}
                onChange={(e) => setFormData({ ...formData, name_product_en: e.target.value })}
                placeholder="Example: Three-phase breaker"
                className="w-full px-3.5 py-2 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">رقم المجموعة النظام المحاسبي *</label>
              <input
                type="text"
                required
                value={formData.number_group}
                onChange={(e) => setFormData({ ...formData, number_group: e.target.value })}
                placeholder="مثال: 12"
                className="w-full px-3.5 py-2 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">رمز المنتج / الموديل *</label>
              <input
                type="text"
                required
                value={formData.number_product}
                onChange={(e) => setFormData({ ...formData, number_product: e.target.value })}
                placeholder="مثال: NSX100"
                className="w-full px-3.5 py-2 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">الوكيل / العلامة التجارية *</label>
              <select
                value={formData.agent}
                required
                onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background/50 font-bold focus:ring-2 focus:ring-primary text-xs"
              >
                <option value="">اختر الوكيل...</option>
                {localAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name_ar || agent.name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-foreground">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <span>منتج نشط ويظهر في الموقع العام</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">صورة المنتج الرئيسية *</label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border bg-muted flex-shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-input hover:border-primary rounded-2xl p-4 cursor-pointer transition-colors text-center text-[11px] font-bold text-muted-foreground bg-background/30">
                <Upload className="w-5 h-5 mb-1 text-primary" />
                <span>اختر صورة المنتج الرئيسية (JPG / PNG)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Sub-Images (Product Gallery) */}
          <div>
            <label className="block mb-1 font-bold text-foreground">الصور الفرعية للمنتج (معرض الصور)</label>
            
            <div className="space-y-3">
              {(existingSubImages.length > 0 || newSubImageFiles.length > 0) && (
                <div className="flex flex-wrap gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/80">
                  {/* Existing Sub-Images */}
                  {existingSubImages.map((img) => (
                    <div key={`existing-${img.id}`} className="relative w-16 h-16 rounded-xl overflow-hidden border border-border group shrink-0">
                      <img src={getImageUrl(img.image)} alt="Sub image" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingSubImage(img.id)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-500/90 text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                        title="حذف الصورة"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* New Sub-Image Files */}
                  {newSubImageFiles.map((item, idx) => (
                    <div key={`new-${idx}`} className="relative w-16 h-16 rounded-xl overflow-hidden border border-primary/40 group shrink-0">
                      <img src={item.preview} alt="New sub image" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewSubImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-500/90 text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                        title="إزالة الصورة"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="flex items-center justify-center gap-2 border border-dashed border-input hover:border-primary rounded-xl p-3 cursor-pointer transition-colors text-center text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10">
                <Upload className="w-4 h-4" />
                <span>إضافة صور فرعية جديدة</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleNewSubImagesChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">الوصف (العربية)</label>
              <textarea
                rows={3}
                value={formData.description_product_ar}
                onChange={(e) => setFormData({ ...formData, description_product_ar: e.target.value })}
                placeholder="اكتب مواصفات المنتج باللغة العربية..."
                className="w-full px-3.5 py-2 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">الوصف (الإنجليزية)</label>
              <textarea
                rows={3}
                value={formData.description_product_en}
                onChange={(e) => setFormData({ ...formData, description_product_en: e.target.value })}
                placeholder="Write product specifications in English..."
                className="w-full px-3.5 py-2 rounded-xl border border-input bg-background/50 resize-none text-xs focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20 hover:opacity-90"
            >
              <Check className="w-4 h-4" />
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 2: Add/Edit Project Modal ---
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<ProjectItem>) => void;
  initialData?: ProjectItem | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: 'المكلا',
    date: '2025',
    status: 'in_progress' as 'completed' | 'in_progress' | 'planned',
    category: 'توريدات كهربائية',
    budget: '$10,000',
    image: '🏢',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        client: initialData.client,
        location: initialData.location,
        date: initialData.date,
        status: initialData.status,
        category: initialData.category,
        budget: initialData.budget,
        image: initialData.image,
        description: initialData.description || '',
      });
    } else {
      setFormData({
        title: '',
        client: '',
        location: 'المكلا',
        date: new Date().getFullYear().toString(),
        status: 'in_progress',
        category: 'توريدات كهربائية',
        budget: '$25,000',
        image: '🏢',
        description: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FolderPlus className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {initialData ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم المشروع *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: مشروع تجهيز شبكة كهرباء مستشفى الشحر"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">العميل / الجهة *</label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="اسم العميل"
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">الموقع / المدينة</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="المكلا">المكلا</option>
                <option value="سيئون">سيئون</option>
                <option value="الشحر">الشحر</option>
                <option value="تريم">تريم</option>
                <option value="عدن">عدن</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">حالة المشروع</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="in_progress">قيد التنفيذ 🟡</option>
                <option value="completed">مكتمل ومسلّم 🟢</option>
                <option value="planned">مخطط له 🔵</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">الميزانية التقديرية</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">وصف المشروع والأنظمة الموردة</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
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

// --- Modal 3: Add/Edit Branch Modal ---
interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (branch: Partial<BranchItem>) => void;
  initialData?: BranchItem | null;
}

export const BranchModal: React.FC<BranchModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: 'المكلا',
    address: '',
    phone: '',
    manager: '',
    email: '',
    status: 'active' as 'active' | 'maintenance' | 'closed',
    workingHours: '8:00 ص - 8:00 م',
    isMainBranch: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        city: initialData.city,
        address: initialData.address,
        phone: initialData.phone,
        manager: initialData.manager,
        email: initialData.email,
        status: initialData.status,
        workingHours: initialData.workingHours,
        isMainBranch: initialData.isMainBranch || false,
      });
    } else {
      setFormData({
        name: '',
        city: 'المكلا',
        address: '',
        phone: '+967 05 ',
        manager: '',
        email: 'branch@hmec-ye.com',
        status: 'active',
        workingHours: '8:00 ص - 8:00 م',
        isMainBranch: false,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {initialData ? 'تعديل بيانات الفرع' : 'إضافة فرع جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم الفرع *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: فرع سيئون - الشارع العام"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">المدينة</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">حالة الفرع</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="active">مفتوح ويعمل 🟢</option>
                <option value="maintenance">تحت الصيانة 🟡</option>
                <option value="closed">مغلق مؤقتاً 🔴</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">العنوان التفصيلي</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="اسم الشارع، المعلم المقابل..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">رقم هاتف الفرع</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">مدير / مسؤول الفرع</label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Check className="w-4 h-4" />
              حفظ الفرع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 4: Add/Edit Order Modal ---
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Partial<OrderItem>) => void;
  order?: OrderItem | null;
  onStatusChange?: (orderId: string, status: OrderItem['status']) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSave, order }) => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    customerPhone: '',
    customerCity: 'المكلا',
    totalAmount: 50000,
    status: 'new' as OrderItem['status'],
    itemsCount: 1,
    notes: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerCity: order.customerCity,
        totalAmount: order.totalAmount,
        status: order.status,
        itemsCount: order.itemsCount,
        notes: order.notes || '',
      });
    } else {
      setFormData({
        orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
        customerName: '',
        customerPhone: '+967 ',
        customerCity: 'المكلا',
        totalAmount: 50000,
        status: 'new',
        itemsCount: 1,
        notes: '',
      });
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              {order ? `تفاصيل الطلب ${order.orderNumber}` : 'إضافة طلب توريد جديد'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
          }}
          className="space-y-4 text-xs sm:text-sm"
        >
          <div>
            <label className="block mb-1 font-bold text-foreground">اسم العميل / المؤسسة *</label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="مثال: شركة حضرموت للمقاولات"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">رقم الهاتف</label>
              <input
                type="text"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold dir-ltr text-right"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">المدينة / المنطقة</label>
              <input
                type="text"
                value={formData.customerCity}
                onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-bold text-foreground">المبلغ الإجمالي (ر.ي)</label>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-foreground">حالة الطلب</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-input bg-background/50 font-bold"
              >
                <option value="new">طلب جديد 🔴</option>
                <option value="processing">قيد المعالجة 🟡</option>
                <option value="shipped">تم الشحن 🔵</option>
                <option value="completed">مكتمل 🟢</option>
                <option value="cancelled">ملغى ⚪</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold text-foreground">ملاحظات الطلب والمنتجات التابعة</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background/50 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-input hover:bg-muted text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Check className="w-4 h-4" />
              حفظ الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal 5: Delete Confirm Modal ---
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground border border-border rounded-3xl w-full max-w-sm shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 text-center">
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto text-xl font-black">
          🗑️
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-base text-foreground">تأكيد عملية الحذف النهائية</h3>
          <p className="text-xs text-muted-foreground">
            هل أنت تأكد من رغبتك في حذف "<span className="font-bold text-foreground">{title}</span>"؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-input text-xs font-bold hover:bg-muted"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold shadow-md shadow-destructive/20 hover:opacity-90"
          >
            نعم، قم بالحذف
          </button>
        </div>
      </div>
    </div>
  );
};

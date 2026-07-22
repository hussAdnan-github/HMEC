'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Upload,
  Copy,
  Trash2,
  Check,
  Eye,
  Filter,
  Tag
} from 'lucide-react';
import { MediaItem } from '@/data/dashboardMockData';

interface GallerySectionProps {
  mediaItems: MediaItem[];
  onAddMedia: (item: Omit<MediaItem, 'id'>) => void;
  onDeleteMedia: (id: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  mediaItems,
  onAddMedia,
  onDeleteMedia,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form for upload
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'منتجات' | 'مشاريع' | 'فروع' | 'اعتمادات'>('منتجات');
  const [newUrl, setNewUrl] = useState('');

  const filteredMedia = mediaItems.filter(
    (item) => selectedCategory === 'الكل' || item.category === selectedCategory
  );

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddMedia({
      title: newTitle,
      category: newCategory,
      url: newUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
      size: '2.1 MB',
      uploadDate: new Date().toISOString().split('T')[0],
    });

    setNewTitle('');
    setNewUrl('');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card text-card-foreground border border-border p-5 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">إدارة معرض الصور والوسائط</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            صور المنتجات عالية الدقة، لقطات المشاريع المكتملة، وصور الفروع والشهادات
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          إضافة صورة جديدة المعرض
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['الكل', 'منتجات', 'مشاريع', 'فروع', 'اعتمادات'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground border border-border hover:bg-muted'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img
                src={media.url}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setPreviewImage(media.url)}
                  className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-colors"
                  title="معاينة المكبرة"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopyLink(media.id, media.url)}
                  className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-colors"
                  title="نسخ الرابط"
                >
                  {copiedId === media.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => onDeleteMedia(media.id)}
                  className="p-2 rounded-xl bg-red-500/80 text-white hover:bg-red-600 backdrop-blur-md transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-md">
                {media.category}
              </span>
            </div>

            <div className="p-3.5 space-y-1">
              <h4 className="font-bold text-xs sm:text-sm text-foreground line-clamp-1">{media.title}</h4>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{media.size}</span>
                <span>{media.uploadDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal Simulator */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">إضافة صورة المعرض</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 font-semibold">عنوان الصورة / الوصف *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: لوحة شنايدر التوزيعية بفرع المكلا"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">التصنيف</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="منتجات">منتجات</option>
                  <option value="مشاريع">مشاريع</option>
                  <option value="فروع">فروع</option>
                  <option value="اعتمادات">اعتمادات</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">رابط الصورة (URL)</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
                <span className="text-[11px] text-muted-foreground">اتركه فارغاً للاستخدام الصورة الافتراضية عالية الجودة</span>
              </div>

              <div className="border-2 border-dashed border-border p-6 rounded-xl text-center space-y-2 bg-muted/20">
                <Upload className="w-8 h-8 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground font-semibold">
                  اسحب الصورة وأفلتها هنا أو انقر للمعاينة المحاكاة
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 rounded-lg border border-input">
                  إلغاء
                </button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold">
                  إضافة للمعرض
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={previewImage} alt="معاينة" className="rounded-2xl max-h-[85vh] object-contain shadow-2xl" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-4 -right-4 bg-white text-black p-2 rounded-full font-bold shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { GallerySection } from '@/components/dashboard/GallerySection';
import { MediaItem, initialMediaGallery } from '@/data/dashboardMockData';
import { DeleteConfirmModal } from '@/components/dashboard/Modals';

export default function GalleryDashboardPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaGallery);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  const handleAddMedia = (item: Partial<MediaItem>) => {
    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      title: item.title || 'صورة جديدة',
      category: item.category || 'products',
      url: item.url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      size: item.size || '1.2 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      dimensions: item.dimensions || '1920x1080',
    };
    setMediaItems((prev) => [newItem, ...prev]);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setMediaItems((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <GallerySection
        mediaItems={mediaItems}
        onAddMedia={handleAddMedia}
        onDeleteMedia={(id) => {
          const item = mediaItems.find((m) => m.id === id);
          if (item) setDeleteTarget(item);
        }}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.title || ''}
      />
    </>
  );
}

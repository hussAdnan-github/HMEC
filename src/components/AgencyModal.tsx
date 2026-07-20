'use client';

import { useEffect } from 'react';
import type { Agency } from '@/types';

interface AgencyModalProps {
  agency: Agency | null;
  onClose: () => void;
}

export default function AgencyModal({ agency, onClose }: AgencyModalProps) {
  useEffect(() => {
    if (agency) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [agency]);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div
      className={`modal-overlay ${agency ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {agency && (
        <div className="modal">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-info">
              <div className="modal-header-icon">{agency.logo}</div>
              <div className="modal-header-text">
                <h2>{agency.name}</h2>
                <p>{agency.nameEn}</p>
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Description */}
            <div className="modal-description">
              {agency.description}
            </div>

            {/* Products */}
            <h3 className="modal-section-title">📦 المنتجات</h3>
            <div className="modal-products-grid">
              {agency.products.map((product) => (
                <div key={product.id} className="modal-product-card">
                  <div className="modal-product-icon">{product.image}</div>
                  <div className="modal-product-name">{product.name}</div>
                  <div className="modal-product-desc">{product.description}</div>
                </div>
              ))}
            </div>

            {/* Projects */}
            <h3 className="modal-section-title">🏗️ المشاريع المنفذة</h3>
            {agency.projects.map((project) => (
              <div key={project.id} className="modal-project-card">
                <div className="modal-project-icon">{project.image}</div>
                <div className="modal-project-info">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="modal-project-meta">
                    <span>📅 {project.date}</span>
                    <span>📍 {project.location}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Reviews */}
            <h3 className="modal-section-title" style={{ marginTop: 32 }}>💬 آراء العملاء</h3>
            {agency.reviews.map((review) => (
              <div key={review.id} className="modal-review-card">
                <div className="modal-review-header">
                  <div className="modal-review-avatar">{review.avatar}</div>
                  <div>
                    <div className="modal-review-name">{review.name}</div>
                    <div className="modal-review-role">{review.role} - {review.company}</div>
                  </div>
                </div>
                <div className="modal-review-stars">{renderStars(review.rating)}</div>
                <div className="modal-review-text">{review.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

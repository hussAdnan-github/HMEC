'use client';

import { useEffect } from 'react';
import type { Agency } from '@/types';
import { X, Package, Building2, MessageSquare, Star, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-accent text-accent" : "fill-slate-200 text-slate-200"} 
      />
    ));
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 sm:p-6 transition-all duration-300",
        agency ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {agency && (
        <div className={cn(
          "bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl transition-all duration-500 overflow-hidden",
          agency ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        )}>
          {/* Header */}
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-subtle flex items-center justify-center text-3xl shrink-0 overflow-hidden shadow-inner">
                {(agency as Agency & { imageUrl?: string }).imageUrl ? (
                  <img src={(agency as Agency & { imageUrl?: string }).imageUrl} alt={agency.name} className="w-full h-full object-cover" />
                ) : (
                  agency.logo
                )}
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">{agency.name}</h2>
                <p className="text-muted-foreground font-medium">{agency.nameEn}</p>
              </div>
            </div>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0" 
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 scroll-smooth">
            {/* Description */}
            <div className="p-6 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed mb-10 border border-slate-100 shadow-sm">
              {agency.description}
            </div>

            {/* Products */}
            {agency.products && agency.products.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Package className="text-primary" size={24} />
                  المنتجات
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {agency.products.map((product) => (
                    <div key={product.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-center group">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{product.image}</div>
                      <div className="font-bold text-slate-800 mb-1">{product.name}</div>
                      <div className="text-xs text-slate-500">{product.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {agency.projects && agency.projects.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Building2 className="text-primary" size={24} />
                  المشاريع المنفذة
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {agency.projects.map((project) => (
                    <div key={project.id} className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                      <div className="text-4xl shrink-0 group-hover:scale-110 transition-transform">{project.image}</div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{project.title}</h4>
                        <p className="text-sm text-slate-500 mb-3">{project.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {project.date}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {project.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {agency.reviews && agency.reviews.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageSquare className="text-primary" size={24} />
                  آراء العملاء
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {agency.reviews.map((review) => (
                    <div key={review.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl shrink-0">{review.avatar}</div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{review.name}</div>
                          <div className="text-xs text-slate-500">{review.role} - {review.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed italic">
                        &quot;{review.text}&quot;
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

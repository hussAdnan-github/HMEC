'use client';

import { testimonials as staticTestimonials } from '@/data/siteData';
import type { ApiCustomerReview } from '@/types/api';
import { getImageUrl } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface TestimonialsProps {
  reviews?: ApiCustomerReview[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const tSections = useTranslations('Sections');
  const tTestimonials = useTranslations('Testimonials');
  const locale = useLocale();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={18} 
        className={i < rating ? "fill-accent text-accent" : "fill-slate-200 text-slate-200"} 
      />
    ));
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
  };

  const displayTestimonials = (reviews && reviews.length > 0)
    ? reviews.map((review, idx) => ({
        id: review.id.toString(),
        rating: 5, // Default rating as API doesn't provide it
        text: locale === 'ar' ? review.review_ar : (review.review_en || review.review_ar),
        name: locale === 'ar' ? review.name_ar : (review.name_en || review.name_ar),
        role: locale === 'ar' ? 'عميل' : 'Customer', // Default role
        company: '', // Default company
        image: getImageUrl(review.image)
      }))
    : staticTestimonials;

  return (
    <section className="py-24 bg-background relative" id="testimonials">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-subtle text-primary font-semibold text-sm mb-4">
            💬 {tSections('testimonials')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {tTestimonials('title').split(' ').map((word, index, arr) => (
              index === arr.length - 2 || index === arr.length - 1 ? (
                <span key={index} className="text-primary">{word} </span>
              ) : (
                <span key={index}>{word} </span>
              )
            ))}
          </h2>
          <p className="text-lg text-muted-foreground">
            {tTestimonials('subtitle')}
          </p>
        </div>

        {/* Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex items-center gap-1 mb-6">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-muted-foreground leading-relaxed flex-grow mb-8 text-lg font-medium italic">
                &quot;{testimonial.text}&quot;
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-primary-subtle text-primary flex items-center justify-center font-bold text-lg overflow-hidden shrink-0">
                  {(testimonial as { image?: string }).image ? (
                    <img src={(testimonial as { image?: string }).image} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(testimonial.name)
                  )}
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} {testimonial.company ? `- ${testimonial.company}` : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { testimonials as staticTestimonials } from '@/data/siteData';
import type { ApiCustomerReview } from '@/types/api';
import { getImageUrl } from '@/lib/utils';

interface TestimonialsProps {
  reviews?: ApiCustomerReview[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
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
        text: review.review_ar,
        name: review.name_ar,
        role: 'عميل', // Default role
        company: '', // Default company
        image: getImageUrl(review.image)
      }))
    : staticTestimonials;

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">💬 آراء العملاء</div>
          <h2 className="section-title">
            ماذا يقول <span className="highlight">عملاؤنا</span> عنا
          </h2>
          <p className="section-subtitle">
            نفخر بثقة عملائنا ونسعى دائماً لتجاوز توقعاتهم
          </p>
        </div>

        <div className="testimonials-carousel">
          {displayTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-stars">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <div className="testimonial-author-name">{testimonial.name}</div>
                  <div className="testimonial-author-role">
                    {testimonial.role} - {testimonial.company}
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

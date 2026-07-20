'use client';

import { services as staticServices } from '@/data/siteData';
import type { ApiService, ApiPublicService } from '@/types/api';
import type { Service } from '@/types';

interface ServicesProps {
  services?: ApiService[];
  publicServices?: ApiPublicService[];
}

export default function Services({ services, publicServices }: ServicesProps) {
  // Try to map public_service or service to the static Service shape
  // If API has publicServices, use them. Else fallback to static.
  const displayServices: Service[] = (publicServices && publicServices.length > 0)
    ? publicServices.map((ps, idx) => ({
        id: ps.id.toString(),
        title: ps.name_ar,
        description: ps.name_en || '',
        icon: '🔧', // default icon
        features: [] // no features from API
      }))
    : staticServices;

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-badge light">⚡ خدماتنا</div>
          <h2 className="section-title light">
            خدمات <span className="highlight">احترافية ومتكاملة</span>
          </h2>
          <p className="section-subtitle light">
            نقدم مجموعة شاملة من الخدمات الكهربائية المتخصصة لتلبية جميع احتياجاتكم
          </p>
        </div>

        <div className="services-grid">
          {displayServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-icon">{service.icon}</div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              <div className="service-card-features">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="service-feature-tag">{feature}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

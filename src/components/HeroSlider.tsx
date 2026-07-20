'use client';

import { useState } from 'react';
import AgencyModal from './AgencyModal';
import type { ApiSlider, ApiAgent } from '@/types/api';
import type { Agency } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { agencies as staticAgencies } from '@/data/siteData';

interface HeroSliderProps {
  sliders?: ApiSlider[];
  agencies?: ApiAgent[];
}

export default function HeroSlider({ sliders, agencies }: HeroSliderProps) {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  
  // Map API agencies to match the static Agency type required by the UI and Modal
  const mappedAgencies: Agency[] = (agencies && agencies.length > 0) 
    ? agencies.map(agent => ({
        id: agent.id.toString(),
        name: agent.name_ar,
        nameEn: agent.name_en,
        // Since API gives an image URL instead of an emoji logo, we could either use an image tag or a default emoji.
        // We'll use the image url and handle it in the render.
        logo: '🏢', 
        description: agent.buy_fome_us_ar,
        products: [], // API doesn't provide products for agents yet
        projects: [], // API doesn't provide projects for agents yet
        reviews: [],  // API doesn't provide reviews for agents yet
        imageUrl: getImageUrl(agent.image) // Adding custom property for image
      })) as (Agency & { imageUrl?: string })[]
    : staticAgencies;

  const displayAgencies = mappedAgencies;

  return (
    <section className="hero" id="home">
      {/* Optionally use sliders from API for background, for now we keep pattern */}
      <div className="hero-pattern" />

      <div className="hero-content">
        <div className="hero-badge">
          ⚡ مركز حضرموت الحديث للكهربائيات
        </div>

        <h1 className="hero-title">
          شريكك الموثوق في عالم{' '}
          <span className="accent">الكهربائيات والطاقة</span>
        </h1>

        <p className="hero-description">
          نوفر لك أحدث المنتجات والحلول الكهربائية من أكبر العلامات التجارية العالمية
          مع خدمة احترافية ودعم فني متخصص على مدار الساعة
        </p>

        <div className="hero-cta-group">
          <button className="btn-primary" onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            اكتشف خدماتنا ⚡
          </button>
          <button className="btn-outline" onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            تواصل معنا 📩
          </button>
        </div>
      </div>

      {/* Agencies Slider */}
      <div className="agencies-section-hero" id="agencies">
        <p className="agencies-title">✦ وكلاء معتمدون لأكبر العلامات التجارية العالمية ✦</p>
        <div className="agencies-slider">
          {displayAgencies.map((agency) => {
            const hasImage = (agency as any).imageUrl;
            return (
              <button
                key={agency.id}
                className="agency-card"
                onClick={() => setSelectedAgency(agency)}
              >
                <span className="agency-card-icon">
                  {hasImage ? (
                    <img src={(agency as any).imageUrl} alt={agency.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    agency.logo
                  )}
                </span>
                <span className="agency-card-name">{agency.name}</span>
                <span className="agency-card-name-en">{agency.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Agency Modal */}
      <AgencyModal
        agency={selectedAgency}
        onClose={() => setSelectedAgency(null)}
      />
    </section>
  );
}

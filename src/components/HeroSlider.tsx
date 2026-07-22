'use client';

import { useState } from 'react';
import AgencyModal from './AgencyModal';
import type { ApiSlider, ApiAgent, ApiProduct, ApiProject } from '@/types/api';
import type { Agency } from '@/types';
import { getImageUrl, cn } from '@/lib/utils';
import { agencies as staticAgencies } from '@/data/siteData';
import { useTranslations, useLocale } from 'next-intl';

interface HeroSliderProps {
  sliders?: ApiSlider[];
  agencies?: ApiAgent[];
  products?: ApiProduct[];
  projects?: ApiProject[];
}

export default function HeroSlider({ sliders, agencies, products, projects }: HeroSliderProps) {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const tHero = useTranslations('HeroSlider');
  const locale = useLocale();

  const safeAgencies = Array.isArray(agencies) ? agencies : [];
  const safeProducts = Array.isArray(products) ? products : [];
  const safeProjects = Array.isArray(projects) ? projects : [];
  
  // Map API agencies to match the static Agency type required by the UI and Modal
  const mappedAgencies: Agency[] = safeAgencies.length > 0 
    ? safeAgencies.map(agent => {
        const agentProducts = safeProducts.length > 0 
          ? safeProducts.filter(p => p.agent === agent.id).map(p => ({
              id: p.id.toString(),
              name: locale === 'ar' ? p.name_product_ar : (p.name_product_en || p.name_product_ar),
              image: getImageUrl(p.image),
              description: locale === 'ar' ? p.description_product_ar : (p.description_product_en || p.description_product_ar),
              category: p.number_group || '',
              price: p.name_uint?.[0]?.price ? `${p.name_uint[0].price} ${locale === 'ar' ? p.name_uint[0].name_unit_ar : (p.name_uint[0].name_unit_en || p.name_uint[0].name_unit_ar)}` : ''
            }))
          : [];

        const agentProjects = safeProjects.length > 0
          ? safeProjects.filter(pr => pr.agent === agent.id).map(pr => ({
              id: pr.id.toString(),
              title: locale === 'ar' ? pr.name_ar : (pr.name_en || pr.name_ar),
              image: getImageUrl(pr.image),
              description: locale === 'ar' ? pr.short_description_ar : (pr.short_description_en || pr.short_description_ar),
              agency: locale === 'ar' ? agent.name_ar : (agent.name_en || agent.name_ar),
              date: pr.completed || pr.start || '',
              location: locale === 'ar' ? pr.location_ar : (pr.location_en || pr.location_ar)
            }))
          : [];

        return {
          id: agent.id.toString(),
          name: locale === 'ar' ? agent.name_ar : (agent.name_en || agent.name_ar),
          nameEn: locale === 'ar' ? agent.name_en : agent.name_ar,
          logo: '🏢', 
          description: locale === 'ar' ? agent.buy_fome_us_ar : (agent.buy_fome_us_en || agent.buy_fome_us_ar),
          products: agentProducts,
          projects: agentProjects,
          reviews: [],
          imageUrl: getImageUrl(agent.image)
        };
      }) as (Agency & { imageUrl?: string })[]
    : staticAgencies;

  const displayAgencies = mappedAgencies;

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary-darker to-primary-dark" 
      id="home"
    >
      {/* Background gradients / overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,_rgba(27,166,156,0.15)_0%,_transparent_50%),_radial-gradient(circle_at_80%_20%,_rgba(245,166,35,0.08)_0%,_transparent_40%)]" />
      
      {/* Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-[calc(80px+60px)] pb-10 text-center animate-fade-in-up">
        
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-sm font-semibold mb-6">
          {tHero('badge')}
        </div>

        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight mb-5">
          {tHero('title_part1')}{' '}
          <span className="bg-gradient-to-br from-primary-light to-accent-light bg-clip-text text-transparent">
            {tHero('title_part2')}
          </span>
        </h1>

        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-9 leading-relaxed">
          {tHero('subtitle')}
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <button 
            className="px-8 py-3.5 rounded-full bg-gradient-to-br from-primary to-primary-light text-white font-bold shadow-[0_4px_20px_rgba(27,166,156,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(27,166,156,0.3)] transition-all duration-300" 
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {tHero('discover_services')}
          </button>
          <button 
            className="px-8 py-3.5 rounded-full border-2 border-white/25 text-white font-bold hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300" 
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {tHero('contact_us')}
          </button>
        </div>
      </div>

      {/* Agencies Slider */}
      <div className="relative z-10 pb-16" id="agencies">
        <p className="text-center text-white/70 text-sm font-medium mb-7 tracking-wide">
          {tHero('agencies_title')}
        </p>
        
        <div className="flex justify-center gap-5 flex-wrap max-w-7xl mx-auto px-6">
          {displayAgencies.map((agency) => {
            const hasImage = (agency as any).imageUrl;
            return (
              <button
                key={agency.id}
                className="flex flex-col items-center gap-2 px-7 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md min-w-[140px] hover:bg-white/10 hover:border-primary-light hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(27,166,156,0.2)] transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedAgency(agency)}
              >
                <span className="text-4xl leading-none">
                  {hasImage ? (
                    <img 
                      src={(agency as any).imageUrl} 
                      alt={agency.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                  ) : (
                    agency.logo
                  )}
                </span>
                <span className="text-sm font-semibold text-white text-center mt-2">
                  {agency.name}
                </span>
                <span className="text-xs text-white/50 -mt-1">
                  {agency.nameEn}
                </span>
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

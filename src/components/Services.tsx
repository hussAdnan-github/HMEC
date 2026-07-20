'use client';

import { services as staticServices } from '@/data/siteData';
import type { ApiService, ApiPublicService } from '@/types/api';
import type { Service } from '@/types';
import { useTranslations, useLocale } from 'next-intl';

interface ServicesProps {
  services?: ApiService[];
  publicServices?: ApiPublicService[];
}

export default function Services({ services, publicServices }: ServicesProps) {
  const tSections = useTranslations('Sections');
  const tServices = useTranslations('Services');
  const locale = useLocale();

  // Try to map public_service or service to the static Service shape
  // If API has publicServices, use them. Else fallback to static.
  const displayServices: Service[] = (publicServices && publicServices.length > 0)
    ? publicServices.map((ps, idx) => ({
        id: ps.id.toString(),
        title: locale === 'ar' ? ps.name_ar : (ps.name_en || ps.name_ar),
        description: '', // Fallback description for dynamic API 
        icon: '🔧', // default icon
        features: [] // no features from API
      }))
    : staticServices;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="services">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-primary-light font-semibold text-sm mb-6 border border-white/5 shadow-sm">
            ⚡ {tSections('our_services')}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            {tServices('title_part1')} <span className="text-primary-light">{tServices('title_part2')}</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            {tServices('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div 
              key={service.id} 
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(27,166,156,0.3)] backdrop-blur-sm flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed flex-grow mb-6">
                {service.description}
              </p>
              
              {service.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

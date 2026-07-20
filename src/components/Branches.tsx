'use client';

import { branches as staticBranches } from '@/data/siteData';
import type { ApiBranch } from '@/types/api';
import { getImageUrl } from '@/lib/utils';
import type { Branch } from '@/types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface BranchesProps {
  branches?: ApiBranch[];
}

export default function Branches({ branches }: BranchesProps) {
  const tSections = useTranslations('Sections');
  const tBranches = useTranslations('Branches');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  const displayBranches: (Branch & { imageUrl?: string })[] = (branches && branches.length > 0)
    ? branches.map(b => ({
        id: b.id.toString(),
        name: locale === 'ar' ? b.name_ar : (b.name_en || b.name_ar),
        address: locale === 'ar' ? b.address_ar : (b.address_en || b.address_ar),
        phone: b.phone,
        email: b.email,
        workingHours: locale === 'ar' ? 'من السبت إلى الخميس: 8 صباحاً - 9 مساءً' : 'Sat to Thu: 8 AM - 9 PM', // Default as API lacks this
        image: '🏢', // Fallback icon
        imageUrl: getImageUrl(b.images),
        mapUrl: b.link_location
      }))
    : staticBranches;

  return (
    <section className="py-24 bg-secondary relative" id="branches">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-subtle text-primary font-semibold text-sm mb-4">
            📍 {tSections('our_branches')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {tBranches('title_part1')} <span className="text-primary">{tBranches('title_part2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {tBranches('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBranches.map((branch) => (
            <div 
              key={branch.id} 
              className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4 group-hover:bg-primary-subtle/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                  {branch.imageUrl ? (
                    <img src={branch.imageUrl} alt={branch.name} className="w-full h-full object-cover" />
                  ) : (
                    branch.image
                  )}
                </div>
                <h3 className="font-extrabold text-xl text-foreground">{branch.name}</h3>
              </div>
              
              <div className="p-6 flex flex-col gap-5">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary flex items-center justify-center shrink-0 mt-1">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-1">{tCommon('address')}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{branch.address}</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary flex items-center justify-center shrink-0 mt-1">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-1">{tCommon('phone')}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed" dir="ltr">{branch.phone}</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary flex items-center justify-center shrink-0 mt-1">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-1">{tCommon('email')}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{branch.email}</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary flex items-center justify-center shrink-0 mt-1">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-1">{tCommon('working_hours')}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{branch.workingHours}</div>
                  </div>
                </div>
                
                {branch.mapUrl && (
                  <a 
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full py-2.5 rounded-lg border-2 border-primary-subtle text-primary font-bold text-center hover:bg-primary hover:text-white transition-colors"
                  >
                    {tCommon('view_on_map')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

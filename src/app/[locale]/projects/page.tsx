import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { getSiteData } from '@/lib/api';
import { Link } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteData = await getSiteData();
  const data = siteData?.data;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="min-h-screen bg-slate-950 flex flex-col">
        {/* Navigation */}
        <Navbar contactInfo={data?.content} />

        {/* Top Spacer & Breadcrumb */}
        <div className="pt-32 pb-8 bg-slate-900 text-white relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_50%,_rgba(27,166,156,0.2)_0%,_transparent_50%)]" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/60">
              <Link href="/" className="hover:text-primary-light transition-colors">
                {locale === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              {locale === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
              <span className="text-white">{locale === 'ar' ? 'مشاريعنا' : 'Projects'}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mt-2">
              {locale === 'ar' ? 'سجل المشاريع المنفذة' : 'Completed Projects Registry'}
            </h1>
          </div>
        </div>

        {/* Catalog */}
        <div className="flex-1 bg-slate-900">
          <Projects projects={data?.project} isHomePage={false} />
        </div>

        {/* Footer */}
        <Footer content={data?.content} />
      </main>
    </NextIntlClientProvider>
  );
}

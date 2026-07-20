'use client';

import { useState, useEffect } from 'react';
import { navLinks } from '@/data/siteData';
import { ApiContent } from '@/types/api';
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

interface NavbarProps {
  contactInfo?: ApiContent;
}

export default function Navbar({ contactInfo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 right-0 left-0 h-20 z-50 transition-all duration-300",
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-md border-b border-white/20" : "bg-transparent"
        )} 
        id="navbar"
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-xl font-extrabold transition-colors">
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center font-black text-sm text-white tracking-tighter shadow-sm">
              HMEC
            </div>
            <span className={cn(
              "transition-colors duration-300",
              scrolled ? "text-primary-dark" : "text-white"
            )}>
              {locale === 'ar' ? 'مركز حضرموت الحديث' : 'Hadramout Modern Center'}
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  scrolled 
                    ? "text-slate-600 hover:text-primary hover:bg-primary-subtle" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                onClick={() => handleLinkClick(link.href)}
              >
                {t(link.id)}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className={cn(
              "relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              scrolled ? "text-slate-600 hover:text-primary hover:bg-primary-subtle" : "text-white/90 hover:text-white hover:bg-white/10"
            )} title={locale === 'ar' ? "سلة التسوق" : "Cart"}>
              <ShoppingCart size={20} />
              <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              scrolled ? "text-slate-600 hover:text-primary hover:bg-primary-subtle" : "text-white/90 hover:text-white hover:bg-white/10"
            )} title={locale === 'ar' ? "تسجيل الدخول" : "Login"}>
              <User size={20} />
            </button>
            
            <button 
              onClick={toggleLanguage}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-colors hidden sm:flex items-center gap-1",
                scrolled 
                  ? "border-primary/20 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary-subtle" 
                  : "border-white/30 text-white/90 hover:border-white/50 hover:bg-white/10"
              )}
              title={locale === 'ar' ? "English" : "العربية"}
            >
              <Globe size={14} />
              {locale === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden w-10 h-10 flex flex-col items-center justify-center transition-colors",
                scrolled ? "text-slate-800" : "text-white"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={locale === 'ar' ? "القائمة" : "Menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-20 bg-white/95 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col p-6 overflow-y-auto",
        mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
      )}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="text-start px-4 py-3 text-lg font-medium text-slate-800 rounded-xl hover:bg-primary-subtle hover:text-primary transition-colors"
              onClick={() => handleLinkClick(link.href)}
            >
              {t(link.id)}
            </button>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-600 bg-slate-50 hover:bg-primary-subtle hover:text-primary transition-colors relative">
            <ShoppingCart size={24} />
            <span className="absolute top-2 left-2 w-5 h-5 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-600 bg-slate-50 hover:bg-primary-subtle hover:text-primary transition-colors">
            <User size={24} />
          </button>
          <button 
            onClick={toggleLanguage}
            className="px-6 py-3 rounded-xl font-semibold border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary-subtle transition-colors flex items-center gap-2"
          >
            <Globe size={18} />
            {locale === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </div>
    </>
  );
}


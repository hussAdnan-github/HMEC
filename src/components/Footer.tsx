'use client';

import { navLinks } from '@/data/siteData';
import type { ApiContent } from '@/types/api';

interface FooterProps {
  content?: ApiContent;
}

export default function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <div className="logo-icon">HMEC</div>
              <span>مركز حضرموت الحديث</span>
            </div>
            <p>
              {content?.we_are_ar || 'مركز متخصص في توفير أحدث المنتجات والحلول الكهربائية من أكبر العلامات التجارية العالمية مع خدمة احترافية ودعم فني متخصص.'}
            </p>
            <div className="contact-social">
              {content?.facebook && <a href={content.facebook} target="_blank" rel="noopener noreferrer" className="social-link" title="فيسبوك">📘</a>}
              {content?.whatsapp && <a href={content.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link" title="واتساب">💬</a>}
              {content?.instagram && <a href={content.instagram} target="_blank" rel="noopener noreferrer" className="social-link" title="إنستجرام">📷</a>}
              {content?.toktek && <a href={content.toktek} target="_blank" rel="noopener noreferrer" className="social-link" title="تيك توك">🎵</a>}
              {content?.location && <a href={content.location} target="_blank" rel="noopener noreferrer" className="social-link" title="الموقع الجغرافي">📍</a>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-heading">خدماتنا</h4>
            <ul className="footer-links">
              <li><a href="#services">توريد المعدات</a></li>
              <li><a href="#services">تنفيذ المشاريع</a></li>
              <li><a href="#services">الطاقة الشمسية</a></li>
              <li><a href="#services">أنظمة الإنارة</a></li>
              <li><a href="#services">الصيانة والدعم</a></li>
              <li><a href="#services">الاستشارات</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">تواصل معنا</h4>
            <ul className="footer-links">
              <li><a href="#contact">📍 {content?.address_ar || 'المكلا، حضرموت'}</a></li>
              <li><a href={content?.whatsapp || "tel:+9675000000"}>📞 {content?.whatsapp ? 'واتساب' : '+967 5 000 000'}</a></li>
              <li><a href={`mailto:${content?.email || 'info@hmec.ye'}`}>📧 {content?.email || 'info@hmec.ye'}</a></li>
              <li><a href="#contact">🕐 السبت - الخميس</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} مركز حضرموت الحديث للكهربائيات. جميع الحقوق محفوظة
            <span className="heart"> ❤️ </span>
            صنع بحب في حضرموت
          </p>
        </div>
      </div>
    </footer>
  );
}

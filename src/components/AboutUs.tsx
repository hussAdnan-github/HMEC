'use client';

import { whyChooseUs } from '@/data/siteData';
import type { ApiContent, ApiGoal } from '@/types/api';

interface AboutUsProps {
  content?: ApiContent;
  goals?: ApiGoal[];
}
 

export default function AboutUs({ content, goals }: AboutUsProps) {
  const weAreText = content?.we_are_ar || 'نحن مركز متخصص في توفير أحدث المنتجات  والحلول الكهربائية...';
  
  // Mapping the content to match the "aboutItems" UI (Vision, Message, Values)
  const aboutItems = [
    { id: 'vision', title: 'رؤيتنا', description: content?.our_vision_ar || 'نسعى لأن نكون الشريك الموثوق لعملائنا...', icon: '🎯' },
    { id: 'message', title: 'رسالتنا', description: content?.our_message_ar || 'تقديم منتجات أصلية بأسعار تنافسية...', icon: '💌' },
    { id: 'values', title: 'قيمنا', description: content?.our_values_ar || 'الجودة، الموثوقية، خدمة العملاء...', icon: '💎' },
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">
        {/* Intro */}
        <div className="about-intro">
          <div className="about-intro-text">
            <div className="section-badge">🏢 من نحن</div>
            <h2>
              مركز حضرموت الحديث <span className="highlight">للكهربائيات</span>
            </h2>
            <p>{weAreText}</p>

            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-number">10+</div>
                <div className="about-stat-label">سنوات خبرة</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">500+</div>
                <div className="about-stat-label">مشروع منفذ</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">1000+</div>
                <div className="about-stat-label">عميل سعيد</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">5+</div>
                <div className="about-stat-label">وكالة عالمية</div>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="about-visual-card">
              <div className="about-visual-content">
                <h3>⚡ نبني المستقبل بالطاقة</h3>
                <p>
                  نحن لا نبيع منتجات فحسب، بل نقدم حلولاً متكاملة تساعد عملائنا على
                  تحقيق أهدافهم بكفاءة وأمان. من التصميم إلى التنفيذ، نحن معكم في كل خطوة.
                </p>
              </div>
              <div className="logo-text">HMEC</div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Goals */}
        <div className="section-header">
          <div className="section-badge">✨ قيمنا</div>
          <h2 className="section-title">
            رؤيتنا ورسالتنا <span className="highlight">وأهدافنا</span>
          </h2>
          <p className="section-subtitle">
            نسعى لتحقيق رؤية واضحة ورسالة سامية تخدم عملائنا ومجتمعنا
          </p>
        </div>

        <div className="about-cards">
          {aboutItems.map((item) => (
            <div key={item.id} className="about-card">
              <div className="about-card-icon">{item.icon}</div>
              <h3 className="about-card-title">{item.title}</h3>
              <p className="about-card-description">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="section-header">
          <div className="section-badge">💎 لماذا نحن</div>
          <h2 className="section-title">
            لماذا تختار <span className="highlight">مركز حضرموت الحديث</span>؟
          </h2>
          <p className="section-subtitle">
            نقدم لك أسباباً حقيقية تجعلنا خيارك الأول في مجال الكهربائيات
          </p>
        </div>

        <div className="why-choose">
          {whyChooseUs.map((item) => (
            <div key={item.id} className="why-card">
              <div className="why-card-stat">{item.stat}</div>
              <div className="why-card-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

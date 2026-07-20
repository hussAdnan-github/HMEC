'use client';

import { useState, FormEvent } from 'react';
import type { ContactFormData } from '@/types';
import type { ApiContent } from '@/types/api';

interface ContactProps {
  content?: ApiContent;
}

export default function Contact({ content }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-badge light">📩 تواصل معنا</div>
          <h2 className="section-title light">
            نحن هنا <span className="highlight">لمساعدتك</span>
          </h2>
          <p className="section-subtitle light">
            تواصل معنا لأي استفسار أو طلب عرض سعر وسنرد عليك في أقرب وقت
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>معلومات التواصل</h3>
            <p>
              يسعدنا تواصلك معنا. فريقنا المتخصص جاهز لمساعدتك في اختيار
              المنتجات والحلول الكهربائية المناسبة لمشروعك.
            </p>

            <div className="contact-detail">
              <div className="contact-detail-icon">📍</div>
              <div className="contact-detail-text">
                <strong>العنوان</strong>
                {content?.address_ar || 'شارع الستين، المكلا، حضرموت، اليمن'}
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">📞</div>
              <div className="contact-detail-text">
                <strong>الهاتف (واتساب)</strong>
                {content?.whatsapp ? (
                  <a href={content.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    تواصل معنا عبر واتساب
                  </a>
                ) : '+967 5 000 000'}
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">📧</div>
              <div className="contact-detail-text">
                <strong>البريد الإلكتروني</strong>
                {content?.email || 'info@hmec.ye'}
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">🕐</div>
              <div className="contact-detail-text">
                <strong>أوقات العمل</strong>
                السبت - الخميس: 8 صباحاً - 10 مساءً
              </div>
            </div>

            <div className="contact-social">
              {content?.facebook && <a href={content.facebook} target="_blank" rel="noopener noreferrer" className="social-link" title="فيسبوك">📘</a>}
              {content?.whatsapp && <a href={content.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link" title="واتساب">💬</a>}
              {content?.instagram && <a href={content.instagram} target="_blank" rel="noopener noreferrer" className="social-link" title="إنستجرام">📷</a>}
              {content?.toktek && <a href={content.toktek} target="_blank" rel="noopener noreferrer" className="social-link" title="تيك توك">🎵</a>}
              {content?.location && <a href={content.location} target="_blank" rel="noopener noreferrer" className="social-link" title="الموقع الجغرافي">📍</a>}
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">الاسم الكامل</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">البريد الإلكتروني</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">رقم الهاتف</label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="form-input"
                  placeholder="+967 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">الموضوع</label>
                <input
                  id="contact-subject"
                  type="text"
                  className="form-input"
                  placeholder="موضوع الرسالة"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">الرسالة</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="اكتب رسالتك هنا..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="form-submit">
              {submitted ? '✅ تم إرسال الرسالة بنجاح!' : '📩 إرسال الرسالة'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

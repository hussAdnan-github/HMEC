'use client';

import { useState, useEffect } from 'react';
import { navLinks } from '@/data/siteData';
import { ApiContent } from '@/types/api';

interface NavbarProps {
  contactInfo?: ApiContent;
}

export default function Navbar({ contactInfo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#" className="navbar-logo">
            <div className="navbar-logo-icon">HMEC</div>
            <span>مركز حضرموت الحديث</span>
          </a>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="navbar-link"
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="navbar-action-btn" title="سلة التسوق">
              🛒
              <span className="badge-count">3</span>
            </button>
            <button className="navbar-action-btn" title="تسجيل الدخول">
              👤
            </button>
            <button className="lang-btn">EN</button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="القائمة"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            className="navbar-link"
            onClick={() => handleLinkClick(link.href)}
          >
            {link.label}
          </button>
        ))}
        <div className="navbar-actions">
          <button className="navbar-action-btn" title="سلة التسوق">
            🛒
            <span className="badge-count">3</span>
          </button>
          <button className="navbar-action-btn" title="تسجيل الدخول">
            👤
          </button>
          <button className="lang-btn">EN</button>
        </div>
      </div>
    </>
  );
}

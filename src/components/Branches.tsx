'use client';

import { branches as staticBranches } from '@/data/siteData';
import type { ApiBranch } from '@/types/api';
import { getImageUrl } from '@/lib/utils';
import type { Branch } from '@/types';

interface BranchesProps {
  branches?: ApiBranch[];
}

export default function Branches({ branches }: BranchesProps) {
  const displayBranches: (Branch & { imageUrl?: string })[] = (branches && branches.length > 0)
    ? branches.map(b => ({
        id: b.id.toString(),
        name: b.name_ar,
        address: b.address_ar,
        phone: b.phone,
        email: b.email,
        workingHours: 'من السبت إلى الخميس: 8 صباحاً - 9 مساءً', // Default as API lacks this
        image: '🏢', // Fallback icon
        imageUrl: getImageUrl(b.images),
        mapUrl: b.link_location
      }))
    : staticBranches;

  return (
    <section className="branches-section" id="branches">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📍 فروعنا</div>
          <h2 className="section-title">
            فروعنا <span className="highlight">في حضرموت</span>
          </h2>
          <p className="section-subtitle">
            نحن قريبون منك دائماً من خلال فروعنا المنتشرة في حضرموت
          </p>
        </div>

        <div className="branches-grid">
          {displayBranches.map((branch) => (
            <div key={branch.id} className="branch-card">
              <div className="branch-card-header">
                <div className="branch-card-icon">
                  {branch.imageUrl ? (
                    <img src={branch.imageUrl} alt={branch.name} style={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'cover' }} />
                  ) : branch.image}
                </div>
                <div className="branch-card-name">{branch.name}</div>
              </div>
              <div className="branch-card-body">
                <div className="branch-info-item">
                  <span className="branch-info-icon">📍</span>
                  <div className="branch-info-text">
                    <strong>العنوان</strong>
                    {branch.address}
                  </div>
                </div>
                <div className="branch-info-item">
                  <span className="branch-info-icon">📞</span>
                  <div className="branch-info-text">
                    <strong>الهاتف</strong>
                    {branch.phone}
                  </div>
                </div>
                <div className="branch-info-item">
                  <span className="branch-info-icon">📧</span>
                  <div className="branch-info-text">
                    <strong>البريد الإلكتروني</strong>
                    {branch.email}
                  </div>
                </div>
                <div className="branch-info-item">
                  <span className="branch-info-icon">🕐</span>
                  <div className="branch-info-text">
                    <strong>أوقات العمل</strong>
                    {branch.workingHours}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import CertificationsSection from '@/components/CertificationsSection';
import Marquee from '@/components/Marquee';

export const metadata: Metadata = {
  title: 'Certifications, Grants & Awards | Ronak Talaviya',
  description:
    'Verified credentials from Google Cloud, Microsoft, ISRO, NASA Space Apps, Rotary Club of Surat 2nd Prize, and Gujarat SSIP ₹90,000 prototype funding grant.',
};

export default function CertificationsPage() {
  return (
    <div className="py-8">
      <CertificationsSection />
      <Marquee />
    </div>
  );
}

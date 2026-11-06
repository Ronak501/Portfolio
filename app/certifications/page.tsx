import type { Metadata } from 'next';
import CertificationsSection from '@/components/CertificationsSection';
import Marquee from '@/components/Marquee';

export const metadata: Metadata = {
  title: 'Certifications, Grants & Awards | Ronak Talaviya',
  description:
    'Verified credentials from Google Cloud, Microsoft, ISRO, NASA Space Apps, Rotary Club of Surat 2nd Prize, ₹4.37L in total grants (Techsodh ₹1.5L + ₹2.87L SSIP Govt Grants: Swachh Sense ₹1.37L, Vision Sentinel ₹90K, Transit Guard ₹60K), and ₹1.5L Sarvam AI credits.',
};

export default function CertificationsPage() {
  return (
    <div className="py-8">
      <CertificationsSection />
      <Marquee />
    </div>
  );
}

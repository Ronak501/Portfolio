import type { Metadata } from 'next';
import VenturesSection from '@/components/VenturesSection';
import Marquee from '@/components/Marquee';

export const metadata: Metadata = {
  title: 'Ventures & Companies | Ronak Talaviya',
  description:
    'Founder @ Ornitech.in, actively scaling Techsodh.in, MyEntryPass.in, and Shapentic.com. Real-world platforms and civic AI innovations.',
};

export default function VenturesPage() {
  return (
    <div className="py-8">
      <VenturesSection />
      <Marquee />
    </div>
  );
}

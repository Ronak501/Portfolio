import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'About Me | Ronak Talaviya',
  description:
    'Background, education at SCET Surat, hackathon awards, engineering philosophy, and journey of Ronak Talaviya.',
};

export default function AboutPage() {
  return (
    <div className="py-8">
      <AboutSection />
      <Testimonials />
    </div>
  );
}

import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact & Let’s Connect | Ronak Talaviya',
  description:
    'Reach out to Ronak Talaviya for enterprise collaborations, engineering opportunities, or startup ventures.',
};

export default function ContactPage() {
  return (
    <div className="py-8">
      <ContactSection />
    </div>
  );
}

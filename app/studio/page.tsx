import type { Metadata } from 'next';
import InteractiveDevStudio from '@/components/InteractiveDevStudio';
import StatsStrip from '@/components/StatsStrip';

export const metadata: Metadata = {
  title: 'Dev Studio & Workstation | Ronak Talaviya',
  description:
    'Interactive development studio with live system architecture blueprints, simulated code execution, and terminal diagnostics.',
};

export default function StudioPage() {
  return (
    <div className="py-8">
      <InteractiveDevStudio />
      <StatsStrip />
    </div>
  );
}

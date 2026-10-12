import type { Metadata } from 'next';
import ProjectsSection from '@/components/ProjectsSection';
import StatsStrip from '@/components/StatsStrip';

export const metadata: Metadata = {
  title: 'Work & Projects | Ronak Talaviya',
  description:
    'Featured projects, case studies, AI fact-checking platforms, real-time collaboration tools, and live GitHub repositories by Ronak Talaviya.',
};

export default function WorkPage() {
  return (
    <div className="py-8">
      <ProjectsSection />
      <StatsStrip />
    </div>
  );
}

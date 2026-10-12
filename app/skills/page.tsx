import type { Metadata } from 'next';
import SkillsBento from '@/components/SkillsBento';
import Marquee from '@/components/Marquee';

export const metadata: Metadata = {
  title: 'Skills & Tech Stack | Ronak Talaviya',
  description:
    'Full-stack and AI technical capabilities: React, Next.js, Node.js, FastAPI, Python, YOLOv8, Docker, and MongoDB.',
};

export default function SkillsPage() {
  return (
    <div className="py-8">
      <SkillsBento />
      <Marquee />
    </div>
  );
}

'use client';

import TechStackDiscs from '@/components/TechStackDiscs';

export default function SkillsBento() {
  return (
    <section id="skills" className="border-b border-border py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Full Circular Logo Tech Stack matching reference design */}
        <TechStackDiscs />
      </div>
    </section>
  );
}

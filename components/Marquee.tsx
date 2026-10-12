'use client';

const BADGES = [
  { name: 'Ornitech.in', tag: 'Founder' },
  { name: 'Techsodh.in', tag: 'Venture' },
  { name: 'MyEntryPass.in', tag: 'Venture' },
  { name: 'Shapentic.com', tag: 'Product Studio' },
  { name: 'BolnaSeekho.in', tag: 'Speech AI' },
  { name: 'React.js', tag: 'Frontend' },
  { name: 'Next.js', tag: 'Full Stack' },
  { name: 'Node.js', tag: 'Runtime' },
  { name: 'FastAPI', tag: 'High Speed Backend' },
  { name: 'Python', tag: 'AI & Scripting' },
  { name: 'YOLOv8', tag: 'Computer Vision' },
  { name: 'MongoDB', tag: 'NoSQL Database' },
  { name: 'Docker', tag: 'Containers' },
  { name: 'TypeScript', tag: 'Type Safe' },
  { name: 'Tailwind CSS', tag: 'UI Styling' },
  { name: 'WebSockets', tag: 'Real-time' },
  { name: 'NASA Space Apps', tag: 'Hackathon' },
  { name: 'SCET Surat', tag: 'Computer Eng' },
  { name: 'Firebase', tag: 'Cloud Auth' },
];

export default function Marquee() {
  return (
    <section aria-label="Technologies and affiliations" className="border-b border-border py-8 overflow-hidden bg-background">
      <p className="px-4 text-center text-xs font-bold tracking-widest text-muted-foreground uppercase">
        Technologies & Platforms I Build With
      </p>

      <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 pr-4 hover:[animation-play-state:paused]">
          {/* Double list for seamless loop */}
          {[...BADGES, ...BADGES].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm transition-colors hover:border-accent/40"
            >
              <span className="size-2 rounded-full bg-accent" />
              <span className="font-heading text-xs sm:text-sm font-bold whitespace-nowrap text-foreground">
                {item.name}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

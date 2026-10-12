'use client';

import {
  GraduationCap,
  MapPin,
  Code,
  Bot,
  Trophy,
  Rocket,
  Brain,
  Smartphone,
  Crown,
} from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Trophy,
    title: '₹2.87L+ Govt Grants & Awards',
    desc: 'Approved funding for Swachh Sense (₹1.37L), Vision Sentinel (₹90K), Trabit Guard (₹60K), plus Rotary Club 2nd Prize & NASA Space Apps.',
  },
  {
    icon: Rocket,
    title: 'Shipped Projects',
    desc: '5+ deployed web applications solving real operational & media problems.',
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    desc: 'Practical integration of YOLOv8, NLP agents, and automated LLM workflows.',
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform Mobile',
    desc: 'Expanding into React Native for connected mobile and IoT interfaces.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="border-b border-border py-20 bg-background/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            About Me
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Who I <span className="text-accent">Am</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            A glimpse into my background, mindset, and what keeps me building.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* Left Text Card */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
              Engineering with curiosity, shipping with intent.
            </h3>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I&apos;m the Founder of <strong className="text-foreground">Ornitech.in</strong>, actively developing <strong className="text-foreground">Techsodh.in</strong>, <strong className="text-foreground">MyEntryPass.in</strong>, <strong className="text-foreground">Shapentic.com</strong>, and <strong className="text-foreground">BolnaSeekho.in</strong>, while completing my 4th year in Computer Engineering at SCET, Surat.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              My engineering philosophy revolves around building real-world software businesses and intelligent developer tools. Over the past few years, I have competed and won awards in hackathons like the NASA Space Apps Challenge, proving that rapid prototyping and robust production infrastructure go hand-in-hand.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Whether architecting enterprise web systems at Ornitech, streamlining digital ticketing with MyEntryPass, or engineering high-throughput AI agent pipelines, I obsess over high performance, clean code, and remarkable aesthetics.
            </p>

            {/* Quick Metadata Chips */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-foreground">
                <Crown className="size-3.5 text-accent" /> Founder @ Ornitech.in
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-foreground">
                <GraduationCap className="size-3.5 text-accent" /> SCET, 4th Year
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-foreground">
                <MapPin className="size-3.5 text-accent" /> Surat, India
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-foreground">
                <Code className="size-3.5 text-accent" /> Full Stack & AI
              </span>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/25">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import {
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Ticket,
  Crown,
  Compass,
  CheckCircle2,
  Award,
} from 'lucide-react';
import IntroLoader from '@/components/IntroLoader';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import Marquee from '@/components/Marquee';

const MODULES = [
  {
    title: 'Work, AI Engine & Active Ventures',
    href: '/work',
    category: 'MODULE // 01',
    description:
      'Founder @ Ornitech.in, actively scaling Techsodh, MyEntryPass, Shapentic, and BolnaSeekho, plus Autonomous AI Agents, Token Engineering benchmarks, and live code repositories.',
    icon: Crown,
    badge: 'All-in-One Flagship',
    gradient: 'from-accent/25 via-accent/5 to-transparent',
  },
  {
    title: 'Skills & Tech Stack Matrix',
    href: '/skills',
    category: 'MODULE // 02',
    description:
      'Circular badge stack across Code, AI/Vision, Cloud DevOps, and 3D Design ecosystems.',
    icon: Layers,
    badge: 'Tech Matrix',
    gradient: 'from-emerald-500/20 via-teal-500/5 to-transparent',
  },
  {
    title: 'Honors, Grants & Certifications',
    href: '/certifications',
    category: 'MODULE // 03',
    description:
      '$32.5K+ Cloud Credits (IACON, Google, MongoDB), ₹5.87L+ Grants (SSIP, Sarvam AI), Rotary Surat 2nd Prize, ISRO & NASA Hackathons.',
    icon: Award,
    badge: '20+ Credentials',
    gradient: 'from-amber-500/25 via-yellow-500/5 to-transparent',
  },
  {
    title: 'About Ronak & Philosophy',
    href: '/about',
    category: 'MODULE // 04',
    description:
      'Computer Engineering at SCET, hackathon wins (NASA Space Apps), and engineering principles.',
    icon: Sparkles,
    badge: 'Dossier',
    gradient: 'from-purple-500/20 via-pink-500/5 to-transparent',
  },
  {
    title: 'Communication & Uplink',
    href: '/contact',
    category: 'MODULE // 05',
    description:
      'Direct dispatch form, 1-click email copy, social links, and project commission inquiries.',
    icon: Terminal,
    badge: 'Uplink',
    gradient: 'from-blue-500/20 via-indigo-500/5 to-transparent',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Intro sequence loader (runs once per session or on replay) */}
      <IntroLoader />

      {/* Main Hero & Overview */}
      <Hero />
      <StatsStrip />
      <Marquee />

      {/* Command Post Portal Navigator */}
      <section className="py-20 border-b border-border bg-background/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                System Navigation
              </span>
              <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
                Command Modules
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Navigate directly to dedicated modules with command-post route dispatching.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted hover:border-accent/40 transition-colors"
            >
              <span>Explore All Modules</span>
              <ArrowRight className="size-4 text-accent" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl overflow-hidden"
                >
                  {/* Subtle top glow */}
                  <div
                    className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${mod.gradient} pointer-events-none`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-wider text-accent font-bold uppercase">
                        {mod.category}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-semibold">
                        {mod.badge}
                      </span>
                    </div>

                    <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card shadow-inner mb-4 group-hover:scale-105 group-hover:border-accent/40 transition-all">
                      <Icon className="size-5 text-accent" />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {mod.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-accent">
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                      Dispatch Module
                    </span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

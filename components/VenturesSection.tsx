'use client';

import {
  Sparkles,
  Shield,
  Bus,
  Leaf,
  ArrowUpRight,
  Globe,
  Ticket,
  Compass,
  Layers,
  Crown,
} from 'lucide-react';
import { sound } from '@/lib/audio';

const CORE_VENTURES = [
  {
    title: 'Ornitech.in',
    url: 'https://ornitech.in',
    tagline: 'Technology Innovation & Bespoke Software Engineering',
    description:
      'My primary venture as Founder. We architect scalable full-stack web applications, custom enterprise platforms, intelligent automations, and modern cloud infrastructures.',
    role: 'Founder & Lead System Architect',
    tags: ['Founder', 'Next.js', 'FastAPI', 'AI Architecture', 'Cloud Ops'],
    badge: 'Founder / Active',
    isPrimary: true,
    accentColor: 'from-accent/25 via-accent/10 to-transparent',
    borderColor: 'border-accent/40 hover:border-accent hover:shadow-accent/20',
    icon: Crown,
  },
  {
    title: 'Techsodh.in',
    url: 'https://techsodh.in',
    tagline: 'Tech Discovery, Research & Software Ecosystem Insights',
    description:
      'Curated platform dedicated to in-depth research, tech discovery, and engineering benchmarks across modern developer stacks, AI frameworks, and emerging tools.',
    role: 'Creator & Tech Lead',
    tags: ['Tech Research', 'Discovery', 'Software Reviews', 'Ecosystem'],
    badge: 'Building',
    isPrimary: false,
    accentColor: 'from-blue-500/20 via-cyan-500/5 to-transparent',
    borderColor: 'hover:border-cyan-500/50',
    icon: Compass,
  },
  {
    title: 'MyEntryPass.in',
    url: 'https://myentrypass.in',
    tagline: 'Next-Gen Digital Ticketing & Live QR Access Management',
    description:
      'Seamless event ticketing and access control infrastructure. Provides dynamic fraud-proof QR credentials, instant gate scanning, and live organizer analytics.',
    role: 'Product Architect & Full-Stack Lead',
    tags: ['Digital Ticketing', 'QR Verification', 'Real-time Gates', 'FinTech'],
    badge: 'Building',
    isPrimary: false,
    accentColor: 'from-emerald-500/20 via-teal-500/5 to-transparent',
    borderColor: 'hover:border-emerald-500/50',
    icon: Ticket,
  },
  {
    title: 'Shapentic.com',
    url: 'https://shapentic.com',
    tagline: 'Creative Product Studio & Digital Design Experiences',
    description:
      'Modern digital studio crafting high-converting brand platforms, bespoke user interfaces, and interactive web products designed to scale from zero to one.',
    role: 'Co-Creator & Frontend Architect',
    tags: ['Product Studio', 'UI/UX Design', 'Next.js', 'Creative Web'],
    badge: 'Building',
    isPrimary: false,
    accentColor: 'from-purple-500/20 via-pink-500/5 to-transparent',
    borderColor: 'hover:border-purple-500/50',
    icon: Layers,
  },
];

const CIVIC_AI_VENTURES = [
  {
    title: 'Swachh Sense',
    tagline: 'AI Cleanliness Monitoring & IoT Waste Detection',
    description:
      'Computer vision system monitoring waste accumulation in public spaces and triggering municipal sanitation dispatches.',
    role: 'Edge AI detection & sensor telemetry',
    tags: ['Computer Vision', 'IoT Sensors', 'Smart City'],
    impact: 'Automated waste alerts',
    icon: Leaf,
    badge: 'Smart City',
  },
  {
    title: 'Vision Sentinel',
    tagline: 'AI-Powered Anomaly & Threat Surveillance',
    description:
      'Intelligent video analytics platform utilizing Google Vision for real-time facility security and crowd anomaly detection.',
    role: 'Google Vision API & dispatcher pipeline',
    tags: ['Google Vision AI', 'Real-time', 'Security'],
    impact: 'Automated threat detection',
    icon: Shield,
    badge: 'Security AI',
  },
  {
    title: 'Transit Guard',
    tagline: 'YOLOv8 Edge Passenger Counting & Transport Analytics',
    description:
      'Computer vision system using YOLOv8 for passenger flow tracking, overcrowding detection, and capacity metrics.',
    role: 'YOLOv8 edge object tracking',
    tags: ['YOLOv8', 'Edge AI', 'Public Transit'],
    impact: '96% counting precision',
    icon: Bus,
    badge: 'Transit AI',
  },
];

export default function VenturesSection() {
  return (
    <section id="ventures" className="border-b border-border py-20 bg-background/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Founder & Active Ventures
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Companies & <span className="text-accent">Products</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            From founding <strong>Ornitech.in</strong> to launching specialized software platforms like <strong>Techsodh</strong>, <strong>MyEntryPass</strong>, and <strong>Shapentic</strong>.
          </p>
        </div>

        {/* Core Ventures Grid (4 Key Products) */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {CORE_VENTURES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`group relative flex flex-col justify-between rounded-3xl border bg-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${v.borderColor} overflow-hidden`}
              >
                {/* Background glow gradient */}
                <div
                  className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${v.accentColor} pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card shadow-inner">
                        <Icon className="size-5 text-accent" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/20">
                        {v.badge}
                      </span>
                    </div>

                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-3 py-1 font-mono text-xs font-semibold text-foreground hover:bg-muted hover:border-accent/40 transition-colors"
                    >
                      <Globe className="size-3 text-accent" />
                      <span>Visit</span>
                      <ArrowUpRight className="size-3 text-muted-foreground" />
                    </a>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-accent transition-colors">
                    {v.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-accent font-semibold">
                    {v.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>

                  <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-2.5 text-xs text-foreground/85">
                    <span className="font-semibold text-accent">Role: </span>
                    {v.role}
                  </div>
                </div>

                <div className="relative z-10 mt-6 border-t border-border/80 pt-4 flex flex-wrap gap-1.5">
                  {v.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted/80 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Civic AI & Smart City Innovations */}
        <div className="rounded-3xl border border-border bg-card/50 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                Civic & Computer Vision Systems
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                AI Solutions for Public Infrastructure
              </h3>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {CIVIC_AI_VENTURES.map((civic) => {
              const Icon = civic.icon;
              return (
                <div
                  key={civic.title}
                  className="rounded-2xl border border-border/80 bg-background/60 p-5 flex flex-col justify-between hover:border-accent/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="size-5 text-accent" />
                      <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {civic.badge}
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-foreground">
                      {civic.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {civic.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-emerald-400 font-medium">
                    ● {civic.impact}
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

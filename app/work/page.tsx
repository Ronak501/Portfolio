import type { Metadata } from 'next';
import VenturesSection from '@/components/VenturesSection';
import GodAiSection from '@/components/GodAiSection';
import ProjectsSection from '@/components/ProjectsSection';
import InteractiveDevStudio from '@/components/InteractiveDevStudio';
import StatsStrip from '@/components/StatsStrip';
import Marquee from '@/components/Marquee';
import { Crown, Cpu, Code2, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Work, AI Engine & Ventures | Ronak Talaviya',
  description:
    'All-in-one flagship portfolio: Founder @ Ornitech.in, actively scaling Techsodh.in, MyEntryPass.in, Shapentic.com, BolnaSeekho.in, alongside autonomous AI agent loops, token engineering benchmarks, and featured production codebases.',
};

export default function WorkPage() {
  return (
    <div className="py-6">
      {/* Quick In-Page Section Anchor Jump Bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-md py-3 transition-colors">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground shrink-0 hidden sm:inline">
            Ecosystem Navigator:
          </span>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#ventures"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Crown className="size-3.5 text-accent" />
              <span>Active Ventures</span>
            </a>

            <a
              href="#ai"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Cpu className="size-3.5 text-cyan-400" />
              <span>AI Engine & Tokens</span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Code2 className="size-3.5 text-orange-400" />
              <span>Featured Projects</span>
            </a>

            <a
              href="#studio"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-accent/40 hover:text-accent transition-colors"
            >
              <Terminal className="size-3.5 text-emerald-400" />
              <span>Dev Terminal</span>
            </a>
          </div>
        </div>
      </div>

      {/* Module 1: Founder & Active Ventures (Ornitech + 4 Products + Civic AI) */}
      <VenturesSection />

      {/* Module 2: God-Tier AI Systems & Token Engineering */}
      <GodAiSection />

      {/* Module 3: Featured Production Projects */}
      <ProjectsSection />

      {/* Module 4: Interactive Dev Studio & Command Terminal */}
      <InteractiveDevStudio />

      {/* High-Impact Stat Strip & Marquee */}
      <StatsStrip />
      <Marquee />
    </div>
  );
}

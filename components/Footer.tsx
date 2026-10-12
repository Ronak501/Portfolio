'use client';

import Link from 'next/link';
import { ArrowUp, Play, Heart } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayIntro = () => {
    sound.playClick();
    sessionStorage.removeItem('intro-seen');
    window.location.reload();
  };

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-border/70">
          <div>
            <Link
              href="/"
              onClick={() => sound.playClick()}
              className="font-heading text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
            >
              Ronak<span className="text-accent">.</span>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">
              Full Stack & AI Developer · SCET Computer Engineering
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-semibold text-muted-foreground">
            <Link href="/work" onClick={() => sound.playClick()} className="hover:text-foreground transition-colors">
              Work & Ventures
            </Link>
            <Link href="/skills" onClick={() => sound.playClick()} className="hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="/certifications" onClick={() => sound.playClick()} className="hover:text-foreground transition-colors">
              Certifications
            </Link>
            <Link href="/about" onClick={() => sound.playClick()} className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={() => sound.playClick()} className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReplayIntro}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
            >
              <Play className="size-3 text-accent" />
              <span>Replay Intro</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>© {new Date().getFullYear()} Ronak Talaviya. All rights reserved.</p>

          <nav aria-label="Legal" className="flex items-center gap-4 font-medium">
            <Link href="/terms" onClick={() => sound.playClick()} className="hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/privacy" onClick={() => sound.playClick()} className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
          </nav>

          <p className="flex items-center gap-1">
            Built with Next.js & Tailwind CSS. Inspired by synitx.dev.
          </p>
        </div>
      </div>
    </footer>
  );
}

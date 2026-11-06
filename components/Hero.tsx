'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  Terminal,
  FileDown,
  Sparkles,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
} from 'lucide-react';
import { sound } from '@/lib/audio';

const ROLES = [
  'full-stack systems',
  'AI agent pipelines',
  'computer vision models',
  'real-time web apps',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    let heroIsVisible = true;

    const stopRotation = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const startRotation = () => {
      if (!timer && heroIsVisible && !document.hidden) {
        timer = setInterval(() => {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 3200);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      heroIsVisible = entry.isIntersecting;
      if (heroIsVisible) startRotation();
      else stopRotation();
    }, { threshold: 0.2 });

    if (heroRef.current) observer.observe(heroRef.current);
    const handleVisibilityChange = () => {
      if (document.hidden) stopRotation();
      else startRotation();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopRotation();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[640px] lg:min-h-[760px] items-center overflow-hidden border-b border-border bg-background"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headlines & CTA */}
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            {/* Status Pill */}
            <Link
              href="/work#ventures"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1 text-xs sm:text-sm font-semibold text-foreground backdrop-blur hover:border-accent/40 transition-colors shadow-sm"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              <span>Founder @ Ornitech.in · Building Techsodh, MyEntryPass, Shapentic & BolnaSeekho</span>
            </Link>

            {/* Intro text */}
            <div className="space-y-1">
              <p className="font-heading text-xl sm:text-2xl font-medium text-foreground/80">
                Hey, I&apos;m
              </p>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
                Ronak <span className="text-accent">Talaviya</span>
              </h1>
            </div>

            {/* Dynamic Animated Role */}
            <div className="flex items-center gap-2 text-xl sm:text-3xl font-bold font-heading text-foreground">
              <span>I build</span>
              <span className="relative inline-flex overflow-hidden rounded-md border border-accent/20 bg-accent/15 px-2.5 py-1 text-accent">
                <span key={roleIndex} className="role-exchange">
                  {ROLES[roleIndex]}
                </span>
              </span>
            </div>

            {/* Short Bio */}
            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Computer Engineering student at SCET Surat and founder at <strong className="text-foreground font-semibold">Ornitech</strong>. I build full-stack products and AI systems with Next.js, Python/FastAPI, and computer vision, including <strong className="text-foreground font-semibold">Techsodh</strong>, <strong className="text-foreground font-semibold">MyEntryPass</strong>, <strong className="text-foreground font-semibold">Shapentic</strong>, and <strong className="text-foreground font-semibold">BolnaSeekho</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/work"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-accent/25 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0"
              >
                <Terminal className="size-4" />
                <span>See my work</span>
              </Link>

              <a
                href="/Ronak.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChime()}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm sm:text-base font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:border-accent/40 active:translate-y-0"
              >
                <FileDown className="size-4 text-accent" />
                <span>Download Resume</span>
              </a>

              <Link
                href="/about"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-3 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>About me</span>
              </Link>
            </div>

            {/* Scroll Down */}
            <Link
              href="/work"
              onClick={() => sound.playClick()}
              className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-accent transition-colors"
            >
              <span>Explore my work & ventures</span>
              <ArrowDown className="size-4 text-accent" />
            </Link>
          </div>

          {/* Right Column: Hero Visual Card with 3D feel & floating tech badges */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Outer decorative ambient glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent/30 via-transparent to-accent/20 blur-2xl" />

              {/* Main Card Frame */}
              <div className="relative rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
                {/* Photo with glowing ring */}
                <div className="hero-photo group relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl border border-border/80">
                  <Image
                    src="/Ronak.jpeg"
                    alt="Ronak Talaviya"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Card overlay info */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur-md">
                    <p className="font-heading text-base font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="size-4 text-accent" />
                      Ronak Talaviya
                    </p>
                    <p className="font-mono text-xs text-zinc-300">
                      SCET Surat · Full Stack & AI
                    </p>
                  </div>
                </div>

                {/* Floating Tech Chips */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-foreground">
                    <Code2 className="size-3 text-accent" /> React / Next.js
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-foreground">
                    <Cpu className="size-3 text-accent" /> Python & FastAPI
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-foreground">
                    <Layers className="size-3 text-accent" /> YOLOv8 Vision
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

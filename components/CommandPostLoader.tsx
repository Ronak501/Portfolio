'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Cpu,
  Crown,
  Terminal,
  Code2,
  Send,
  User,
  Shield,
  Lock,
  Compass,
} from 'lucide-react';
import { sound } from '@/lib/audio';

interface RouteMeta {
  title: string;
  badge: string;
}

const ROUTE_DATA: Record<string, RouteMeta> = {
  '/': { title: 'System Dashboard', badge: 'Command Center' },
  '/work': { title: 'Work & Projects', badge: 'Production Systems' },
  '/ai': { title: 'God-Tier AI Engine', badge: 'Agent Architecture' },
  '/ventures': { title: 'Ventures & Companies', badge: 'Ornitech & Products' },
  '/studio': { title: 'Interactive Dev Studio', badge: 'Live Workstation' },
  '/skills': { title: 'Skills & Capabilities', badge: 'Tech Stack Matrix' },
  '/about': { title: 'About Ronak Talaviya', badge: 'Engineer Dossier' },
  '/contact': { title: 'Communication Uplink', badge: 'Direct Dispatch' },
  '/terms': { title: 'Terms & Conditions', badge: 'Legal Framework' },
  '/privacy': { title: 'Privacy Policy', badge: 'Security Policy' },
};

export default function CommandPostLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathRef = useRef(pathname);

  const routeInfo = ROUTE_DATA[pathname] || {
    title: pathname.replace('/', '').toUpperCase() || 'SYSTEM',
    badge: 'Navigation',
  };

  useEffect(() => {
    // Only trigger when the pathname changes
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setLoading(true);
      setFading(false);
      setProgress(15);
      sound.playClick();

      // Fluid smooth progress ticks (no code printing)
      const t1 = setTimeout(() => setProgress(55), 80);
      const t2 = setTimeout(() => setProgress(88), 180);
      const t3 = setTimeout(() => {
        setProgress(100);
        sound.playChime();
      }, 300);

      // Smooth fade-out transition
      const t4 = setTimeout(() => setFading(true), 420);
      const t5 = setTimeout(() => {
        setLoading(false);
        setFading(false);
        setProgress(0);
      }, 620);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/90 backdrop-blur-md select-none transition-opacity duration-200 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Laser Progress Line */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-muted/30 z-[10000]">
        <div
          className="h-full bg-gradient-to-r from-accent via-emerald-400 to-accent transition-all duration-200 ease-out shadow-[0_0_14px_var(--accent-ink)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Center Command Post HUD Card */}
      <div className="relative mx-4 w-full max-w-sm rounded-3xl border border-border/80 bg-card/95 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-accent/20 animate-in zoom-in-95 duration-150">
        {/* Glowing Radar Spinner & Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            {/* Smooth Glowing Orbital Pulse */}
            <div className="relative flex size-9 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
              <div className="relative flex size-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                <div className="size-3.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent-ink)]" />
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                Command Post
              </span>
              <p className="font-heading text-xs font-semibold text-foreground/80">
                Transitioning Viewport
              </p>
            </div>
          </div>

          <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            {routeInfo.badge}
          </span>
        </div>

        {/* Center Target Info */}
        <div className="py-6 text-center">
          <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
            {routeInfo.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Synchronizing interface module...
          </p>
        </div>

        {/* Smooth Neon Progress Bar */}
        <div className="space-y-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted border border-border/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-200 ease-out shadow-[0_0_12px_var(--accent-ink)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
            <span className="text-foreground/75 font-semibold">Route: {pathname}</span>
            <span className="text-accent font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

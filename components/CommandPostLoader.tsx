'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Crown,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { sound } from '@/lib/audio';

interface RouteMeta {
  title: string;
  badge: string;
  icon: typeof Terminal;
}

const ROUTE_DATA: Record<string, RouteMeta> = {
  '/': { title: 'System Overview', badge: 'Command Center', icon: Terminal },
  '/work': { title: 'Work & Projects', badge: 'Production Systems', icon: Layers },
  '/ai': { title: 'God-Tier AI Engine', badge: 'Agent Architecture', icon: Cpu },
  '/ventures': { title: 'Ventures & Companies', badge: 'Ornitech & Products', icon: Crown },
  '/skills': { title: 'Skills & Tech Stack', badge: 'Tech Matrix', icon: Layers },
  '/about': { title: 'About Ronak Talaviya', badge: 'Engineer Dossier', icon: Sparkles },
  '/contact': { title: 'Communication Uplink', badge: 'Direct Dispatch', icon: Terminal },
  '/terms': { title: 'Terms & Conditions', badge: 'Legal Framework', icon: ShieldCheck },
  '/privacy': { title: 'Privacy Policy', badge: 'Security Policy', icon: ShieldCheck },
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
    icon: Terminal,
  };

  const Icon = routeInfo.icon;

  useEffect(() => {
    // Only trigger when the pathname changes
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setLoading(true);
      setFading(false);
      setProgress(20);
      sound.playClick();

      // Fluid smooth progress ticks
      const t1 = setTimeout(() => setProgress(60), 80);
      const t2 = setTimeout(() => setProgress(90), 180);
      const t3 = setTimeout(() => {
        setProgress(100);
        sound.playChime();
      }, 280);

      // Smooth fade-out transition
      const t4 = setTimeout(() => setFading(true), 380);
      const t5 = setTimeout(() => {
        setLoading(false);
        setFading(false);
        setProgress(0);
      }, 540);

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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl select-none transition-opacity duration-200 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top macOS Laser Line */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-muted/20 z-[10000]">
        <div
          className="h-full bg-gradient-to-r from-accent via-emerald-400 to-accent transition-all duration-150 ease-out shadow-[0_0_16px_var(--accent-ink)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50" />

      {/* macOS Command Post Window */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-zinc-700/60 bg-[#0d0f17]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-1 ring-white/10 animate-in zoom-in-95 duration-150 overflow-hidden">
        {/* macOS Title Bar with Traffic Lights */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#161924]/90 px-4 py-3">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#FF5F56] shadow-sm ring-1 ring-black/20" />
            <span className="size-3 rounded-full bg-[#FFBD2E] shadow-sm ring-1 ring-black/20" />
            <span className="size-3 rounded-full bg-[#27C93F] shadow-sm ring-1 ring-black/20" />
          </div>

          {/* Centered Window Title */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Terminal className="size-3.5 text-accent" />
            <span className="font-semibold tracking-wide">command-post ~ {pathname}</span>
          </div>

          {/* Status Badge */}
          <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            ONLINE
          </span>
        </div>

        {/* macOS Window Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Center Orbital Radar & Target Info */}
          <div className="flex items-center gap-4">
            {/* High-tech pulsing icon disk */}
            <div className="relative flex size-14 items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-accent/20 animate-ping" />
              <div className="relative flex size-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15 shadow-inner">
                <Icon className="size-6 text-accent animate-pulse" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                  {routeInfo.badge}
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  HTTP/2 200 OK
                </span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                {routeInfo.title}
              </h3>
              <p className="font-mono text-xs text-zinc-400">
                Dispatching viewport interface...
              </p>
            </div>
          </div>

          {/* Ultra-Smooth Animated Gradient Progress Bar */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/60">
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent via-emerald-400 to-accent transition-all duration-150 ease-out shadow-[0_0_12px_var(--accent-ink)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>PATH: {pathname}</span>
              </span>
              <span className="text-accent font-bold">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

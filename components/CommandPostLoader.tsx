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
  Award,
} from 'lucide-react';
import { sound } from '@/lib/audio';

interface RouteMeta {
  title: string;
  badge: string;
  icon: typeof Terminal;
}

const ROUTE_DATA: Record<string, RouteMeta> = {
  '/': { title: 'System Overview', badge: 'Command Center', icon: Terminal },
  '/work': { title: 'Work, AI & Ventures', badge: 'Ecosystem Showcase', icon: Layers },
  '/skills': { title: 'Skills & Tech Stack', badge: 'Tech Matrix', icon: Layers },
  '/certifications': { title: 'Honors & Certifications', badge: 'Verified Credentials', icon: Award },
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

      // Fast, non-blocking progress ticks so navigation feels instantaneous
      const t1 = setTimeout(() => setProgress(75), 50);
      const t2 = setTimeout(() => {
        setProgress(100);
      }, 150);

      // Smooth fade-out transition
      const t3 = setTimeout(() => setFading(true), 220);
      const t4 = setTimeout(() => {
        setLoading(false);
        setFading(false);
        setProgress(0);
      }, 340);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] select-none transition-opacity duration-150 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Laser Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-muted/20 z-[10000]">
        <div
          className="h-full bg-gradient-to-r from-accent via-emerald-400 to-accent transition-all duration-150 ease-out shadow-[0_0_16px_var(--accent-ink)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Compact Non-Blocking HUD Indicator (bottom-left) */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[10000] flex items-center gap-3 rounded-2xl border border-zinc-700/70 bg-[#0d0f17]/95 px-4 py-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
        <div className="flex size-8 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 shrink-0">
          <Icon className="size-4 text-accent animate-pulse" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
              {routeInfo.badge}
            </span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">
              {progress}%
            </span>
          </div>
          <p className="font-heading text-xs font-bold text-white truncate">
            {routeInfo.title}
          </p>
        </div>
      </div>
    </div>
  );
}

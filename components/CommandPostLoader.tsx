'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Terminal, Shield, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'HOME :: SYSTEM_DASHBOARD',
  '/work': 'MODULE :: WORK_&_PROJECTS',
  '/ai': 'ENGINE :: GOD_AI_&_AGENTS',
  '/ventures': 'VENTURES :: ORNITECH_&_PRODUCTS',
  '/studio': 'WORKSPACE :: INTERACTIVE_DEV_STUDIO',
  '/skills': 'TOOLBOX :: TECH_STACK_MATRIX',
  '/about': 'DOSSIER :: ABOUT_RONAK',
  '/contact': 'UPLINK :: CONTACT_&_DISPATCH',
  '/terms': 'LEGAL :: TERMS_&_CONDITIONS',
  '/privacy': 'SECURITY :: PRIVACY_POLICY',
};

export default function CommandPostLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [logLines, setLogLines] = useState<string[]>([]);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Only trigger on route changes
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setDisplayPath(pathname);
      setLoading(true);
      sound.playClick();

      const label = ROUTE_LABELS[pathname] || `NAVIGATING -> ${pathname.toUpperCase()}`;

      setLogLines([
        `[COMMAND-POST] DISPATCHING ROUTE HANDLER...`,
        `> EXEC: cd ${pathname}`,
        `> LOADING TARGET: ${label}`,
      ]);

      const timer1 = setTimeout(() => {
        setLogLines((prev) => [...prev, `> ALLOCATING BUFFER: [====================] 100%`]);
      }, 140);

      const timer2 = setTimeout(() => {
        sound.playChime();
        setLogLines((prev) => [...prev, `> STATUS: 200 OK :: RENDERING VIEWPORT`]);
      }, 280);

      const timer3 = setTimeout(() => {
        setLoading(false);
      }, 480);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl p-4 select-none animate-in fade-in duration-100">
      {/* Background terminal grid scanline */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Command Post Box */}
      <div className="relative w-full max-w-lg rounded-2xl border border-accent/40 bg-[#0e0c14] p-5 shadow-2xl ring-1 ring-accent/20">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-accent animate-ping" />
            <Terminal className="size-4 text-accent" />
            <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
              COMMAND-POST :: ROUTER DISPATCH
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ACTIVE
          </span>
        </div>

        {/* Command Output Stream */}
        <div className="font-mono text-xs space-y-1.5 min-h-[110px] text-zinc-300">
          {logLines.map((line, idx) => (
            <div
              key={idx}
              className={
                line.includes('200 OK')
                  ? 'text-emerald-400 font-bold flex items-center gap-1.5'
                  : line.includes('LOADING TARGET')
                  ? 'text-accent font-semibold'
                  : 'text-zinc-400'
              }
            >
              {line.includes('200 OK') && <CheckCircle2 className="size-3.5 inline text-emerald-400" />}
              {line}
            </div>
          ))}
          <div className="inline-block size-2 bg-accent animate-pulse" />
        </div>

        {/* High-speed Progress Bar */}
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span className="text-accent font-bold">ROUTE: {displayPath}</span>
          <span className="text-emerald-400 font-bold">TRANSFER: INSTANT</span>
        </div>
      </div>
    </div>
  );
}

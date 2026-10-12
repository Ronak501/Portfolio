'use client';

import { useState } from 'react';
import {
  X,
  ExternalLink,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { sound } from '@/lib/audio';

export interface VentureItem {
  title: string;
  url: string;
  tagline: string;
  description: string;
  role: string;
  tags: string[];
  badge: string;
  isPrimary?: boolean;
}

export default function VenturePreviewModal({
  venture,
  onClose,
}: {
  venture: VentureItem | null;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!venture) return null;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(venture.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    sound.playClick();
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  const deviceWidthClasses = {
    desktop: 'w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[390px]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col h-[90vh] w-full max-w-6xl rounded-2xl sm:rounded-3xl border border-border bg-[#0d0f14] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-accent/20"
      >
        {/* Browser Mockup Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-[#141721] px-4 py-3">
          {/* Traffic lights & Venture Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                aria-label="Close preview"
                className="size-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
              />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-border/60">
              <span className="font-heading text-sm font-bold text-foreground">
                {venture.title}
              </span>
              <span className="font-mono text-[10px] text-accent bg-accent/15 px-2 py-0.5 rounded-full font-semibold border border-accent/20">
                {venture.badge}
              </span>
            </div>
          </div>

          {/* Interactive URL Address Bar */}
          <div className="flex flex-1 items-center justify-center max-w-md mx-auto">
            <div className="flex w-full items-center gap-2 rounded-xl border border-border/80 bg-[#090b10] px-3 py-1.5 text-xs text-muted-foreground shadow-inner">
              <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-zinc-300 truncate select-all">{venture.url}</span>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy link"
                className="ml-auto flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Controls: Device Switcher + Actions */}
          <div className="flex items-center gap-2">
            {/* Device Switcher */}
            <div className="hidden sm:flex items-center rounded-lg border border-border/70 bg-card p-0.5">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDevice('desktop');
                }}
                title="Desktop View"
                className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Monitor className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDevice('tablet');
                }}
                title="Tablet View"
                className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                  device === 'tablet' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Tablet className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDevice('mobile');
                }}
                title="Mobile View"
                className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Smartphone className="size-3.5" />
              </button>
            </div>

            {/* Reload iframe */}
            <button
              type="button"
              onClick={handleReload}
              title="Reload Frame"
              className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
            >
              <RotateCw className="size-3.5" />
            </button>

            {/* Open in new tab */}
            <a
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playChime()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-accent-hover transition-colors"
            >
              <span>Open Live</span>
              <ExternalLink className="size-3.5" />
            </a>

            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Browser Viewport Canvas */}
        <div className="relative flex-1 bg-[#07080c] overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4">
          <div
            className={`relative h-full transition-all duration-300 rounded-xl overflow-hidden border border-border/80 shadow-2xl bg-background flex flex-col ${deviceWidthClasses[device]}`}
          >
            {/* Live Iframe */}
            <iframe
              key={iframeKey}
              src={venture.url}
              title={`${venture.title} live preview`}
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />

            {/* Notice / Fallback footer bar */}
            <div className="border-t border-border bg-card/95 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-zinc-300">
                  Previewing: <strong className="text-accent">{venture.title}</strong>
                </span>
                <span className="text-muted-foreground hidden sm:inline">· {venture.tagline}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-[11px] hidden md:inline">
                  If website restricts embedded frames via security headers, open directly:
                </span>
                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <span>Visit {venture.url}</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

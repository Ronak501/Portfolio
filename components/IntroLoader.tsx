'use client';

import { useState, useEffect } from 'react';
import { sound } from '@/lib/audio';

export default function IntroLoader({ onFinish }: { onFinish?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('intro-seen', 'true');
      onFinish?.();
      return;
    }

    // Check if intro was already seen this session
    const seen = sessionStorage.getItem('intro-seen');
    if (seen) {
      if (onFinish) onFinish();
      return;
    }

    setVisible(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleComplete();
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    sound.playClick();
    setFading(true);
    sessionStorage.setItem('intro-seen', 'true');
    setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 600);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background select-none transition-opacity duration-600 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-md w-full animate-fadeIn">
        <p className="font-heading text-lg sm:text-xl font-medium text-foreground/70 mb-2">
          hey, i&apos;m
        </p>

        <h1 id="intro-title" className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-accent">
          RONAK
        </h1>

        <p className="mt-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-accent font-semibold uppercase">
          full stack dev · ai engineer · builder
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs h-1.5 bg-muted rounded-full mt-8 overflow-hidden relative border border-border">
          <div
            role="progressbar"
            aria-label="Loading portfolio intro"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-full bg-accent transition-all duration-100 ease-out rounded-full shadow-[0_0_12px_var(--accent-ink)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full max-w-xs mt-3">
          <span className="font-mono text-xs text-muted-foreground">{progress}%</span>
          <button
            type="button"
            onClick={handleComplete}
            autoFocus
            className="font-mono text-xs text-muted-foreground/60 hover:text-foreground transition-colors focus-visible:text-foreground"
          >
            click to skip
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import RonakVoiceAgent from './RonakVoiceAgent';
import { sound } from '@/lib/audio';

export default function GlobalAiWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      {/* Floating Launcher Pill positioned cleanly above SoundPlayer */}
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label="Open Ronak AI Voice and Data Assistant"
        className="group fixed right-4 bottom-[4.5rem] z-40 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/95 px-3.5 py-2.5 text-xs font-bold text-foreground shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-accent/20 sm:right-6 sm:bottom-20"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Bot className="size-3.5" />
        </span>
        <span className="hidden sm:inline">Ask Ronak AI</span>
        <Sparkles className="size-3 text-accent" />
      </button>

      {/* Interactive Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-3 backdrop-blur-sm sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sound.playClick();
              setOpen(false);
            }
          }}
        >
          <div className="w-full max-w-2xl">
            <RonakVoiceAgent variant="drawer" onCloseDrawer={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    const isNowActive = sound.toggleMute();
    setIsPlaying(isNowActive);
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Mute sound effects' : 'Unmute sound effects'}
      title={isPlaying ? 'Mute sound effects' : 'Unmute sound effects'}
      className="group fixed right-4 bottom-4 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 sm:right-6 sm:bottom-6 hover:border-accent"
    >
      {isPlaying ? (
        <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
          <span
            style={{ animationDelay: '0s' }}
            className="sound-bar block w-[3px] rounded-full bg-accent"
          />
          <span
            style={{ animationDelay: '-0.27s' }}
            className="sound-bar block w-[3px] rounded-full bg-accent"
          />
          <span
            style={{ animationDelay: '-0.54s' }}
            className="sound-bar block w-[3px] rounded-full bg-accent"
          />
          <span
            style={{ animationDelay: '-0.81s' }}
            className="sound-bar block w-[3px] rounded-full bg-accent"
          />
        </span>
      ) : (
        <VolumeX className="size-4 text-muted-foreground" />
      )}
    </button>
  );
}

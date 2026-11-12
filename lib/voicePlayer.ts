'use client';

export type VoiceProviderId =
  | 'sarvam-clone'
  | 'sarvam-agent'
  | 'openai-agent'
  | 'elevenlabs-agent'
  | 'browser';

export interface VoiceCalibration {
  rate: number;
  pitch: number;
  voiceURI: string;
  autoSpeak: boolean;
}

export const DEFAULT_CALIBRATION: VoiceCalibration = {
  rate: 1.02,
  pitch: 0.96,
  voiceURI: '',
  autoSpeak: true,
};

const STORAGE_KEY = 'ronak_ai_voice_calibration_v1';

export function loadVoiceCalibration(): VoiceCalibration {
  if (typeof window === 'undefined') return DEFAULT_CALIBRATION;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CALIBRATION;
    const parsed = JSON.parse(raw);
    return {
      rate: typeof parsed.rate === 'number' ? parsed.rate : DEFAULT_CALIBRATION.rate,
      pitch: typeof parsed.pitch === 'number' ? parsed.pitch : DEFAULT_CALIBRATION.pitch,
      voiceURI: typeof parsed.voiceURI === 'string' ? parsed.voiceURI : '',
      autoSpeak: typeof parsed.autoSpeak === 'boolean' ? parsed.autoSpeak : true,
    };
  } catch {
    return DEFAULT_CALIBRATION;
  }
}

export function saveVoiceCalibration(cal: VoiceCalibration): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cal));
  } catch {
    // Ignore storage errors
  }
}

function scoreBrowserAgentVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  const lang = v.lang.toLowerCase();
  let score = 0;

  if (lang.startsWith('en-in')) score += 40;
  else if (lang.startsWith('en-gb') || lang.startsWith('en-us')) score += 25;
  else if (lang.startsWith('en')) score += 15;

  if (name.includes('natural') || name.includes('online')) score += 35;
  if (name.includes('google')) score += 25;
  if (/prabhat|rishi|andrew|brian|guy|daniel|ryan|arjun|male/.test(name)) score += 20;
  if (/espeak|sam\b/.test(name)) score -= 30;

  return score;
}

export function pickPreferredSpeechVoice(preferredURI?: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  if (preferredURI) {
    const exact = voices.find((v) => v.voiceURI === preferredURI);
    if (exact) return exact;
  }

  const sorted = [...voices].sort((a, b) => scoreBrowserAgentVoice(b) - scoreBrowserAgentVoice(a));
  return sorted[0] ?? voices[0];
}

async function waitForSpeechVoices(timeoutMs = 250): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (window.speechSynthesis.getVoices().length > 0) return;

  await new Promise<void>((resolve) => {
    const timer = window.setTimeout(() => {
      resolve();
    }, timeoutMs);

    const handleChange = () => {
      window.clearTimeout(timer);
      window.speechSynthesis.removeEventListener?.('voiceschanged', handleChange);
      resolve();
    };

    window.speechSynthesis.addEventListener?.('voiceschanged', handleChange, { once: true });
  });
}

export class HybridVoiceController {
  private audioEl: HTMLAudioElement | null = null;
  private objectUrl: string | null = null;

  stop(): void {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
      this.audioEl = null;
    }
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  async speak(
    text: string,
    calibration: VoiceCalibration,
    callbacks?: {
      onStart?: (provider: VoiceProviderId) => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): Promise<VoiceProviderId> {
    this.stop();
    const cleanText = text.trim();
    if (!cleanText) {
      callbacks?.onEnd?.();
      return 'browser';
    }

    try {
      const res = await fetch('/api/ai/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, pace: calibration.rate }),
      });

      const contentType = res.headers.get('content-type') || '';
      const providerHeader = res.headers.get('x-voice-provider') as VoiceProviderId | null;

      if (res.ok && (contentType.includes('audio/') || contentType.includes('application/octet-stream'))) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        this.objectUrl = url;
        const audio = new Audio(url);
        this.audioEl = audio;

        const provider: VoiceProviderId = providerHeader || 'sarvam-agent';
        callbacks?.onStart?.(provider);

        audio.onended = () => {
          this.stop();
          callbacks?.onEnd?.();
        };
        audio.onerror = () => {
          this.stop();
          void this.speakViaBrowser(cleanText, calibration, callbacks);
        };

        await audio.play();
        return provider;
      }
    } catch {
      // Fall back seamlessly to Portfolio Browser Agent Voice
    }

    return this.speakViaBrowser(cleanText, calibration, callbacks);
  }

  private async speakViaBrowser(
    text: string,
    calibration: VoiceCalibration,
    callbacks?: {
      onStart?: (provider: VoiceProviderId) => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): Promise<VoiceProviderId> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      callbacks?.onEnd?.();
      return 'browser';
    }

    await waitForSpeechVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    const chosen = pickPreferredSpeechVoice(calibration.voiceURI);
    if (chosen) utterance.voice = chosen;
    utterance.rate = calibration.rate;
    utterance.pitch = calibration.pitch;

    utterance.onstart = () => callbacks?.onStart?.('browser');
    utterance.onend = () => callbacks?.onEnd?.();
    utterance.onerror = () => {
      callbacks?.onError?.();
      callbacks?.onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return 'browser';
  }
}

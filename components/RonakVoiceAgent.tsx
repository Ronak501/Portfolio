'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot,
  Check,
  Copy,
  Database,
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Mic,
  MicOff,
  Send,
  SlidersHorizontal,
  Sparkles,
  Square,
  Table2,
  User,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { sound } from '@/lib/audio';
import {
  DatasetId,
  ExtractedDataset,
  extractPortfolioDataset,
} from '@/lib/portfolioData';
import {
  AgentResponsePayload,
  runGroundedPortfolioAgent,
} from '@/lib/portfolioAgent';
import {
  DEFAULT_CALIBRATION,
  HybridVoiceController,
  VoiceCalibration,
  VoiceProviderId,
  loadVoiceCalibration,
  saveVoiceCalibration,
} from '@/lib/voicePlayer';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  spokenText?: string;
  extractedData?: ExtractedDataset;
  preferredFormat?: 'table' | 'json' | 'csv' | 'markdown';
  suggestions?: string[];
  engine?: string;
}

interface RonakVoiceAgentProps {
  variant?: 'embedded' | 'drawer';
  onCloseDrawer?: () => void;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

const QUICK_EXTRACTIONS: { id: DatasetId; label: string; prompt: string }[] = [
  { id: 'full', label: 'Full Dossier', prompt: 'Extract my full portfolio dossier' },
  { id: 'grants', label: 'Grants & Credits', prompt: 'Extract all my grants and funding as CSV' },
  { id: 'ventures', label: 'Ventures', prompt: 'Extract all ventures in JSON' },
  { id: 'projects', label: 'Projects', prompt: 'Extract featured AI & real-time projects' },
  { id: 'credentials', label: '29 Credentials', prompt: 'Extract all certifications & awards' },
  { id: 'skills', label: 'Tech Stack', prompt: 'Extract technical skills stack' },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm Ronak's AI Voice & Data Twin. Ask me anything about my startups (Ornitech.in, BolnaSeekho.in, Techsodh.in), ₹4.37L+ grants, or click any dataset chip to extract structured JSON, CSV, or Markdown — and click Play anytime to hear me speak!",
  spokenText:
    "Hi, I'm Ronak Talaviya's AI assistant. Ask me about my startups like Ornitech and BolnaSeekho, my government and AI grants, or extract my portfolio data into JSON, CSV, or Markdown.",
  suggestions: [
    'Tell me about BolnaSeekho.in & Sarvam AI',
    'Extract all grants and credits as CSV',
    'What projects did you build with YOLOv8?',
  ],
};

function ExtractedDataCard({
  dataset,
  initialFormat = 'table',
}: {
  dataset: ExtractedDataset;
  initialFormat?: 'table' | 'json' | 'csv' | 'markdown';
}) {
  const [format, setFormat] = useState<'table' | 'json' | 'csv' | 'markdown'>(initialFormat);
  const [copied, setCopied] = useState(false);

  const rawPayload = useMemo(() => {
    if (format === 'json') return dataset.json;
    if (format === 'csv') return dataset.csv;
    if (format === 'markdown') return dataset.markdown;
    return dataset.json;
  }, [dataset, format]);

  const handleCopy = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(rawPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback ignored
    }
  };

  const handleDownload = (ext: 'json' | 'csv' | 'md') => {
    sound.playChime();
    const content = ext === 'json' ? dataset.json : ext === 'csv' ? dataset.csv : dataset.markdown;
    const mime =
      ext === 'json'
        ? 'application/json'
        : ext === 'csv'
        ? 'text/csv;charset=utf-8'
        : 'text/markdown;charset=utf-8';
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ronak-talaviya-${dataset.datasetId}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatButtons = [
    { id: 'table' as const, label: 'Table', icon: Table2 },
    { id: 'json' as const, label: 'JSON', icon: FileJson },
    { id: 'csv' as const, label: 'CSV', icon: FileSpreadsheet },
    { id: 'markdown' as const, label: 'MD', icon: FileText },
  ];

  const previewRows = dataset.rows.slice(0, 5);
  const previewCols = dataset.columns.slice(0, 4);

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background/85 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/50 px-3 py-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Database className="size-3.5 shrink-0 text-accent" />
            <span className="truncate">{dataset.title}</span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">{dataset.summary}</p>
        </div>

        <div className="flex items-center gap-1">
          {formatButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFormat(btn.id);
                }}
                className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-mono font-semibold transition-colors ${
                  format === btn.id
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground'
                }`}
              >
                <Icon className="size-3" />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      {format === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-card/60">
                {previewCols.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {previewRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  {previewCols.map((col) => (
                    <td key={col} className="px-3 py-2 text-[11px] text-foreground align-top max-w-[200px] truncate">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {dataset.rows.length > previewRows.length && (
            <div className="border-t border-border/60 bg-muted/30 px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
              Showing {previewRows.length} of {dataset.rows.length} rows — switch to JSON/CSV/MD or Download for all records.
            </div>
          )}
        </div>
      ) : (
        <pre className="max-h-48 overflow-auto bg-[#110f17] p-3 font-mono text-[11px] leading-relaxed text-zinc-200">
          <code>{rawPayload}</code>
        </pre>
      )}

      {/* Footer Export Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-card/70 px-3 py-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground hover:border-accent/50 hover:text-accent transition-colors"
        >
          {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
          <span>{copied ? 'Copied!' : `Copy ${format === 'table' ? 'JSON' : format.toUpperCase()}`}</span>
        </button>

        <div className="flex items-center gap-1.5">
          {(['json', 'csv', 'md'] as const).map((ext) => (
            <button
              key={ext}
              type="button"
              onClick={() => handleDownload(ext)}
              className="inline-flex items-center gap-1 rounded-lg bg-accent/15 border border-accent/25 px-2.5 py-1 text-[11px] font-mono font-bold text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Download className="size-3" />
              <span>.{ext}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RonakVoiceAgent({
  variant = 'embedded',
  onCloseDrawer,
}: RonakVoiceAgentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<{
    provider: VoiceProviderId;
    voiceLabel: string;
    hasClonedVoice: boolean;
  }>({
    provider: 'browser',
    voiceLabel: 'Portfolio Agent Voice (Browser Neural Fallback)',
    hasClonedVoice: false,
  });
  const [brainEngine, setBrainEngine] = useState<'groq' | 'gemini' | 'openai' | 'grounded-engine'>('grounded-engine');
  const [calibration, setCalibration] = useState<VoiceCalibration>(DEFAULT_CALIBRATION);
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);

  const voiceControllerRef = useRef<HybridVoiceController | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const msgSeqRef = useRef(0);

  useEffect(() => {
    voiceControllerRef.current = new HybridVoiceController();

    const syncVoices = () => {
      if ('speechSynthesis' in window) {
        setAvailableVoices(window.speechSynthesis.getVoices().filter((v) => /^en|hi|gu/i.test(v.lang)));
      }
    };

    const timerId = window.setTimeout(() => {
      setCalibration(loadVoiceCalibration());

      const win = window as unknown as {
        SpeechRecognition?: new () => SpeechRecognitionLike;
        webkitSpeechRecognition?: new () => SpeechRecognitionLike;
      };
      if (win.SpeechRecognition || win.webkitSpeechRecognition) {
        setSpeechRecognitionSupported(true);
      }

      syncVoices();
    }, 0);

    if ('speechSynthesis' in window && 'onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = syncVoices;
    }

    // Check configured API capabilities safely
    fetch('/api/ai/speak')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.voiceLabel) setVoiceStatus(data);
      })
      .catch(() => {});

    fetch('/api/ai/chat')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.engine) setBrainEngine(data.engine);
      })
      .catch(() => {});

    return () => {
      window.clearTimeout(timerId);
      voiceControllerRef.current?.stop();
      recognitionRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isLoading]);

  const updateCalibration = (patch: Partial<VoiceCalibration>) => {
    setCalibration((prev) => {
      const next = { ...prev, ...patch };
      saveVoiceCalibration(next);
      return next;
    });
  };

  const speakText = useCallback(
    async (text: string, msgId?: string) => {
      if (!voiceControllerRef.current) return;
      setSpeakingMessageId(msgId ?? null);
      await voiceControllerRef.current.speak(text, calibration, {
        onStart: (provider) => {
          setIsSpeaking(true);
          const labels: Record<VoiceProviderId, string> = {
            'sarvam-clone': 'Sarvam AI (Ronak Custom Voice)',
            'sarvam-agent': 'Sarvam AI (Agent Fallback Voice)',
            'openai-agent': 'OpenAI Agent Voice (Fallback)',
            'elevenlabs-agent': 'ElevenLabs Agent Voice (Fallback)',
            browser: 'Portfolio Agent Voice (Browser Neural Fallback)',
          };
          setVoiceStatus({
            provider,
            hasClonedVoice: provider === 'sarvam-clone',
            voiceLabel: labels[provider],
          });
        },
        onEnd: () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        },
        onError: () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        },
      });
    },
    [calibration]
  );

  const stopSpeaking = () => {
    sound.playClick();
    voiceControllerRef.current?.stop();
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  };

  const sendMessage = async (textOverride?: string) => {
    const query = (textOverride ?? input).trim();
    if (!query || isLoading) return;

    sound.playClick();
    setInput('');

    msgSeqRef.current += 1;
    const userMsg: ChatMessage = {
      id: `u-${msgSeqRef.current}`,
      role: 'user',
      content: query,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setIsLoading(true);

    let payload: AgentResponsePayload;
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: nextHistory
            .filter((m) => m.id !== 'welcome')
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (res.ok) {
        payload = await res.json();
      } else {
        payload = runGroundedPortfolioAgent(query);
      }
    } catch {
      payload = runGroundedPortfolioAgent(query);
    }

    msgSeqRef.current += 1;
    const assistantId = `a-${msgSeqRef.current}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: payload.reply,
      spokenText: payload.spokenText,
      extractedData: payload.extractedData,
      preferredFormat: payload.preferredFormat,
      suggestions: payload.suggestions,
      engine: payload.engine,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
    sound.playChime();

    if (calibration.autoSpeak) {
      await speakText(payload.spokenText || payload.reply, assistantId);
    }
  };

  const triggerInstantExtract = (datasetId: DatasetId) => {
    sound.playClick();
    const dataset = extractPortfolioDataset(datasetId);
    msgSeqRef.current += 1;
    const id = `extract-${msgSeqRef.current}`;
    const reply = `Extracted "${dataset.title}" (${dataset.rows.length} structured records). Switch between Table, JSON, CSV, or Markdown below to copy or download.`;
    const assistantMsg: ChatMessage = {
      id,
      role: 'assistant',
      content: reply,
      spokenText: `I've extracted ${dataset.title}. You can preview the table or download it as JSON, CSV, or Markdown.`,
      extractedData: dataset,
      preferredFormat: 'table',
      engine: 'grounded-engine',
    };
    setMessages((prev) => [...prev, assistantMsg]);
    if (calibration.autoSpeak) {
      speakText(assistantMsg.spokenText!, id);
    }
  };

  const toggleMicrophone = () => {
    sound.playClick();
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Rec = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!Rec) return;

    stopSpeaking();
    const recognition = new Rec();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        sendMessage(transcript);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  const isDrawer = variant === 'drawer';

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl ${
        isDrawer ? 'h-full max-h-[82vh]' : 'w-full'
      }`}
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-md">
            <Bot className="size-5" />
            {isSpeaking && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white ring-2 ring-card">
                <Volume2 className="size-2.5 animate-pulse" />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                Ronak AI · Voice & Data Twin
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-accent/15 border border-accent/25 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                <Sparkles className="size-2.5" />
                {voiceStatus.hasClonedVoice ? voiceStatus.provider.toUpperCase() : 'VOICE READY'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground truncate">
              <span>{voiceStatus.voiceLabel}</span>
              <span>·</span>
              <span className="font-mono">{brainEngine}</span>
              {isSpeaking && (
                <span className="inline-flex items-end gap-[2px] h-3 ml-1" aria-label="Speaking waveform">
                  <span className="sound-bar w-[2px] rounded-full bg-accent" style={{ animationDelay: '0s' }} />
                  <span className="sound-bar w-[2px] rounded-full bg-accent" style={{ animationDelay: '-0.25s' }} />
                  <span className="sound-bar w-[2px] rounded-full bg-accent" style={{ animationDelay: '-0.5s' }} />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 text-[11px] font-bold text-rose-400 hover:bg-rose-500/25 transition-colors"
              title="Stop speaking"
            >
              <Square className="size-2.5 fill-current" />
              <span>Stop</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              const next = !calibration.autoSpeak;
              if (!next) stopSpeaking();
              updateCalibration({ autoSpeak: next });
            }}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              calibration.autoSpeak
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
            title={calibration.autoSpeak ? 'Auto-voice enabled' : 'Auto-voice muted'}
          >
            {calibration.autoSpeak ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
            <span className="hidden sm:inline">{calibration.autoSpeak ? 'Voice On' : 'Muted'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowSettings((s) => !s);
            }}
            className={`inline-flex size-8 items-center justify-center rounded-full border transition-colors ${
              showSettings
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-background text-muted-foreground hover:text-foreground'
            }`}
            title="Voice calibration & API setup"
            aria-label="Voice calibration settings"
          >
            <SlidersHorizontal className="size-3.5" />
          </button>

          {isDrawer && onCloseDrawer && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                stopSpeaking();
                onCloseDrawer();
              }}
              className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close Ronak AI drawer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Voice Calibration & Cloned Voice Setup Panel */}
      {showSettings && (
        <div className="border-b border-border bg-background/80 px-4 py-3 text-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
              Voice Twin Calibration
            </span>
            <button
              type="button"
              onClick={() =>
                speakText(
                  "Hi, this is Ronak Talaviya's calibrated AI voice speaking from my interactive portfolio."
                )
              }
              className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground hover:bg-accent-hover transition-colors"
            >
              Test Voice
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] text-muted-foreground mb-1">Fallback Browser Voice</label>
              <select
                value={calibration.voiceURI}
                onChange={(e) => updateCalibration({ voiceURI: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-accent"
              >
                <option value="">Auto (en-IN / Best English)</option>
                {availableVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-muted-foreground mb-1">
                Speed: <span className="font-mono text-foreground">{calibration.rate.toFixed(2)}x</span>
              </label>
              <input
                type="range"
                min={0.75}
                max={1.35}
                step={0.05}
                value={calibration.rate}
                onChange={(e) => updateCalibration({ rate: parseFloat(e.target.value) })}
                className="w-full accent-[rgb(var(--accent-ink))]"
              />
            </div>

            <div>
              <label className="block text-[11px] text-muted-foreground mb-1">
                Pitch: <span className="font-mono text-foreground">{calibration.pitch.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min={0.75}
                max={1.25}
                step={0.05}
                value={calibration.pitch}
                onChange={(e) => updateCalibration({ pitch: parseFloat(e.target.value) })}
                className="w-full accent-[rgb(var(--accent-ink))]"
              />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Sarvam voice clone ready: set <code className="text-foreground">SARVAM_API_KEY</code> +{' '}
            <code className="text-foreground">SARVAM_VOICE_ID</code> in <code className="text-foreground">.env.local</code>{' '}
            / Vercel env vars to stream your Sarvam voice directly. If unreachable or unset, the agent automatically falls back to another portfolio agent voice (Sarvam speaker, OpenAI, ElevenLabs, or calibrated browser neural speech).
          </p>
        </div>
      )}

      {/* Quick 1-Click Data Extraction Toolbar */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border bg-card/60 px-4 py-2 no-scrollbar">
        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
          Extract:
        </span>
        {QUICK_EXTRACTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => triggerInstantExtract(item.id)}
            className="shrink-0 inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground hover:border-accent/50 hover:text-accent transition-colors"
          >
            <Database className="size-2.5 text-accent" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Feed */}
      <div
        className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 ${
          isDrawer ? 'min-h-[260px]' : 'max-h-[460px] min-h-[320px]'
        }`}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isThisSpeaking = isSpeaking && speakingMessageId === msg.id;

          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/25 mt-0.5">
                  <Bot className="size-3.5" />
                </div>
              )}

              <div className={`max-w-[90%] sm:max-w-[82%] ${isUser ? 'order-1' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-accent text-accent-foreground rounded-tr-sm shadow-sm'
                      : 'border border-border bg-background/70 text-foreground rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {!isUser && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 pt-1.5 border-t border-border/50">
                      <button
                        type="button"
                        onClick={() =>
                          isThisSpeaking
                            ? stopSpeaking()
                            : speakText(msg.spokenText || msg.content, msg.id)
                        }
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-foreground hover:text-accent transition-colors"
                      >
                        {isThisSpeaking ? (
                          <>
                            <Square className="size-2.5 fill-current text-rose-400" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="size-3 text-accent" />
                            <span>Speak in Ronak&apos;s Voice</span>
                          </>
                        )}
                      </button>

                      {msg.engine && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          via {msg.engine}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Inline Structured Data Extractor Card */}
                {msg.extractedData && (
                  <ExtractedDataCard
                    dataset={msg.extractedData}
                    initialFormat={msg.preferredFormat}
                  />
                )}

                {/* Follow-up Suggestions */}
                {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground border border-border mt-0.5 order-2">
                  <User className="size-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/25">
              <Bot className="size-3.5 animate-pulse" />
            </div>
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-2 text-xs font-mono text-muted-foreground">
              Querying grounded portfolio memory...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-2 border-t border-border bg-muted/30 p-3 sm:px-4"
      >
        {speechRecognitionSupported && (
          <button
            type="button"
            onClick={toggleMicrophone}
            title={isListening ? 'Stop voice input' : 'Ask using microphone'}
            aria-label={isListening ? 'Stop voice input' : 'Ask using microphone'}
            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-all ${
              isListening
                ? 'border-rose-500 bg-rose-500/20 text-rose-400 animate-pulse'
                : 'border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-accent'
            }`}
          >
            {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
          </button>
        )}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isListening
              ? 'Listening... speak your question'
              : 'Ask Ronak AI or extract data (e.g. "Export grants as CSV")...'
          }
          className="flex-1 rounded-2xl border border-border bg-background px-4 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-md transition-all hover:bg-accent-hover disabled:opacity-40"
          aria-label="Send message"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}


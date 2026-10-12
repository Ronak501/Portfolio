'use client';

import { useState } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  Layers,
  Cpu,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { sound } from '@/lib/audio';

type Tab = 'arch' | 'code' | 'terminal';

export default function InteractiveDevStudio() {
  const [activeTab, setActiveTab] = useState<Tab>('code');
  const [isRunning, setIsRunning] = useState(false);
  const [runLogs, setRunLogs] = useState<string[]>([
    'System ready. Click "Run Pipeline" to simulate AI verification agent.',
  ]);

  // Terminal state
  const [termHistory, setTermHistory] = useState<
    { command: string; output: string }[]
  >([
    {
      command: 'whoami',
      output:
        'Ronak Talaviya — Full Stack & AI Developer | SCET Surat (4th Year)',
    },
    {
      command: 'help',
      output:
        'Available commands: skills, projects, ventures, contact, whoami, clear',
    },
  ]);
  const [termInput, setTermInput] = useState('');

  const handleRunCode = () => {
    sound.playClick();
    setIsRunning(true);
    setRunLogs(['[INIT] Spawning AI Agent Pipeline...', '[1/3] Parsing input claims & source context...']);

    setTimeout(() => {
      setRunLogs((prev) => [
        ...prev,
        '[2/3] Querying embedding vectors & LLM cross-verification...',
      ]);
    }, 700);

    setTimeout(() => {
      sound.playChime();
      setRunLogs((prev) => [
        ...prev,
        '[3/3] Verification completed: Confidence 98.4%',
        '✅ Output generated with 3 verified citations in 184ms.',
      ]);
      setIsRunning(false);
    }, 1400);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;
    sound.playClick();

    let reply = '';
    switch (cmd) {
      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;
      case 'help':
        reply = 'Available commands: skills, projects, ventures, grants, contact, whoami, clear';
        break;
      case 'whoami':
        reply = 'Ronak Talaviya: Founder @ Ornitech.in | Building Techsodh.in, MyEntryPass.in, Shapentic.com, BolnaSeekho.in | Computer Eng @ SCET (4th Year)';
        break;
      case 'skills':
        reply = 'Frontend: React, Next.js, TS | Backend: Node.js, FastAPI, Python | AI: YOLOv8, NLP | DB: MongoDB, Docker';
        break;
      case 'projects':
        reply = '1. AI Fact Checking | 2. Research Paper Agent | 3. Social Media Analyzer | 4. Task Management | 5. Motel System';
        break;
      case 'grants':
      case 'funding':
        reply = 'Govt Prototype Grants (₹2.87L+ Total): 1. Swachh Sense (₹1,37,000 SSIP) | 2. Vision Sentinel (₹90,000 SSIP) | 3. Trabit Guard (₹60,000)';
        break;
      case 'ventures':
        reply = '1. Ornitech.in (Founder) | 2. Techsodh.in | 3. MyEntryPass.in | 4. Shapentic.com | 5. BolnaSeekho.in | 6. Swachh Sense (₹1.37L) | 7. Vision Sentinel (₹90K) | 8. Trabit Guard (₹60K)';
        break;
      case 'contact':
        reply = 'Email: ronaktalaviya51@gmail.com | GitHub: github.com/Ronak501 | LinkedIn: ronak-talaviya';
        break;
      default:
        reply = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
        break;
    }

    setTermHistory((prev) => [...prev, { command: termInput, output: reply }]);
    setTermInput('');
  };

  return (
    <section id="studio" className="border-b border-border py-20 bg-background/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-accent uppercase">
              Behind the Scenes
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
              Watch Ronak Build
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Explore the system architecture, test real AI agent pipelines, or run diagnostics in the interactive terminal.
            </p>
          </div>

          <div className="flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground">
            <span className="flex gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-accent" />
              <span className="size-1.5 animate-bounce rounded-full bg-accent delay-150" />
              <span className="size-1.5 animate-bounce rounded-full bg-accent delay-300" />
            </span>
            <span>Live Workstation</span>
          </div>
        </div>

        {/* Workstation Frame */}
        <div className="relative mx-auto max-w-4xl rounded-2xl border border-border bg-[#120f18] shadow-2xl overflow-hidden ring-1 ring-white/10">
          {/* Window Header */}
          <div className="flex h-11 items-center justify-between border-b border-border/80 bg-[#171320] px-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-muted-foreground hidden sm:inline">
                ronak-studio · v2.4
              </span>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('arch');
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activeTab === 'arch'
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Layers className="size-3.5" />
                <span>Architecture</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('code');
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activeTab === 'code'
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Cpu className="size-3.5" />
                <span>AI-Pipeline.ts</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('terminal');
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activeTab === 'terminal'
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <TerminalIcon className="size-3.5" />
                <span>Terminal</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Architecture View */}
          {activeTab === 'arch' && (
            <div className="p-6 text-foreground font-sans">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-accent">
                  System Dataflow Blueprint
                </span>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> Pipeline Operational
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <span className="font-mono text-[11px] text-accent font-bold">STAGE 1</span>
                  <h4 className="mt-1 font-heading text-sm font-bold text-foreground">
                    Client Input
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Next.js UI / RTSP Stream / REST Payloads
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <span className="font-mono text-[11px] text-accent font-bold">STAGE 2</span>
                  <h4 className="mt-1 font-heading text-sm font-bold text-foreground">
                    AI / Vision Core
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    YOLOv8 Edge & LLM Embedding Agent
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <span className="font-mono text-[11px] text-accent font-bold">STAGE 3</span>
                  <h4 className="mt-1 font-heading text-sm font-bold text-foreground">
                    FastAPI Engine
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    WebSocket Broadcast & Validation logic
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <span className="font-mono text-[11px] text-accent font-bold">STAGE 4</span>
                  <h4 className="mt-1 font-heading text-sm font-bold text-foreground">
                    Database & Insights
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    MongoDB Persistence & Live Analytics
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-border/80 bg-black/40 p-3.5 font-mono text-xs text-zinc-400">
                <span className="text-emerald-400">● Latency: 18ms</span> ·{' '}
                <span className="text-cyan-400">Throughput: 850 req/s</span> ·{' '}
                <span className="text-accent">Edge YOLOv8 FPS: 32fps</span>
              </div>
            </div>
          )}

          {/* Tab 2: Code Runner View */}
          {activeTab === 'code' && (
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
                <span className="text-muted-foreground text-xs">
                  src/agents/factCheckPipeline.ts
                </span>
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent-hover transition-colors disabled:opacity-50"
                >
                  {isRunning ? (
                    <RefreshCw className="size-3 animate-spin" />
                  ) : (
                    <Play className="size-3 fill-current" />
                  )}
                  <span>{isRunning ? 'Running...' : 'Run Pipeline'}</span>
                </button>
              </div>

              {/* Code Snippet */}
              <pre className="text-zinc-300 leading-relaxed overflow-x-auto p-2">
                <code>
                  <span className="text-purple-400">export async function</span>{' '}
                  <span className="text-blue-400">verifyClaim</span>(
                  <span className="text-orange-300">claim</span>: <span className="text-yellow-300">string</span>) &#123;{'\n'}
                  {'  '}
                  <span className="text-purple-400">const</span> embeddings ={' '}
                  <span className="text-purple-400">await</span> agent.{' '}
                  <span className="text-blue-400">embedQuery</span>(claim);{'\n'}
                  {'  '}
                  <span className="text-purple-400">const</span> sources ={' '}
                  <span className="text-purple-400">await</span> vectorDB.{' '}
                  <span className="text-blue-400">searchSimilar</span>(embeddings, &#123; topK: 5 &#125;);{'\n'}
                  {'  '}
                  <span className="text-purple-400">return await</span> llm.{' '}
                  <span className="text-blue-400">evaluateCredibility</span>(&#123; claim, sources &#125;);{'\n'}
                  &#125;
                </code>
              </pre>

              {/* Console Execution Box */}
              <div className="mt-4 rounded-xl border border-border/80 bg-black/60 p-3.5 space-y-1">
                <div className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">
                  Output Console:
                </div>
                {runLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 text-xs">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Terminal */}
          {activeTab === 'terminal' && (
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {termHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-accent flex items-center gap-1.5">
                      <span className="text-emerald-400">ronak@portfolio:~$</span>
                      <span>{item.command}</span>
                    </div>
                    <div className="text-zinc-300 whitespace-pre-line pl-4">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-border/60 pt-3">
                <span className="text-emerald-400 whitespace-nowrap">
                  ronak@portfolio:~$
                </span>
                <input
                  type="text"
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  placeholder="type help, skills, projects, contact..."
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

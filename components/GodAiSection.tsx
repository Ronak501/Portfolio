'use client';

import { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  Cpu,
  CheckCircle2,
  Play,
  RefreshCw,
  Layers,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { sound } from '@/lib/audio';

export default function GodAiSection() {
  const [activeSchemaTab, setActiveSchemaTab] = useState<'json' | 'optimized'>('optimized');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState<number>(3);
  const [agentOutput, setAgentOutput] = useState<string[]>([]);

  const runAgentTest = () => {
    sound.playClick();
    setIsAgentRunning(true);
    setAgentStep(0);
    setAgentOutput(['[Agent Initialized] Loading system schema & guardrails...']);

    setTimeout(() => {
      setAgentStep(1);
      setAgentOutput((prev) => [
        ...prev,
        '[Step 1] Parsing user query into intent embeddings...',
        '[Step 1] Query vector similarity: 0.942 against factual dataset.',
      ]);
    }, 600);

    setTimeout(() => {
      setAgentStep(2);
      setAgentOutput((prev) => [
        ...prev,
        '[Step 2] Triggering Tool: "verify_source_citation(url, entity)"',
        '[Step 2] Self-healing reflex: Schema valid, zero parameter mismatch.',
      ]);
    }, 1200);

    setTimeout(() => {
      sound.playChime();
      setAgentStep(3);
      setAgentOutput((prev) => [
        ...prev,
        '✅ Agent completed inference in 164ms.',
        '🎯 Output: Verified claim with 3 verifiable academic sources.',
      ]);
      setIsAgentRunning(false);
    }, 1800);
  };

  const jsonSnippet = `{
  "status": "success",
  "entities": [
    { "id": 1, "name": "YOLOv8", "category": "vision", "latency_ms": 18 },
    { "id": 2, "name": "FastAPI", "category": "backend", "latency_ms": 12 },
    { "id": 3, "name": "VectorDB", "category": "rag", "latency_ms": 34 }
  ],
  "confidence_score": 0.984
}`;

  const optimizedSnippet = `entities[3]{id,name,cat,ms}:
  1,YOLOv8,vision,18
  2,FastAPI,backend,12
  3,VectorDB,rag,34
confidence: 0.984`;

  return (
    <section id="ai" className="border-b border-border py-20 bg-background/60 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent uppercase tracking-wider border border-accent/25">
              <Sparkles className="size-3.5" /> AI Systems & LLM Architecture
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Autonomous <span className="text-accent">AI Agents</span> & Token Engineering
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            I don&apos;t just call AI APIs with basic wrappers. I engineer production agent loops with function-calling reflexes, self-healing validation schemas, and high-density token optimizations that drastically reduce inference latency and API expenditure.
          </p>

          {/* Quick Pillars */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              { label: 'Agent Tool Calling & Routing', icon: Bot },
              { label: 'Prompt & Token Optimization', icon: Zap },
              { label: 'Self-Healing Reflex Loops', icon: Cpu },
              { label: 'Multi-Modal Vision & RAG', icon: Layers },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Icon className="size-3.5 text-accent" />
                  <span>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Impact Stat Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-baseline gap-1 text-accent font-heading text-2xl sm:text-3xl font-extrabold">
              <TrendingDown className="size-5" /> 42%
            </div>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">Token Overhead Reduction</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-accent font-heading text-2xl sm:text-3xl font-extrabold">
              98.6%
            </div>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">Tool Call Execution Rate</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-accent font-heading text-2xl sm:text-3xl font-extrabold">
              &lt;180ms
            </div>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">Vector Search P95 Latency</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-accent font-heading text-2xl sm:text-3xl font-extrabold">
              Zero
            </div>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">Ungrounded Hallucinations</p>
          </div>
        </div>

        {/* 2 Interactive Showcase Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card 1: Token & Payload Serialization Benchmark (Synitx-inspired!) */}
          <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-accent" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                    Token Economics Benchmark
                  </span>
                </div>
                <span className="font-mono text-xs text-accent font-bold bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/20">
                  -42% Tokens
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground">
                Structured Schema vs Verbose JSON
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Standard JSON wastes significant context window budget on curly brackets, repeated keys, and indentation. By flattening tabular schemas in LLM prompts, input tokens shrink significantly without precision loss.
              </p>

              {/* Token Comparison Progress Bars */}
              <div className="mt-5 space-y-3 rounded-2xl border border-border/80 bg-background/60 p-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-muted-foreground">Standard JSON Payload</span>
                    <span className="font-mono text-foreground">118 Tokens (100%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-muted-foreground/40 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-accent font-bold">Optimized Schema (Ronak Model)</span>
                    <span className="font-mono text-accent font-bold">68 Tokens (58%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-accent rounded-full w-[58%]" />
                  </div>
                </div>
              </div>

              {/* Code Preview Switcher */}
              <div className="mt-5 overflow-hidden rounded-2xl bg-[#14121a] border border-border/80">
                <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5 bg-[#1b1724]">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveSchemaTab('json');
                      }}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-colors ${
                        activeSchemaTab === 'json'
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      JSON Format
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveSchemaTab('optimized');
                      }}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-colors ${
                        activeSchemaTab === 'optimized'
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Optimized Compact
                    </button>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {activeSchemaTab === 'json' ? '118 Tokens' : '68 Tokens (Saved 50)'}
                  </span>
                </div>

                <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                  <code>{activeSchemaTab === 'json' ? jsonSnippet : optimizedSnippet}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Autonomous Agent Execution Engine */}
          <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="size-4 text-accent" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                    Live Agent Reflex Loop
                  </span>
                </div>
                <button
                  type="button"
                  onClick={runAgentTest}
                  disabled={isAgentRunning}
                  className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent-hover transition-all disabled:opacity-50"
                >
                  {isAgentRunning ? (
                    <RefreshCw className="size-3 animate-spin" />
                  ) : (
                    <Play className="size-3 fill-current" />
                  )}
                  <span>{isAgentRunning ? 'Simulating...' : 'Run Agent Test'}</span>
                </button>
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground">
                Self-Healing Function Calling Engine
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Autonomous agent pipeline that inspects inputs, binds typed parameters, triggers tool calls with fallback schemas, and validates outputs before returning answers.
              </p>

              {/* Progress Stepper */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { step: 1, title: 'Embedding Search' },
                  { step: 2, title: 'Tool Schema Binding' },
                  { step: 3, title: 'Verified Output' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`rounded-xl border p-2.5 text-center transition-all ${
                      agentStep >= s.step
                        ? 'border-accent/40 bg-accent/10 text-accent font-semibold'
                        : 'border-border bg-background/50 text-muted-foreground'
                    }`}
                  >
                    <span className="font-mono text-[10px] block uppercase">Stage {s.step}</span>
                    <span className="text-xs font-heading font-bold">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Live Output Log */}
              <div className="mt-5 rounded-2xl border border-border/80 bg-[#120f17] p-4 font-mono text-xs space-y-1.5 min-h-[160px]">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider border-b border-border/50 pb-1.5 mb-2 flex items-center justify-between">
                  <span>Execution Stream:</span>
                  <span className="text-emerald-400">● Engine Active</span>
                </div>
                {agentOutput.length === 0 ? (
                  <p className="text-muted-foreground/60 italic py-6 text-center">
                    Click &ldquo;Run Agent Test&rdquo; above to trigger live agent reasoning & tool execution simulation.
                  </p>
                ) : (
                  agentOutput.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith('✅')
                          ? 'text-emerald-400 font-bold'
                          : line.startsWith('🎯')
                          ? 'text-accent font-semibold'
                          : 'text-zinc-300'
                      }
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-border/70 pt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Grounding: 100% Vector Verified</span>
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="font-semibold text-accent hover:underline flex items-center gap-1"
              >
                <span>See AI Fact Checker project</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

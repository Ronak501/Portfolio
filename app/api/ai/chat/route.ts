import { NextRequest, NextResponse } from 'next/server';
import {
  AgentResponsePayload,
  buildSystemPromptContext,
  runGroundedPortfolioAgent,
} from '@/lib/portfolioAgent';

interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

function stripMarkdownForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function callOpenAICompatibleChat({
  endpoint,
  apiKey,
  model,
  message,
  history,
}: {
  endpoint: string;
  apiKey: string;
  model: string;
  message: string;
  history: ChatHistoryItem[];
}): Promise<string | null> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 320,
      messages: [
        { role: 'system', content: buildSystemPromptContext() },
        ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: message },
      ],
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return typeof content === 'string' && content.trim() ? content.trim() : null;
}

async function callGemini(
  message: string,
  history: ChatHistoryItem[],
  apiKey: string
): Promise<string | null> {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const contents = [
    ...history.slice(-6).map((h) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }],
    })),
    {
      role: 'user',
      parts: [{ text: message }],
    },
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPromptContext() }],
      },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 320,
      },
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof candidate === 'string' && candidate.trim() ? candidate.trim() : null;
}

export async function GET() {
  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  return NextResponse.json({
    engine: hasGroq
      ? 'groq'
      : hasGemini
      ? 'gemini'
      : hasOpenAI
      ? 'openai'
      : 'grounded-engine',
    hasLlmKey: hasGroq || hasGemini || hasOpenAI,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const history: ChatHistoryItem[] = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    // Always run grounded extraction first so structured JSON/CSV/MD datasets are 100% deterministic
    const grounded: AgentResponsePayload = runGroundedPortfolioAgent(message);

    // Priority 1: Groq API (ultra-low latency LLM)
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      const groqReply = await callOpenAICompatibleChat({
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        apiKey: groqKey,
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        message,
        history,
      }).catch(() => null);

      if (groqReply) {
        return NextResponse.json({
          ...grounded,
          reply: groqReply,
          spokenText: stripMarkdownForSpeech(groqReply),
          engine: 'groq',
        } satisfies AgentResponsePayload);
      }
    }

    // Priority 2: Gemini fallback
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const llmReply = await callGemini(message, history, geminiKey).catch(() => null);
      if (llmReply) {
        return NextResponse.json({
          ...grounded,
          reply: llmReply,
          spokenText: stripMarkdownForSpeech(llmReply),
          engine: 'gemini',
        } satisfies AgentResponsePayload);
      }
    }

    // Priority 3: OpenAI fallback
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      const llmReply = await callOpenAICompatibleChat({
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: openaiKey,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        message,
        history,
      }).catch(() => null);

      if (llmReply) {
        return NextResponse.json({
          ...grounded,
          reply: llmReply,
          spokenText: stripMarkdownForSpeech(llmReply),
          engine: 'openai',
        } satisfies AgentResponsePayload);
      }
    }

    return NextResponse.json(grounded);
  } catch {
    return NextResponse.json(
      { error: 'Unable to process chat request.' },
      { status: 500 }
    );
  }
}

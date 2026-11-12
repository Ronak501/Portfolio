import { NextRequest, NextResponse } from 'next/server';
import type { VoiceProviderId } from '@/lib/voicePlayer';

const DEFAULT_ELEVENLABS_AGENT_VOICE = 'pNInz6obpgDQGcFmaJgB'; // Adam (neutral agent fallback)

export async function GET() {
  const sarvamKey = Boolean(process.env.SARVAM_API_KEY);
  const sarvamVoiceId = Boolean(process.env.SARVAM_VOICE_ID);
  const openAiKey = Boolean(process.env.OPENAI_API_KEY);
  const elevenKey = Boolean(process.env.ELEVENLABS_API_KEY);
  const elevenVoice = Boolean(process.env.ELEVENLABS_VOICE_ID);

  let provider: VoiceProviderId = 'browser';
  let voiceLabel = 'Portfolio Agent Voice (Browser Neural Fallback)';

  if (sarvamKey && sarvamVoiceId) {
    provider = 'sarvam-clone';
    voiceLabel = 'Sarvam AI (Ronak Custom Voice)';
  } else if (sarvamKey) {
    provider = 'sarvam-agent';
    voiceLabel = 'Sarvam AI (Agent Fallback Voice)';
  } else if (openAiKey) {
    provider = 'openai-agent';
    voiceLabel = 'OpenAI Agent Voice (Fallback)';
  } else if (elevenKey) {
    provider = 'elevenlabs-agent';
    voiceLabel = elevenVoice
      ? 'ElevenLabs Cloned Voice'
      : 'ElevenLabs Agent Voice (Fallback)';
  }

  return NextResponse.json({
    provider,
    hasClonedVoice: (sarvamKey && sarvamVoiceId) || (elevenKey && elevenVoice),
    voiceLabel,
  });
}

async function synthesizeSarvamClone(
  text: string,
  apiKey: string,
  voiceId: string,
  languageCode: string
): Promise<Buffer | null> {
  const formData = new FormData();
  formData.append('voice_id', voiceId);
  formData.append('text', text.slice(0, 900));
  if (languageCode) {
    formData.append('language_code', languageCode);
  }

  const res = await fetch('https://api.sarvam.ai/voices/clone', {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
    },
    body: formData,
  });

  if (!res.ok) return null;
  const data = await res.json();
  const b64 = data?.data?.audio ?? data?.audio ?? (Array.isArray(data?.audios) ? data.audios[0] : null);
  return typeof b64 === 'string' && b64.length > 0 ? Buffer.from(b64, 'base64') : null;
}

async function synthesizeSarvamAgent(
  text: string,
  apiKey: string,
  pace: number,
  languageCode: string
): Promise<Buffer | null> {
  const speaker = process.env.SARVAM_VOICE_SPEAKER || 'shubh';
  const model = process.env.SARVAM_TTS_MODEL || 'bulbul:v3';

  const res = await fetch('https://api.sarvam.ai/text-to-speech', {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: [text.slice(0, 500)],
      target_language_code: languageCode,
      speaker,
      pace,
      model,
      enable_preprocessing: true,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const b64 = Array.isArray(data?.audios) ? data.audios[0] : null;
  return typeof b64 === 'string' && b64.length > 0 ? Buffer.from(b64, 'base64') : null;
}

async function synthesizeOpenAiAgent(
  text: string,
  apiKey: string,
  pace: number
): Promise<ArrayBuffer | null> {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
      voice: process.env.OPENAI_TTS_VOICE || 'ash',
      input: text.slice(0, 900),
      speed: pace,
      response_format: 'mp3',
    }),
  });

  if (!res.ok) return null;
  return res.arrayBuffer();
}

async function synthesizeElevenLabs(
  text: string,
  apiKey: string,
  voiceId: string
): Promise<ArrayBuffer | null> {
  const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: text.slice(0, 900),
        model_id: modelId,
        voice_settings: {
          stability: 0.48,
          similarity_boost: 0.82,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!res.ok) return null;
  return res.arrayBuffer();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawText = typeof body?.text === 'string' ? body.text.trim() : '';
    const pace = typeof body?.pace === 'number' ? Math.min(1.4, Math.max(0.7, body.pace)) : 1.0;

    if (!rawText) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    }

    const text = rawText.slice(0, 900);
    const sarvamApiKey = process.env.SARVAM_API_KEY;
    const sarvamVoiceId = process.env.SARVAM_VOICE_ID;
    const sarvamLang = process.env.SARVAM_LANGUAGE_CODE || 'en-IN';

    // Priority 1: Ronak's saved cloned voice in Sarvam AI
    if (sarvamApiKey && sarvamVoiceId) {
      const wav = await synthesizeSarvamClone(text, sarvamApiKey, sarvamVoiceId, sarvamLang).catch(() => null);
      if (wav) {
        return new NextResponse(new Uint8Array(wav), {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'X-Voice-Provider': 'sarvam-clone',
            'Cache-Control': 'no-store',
          },
        });
      }
    }

    // Priority 2: Fallback to Sarvam AI built-in agent speaker if Sarvam clone isn't available
    if (sarvamApiKey) {
      const wav = await synthesizeSarvamAgent(text, sarvamApiKey, pace, sarvamLang).catch(() => null);
      if (wav) {
        return new NextResponse(new Uint8Array(wav), {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'X-Voice-Provider': 'sarvam-agent',
            'Cache-Control': 'no-store',
          },
        });
      }
    }

    // Priority 3: Fallback to OpenAI TTS Agent voice if configured
    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (openAiApiKey) {
      const mp3 = await synthesizeOpenAiAgent(text, openAiApiKey, pace).catch(() => null);
      if (mp3) {
        return new NextResponse(mp3, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'X-Voice-Provider': 'openai-agent',
            'Cache-Control': 'no-store',
          },
        });
      }
    }

    // Priority 4: Fallback to ElevenLabs agent voice if configured
    const elevenApiKey = process.env.ELEVENLABS_API_KEY;
    if (elevenApiKey) {
      const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_ELEVENLABS_AGENT_VOICE;
      const mp3 = await synthesizeElevenLabs(text, elevenApiKey, voiceId).catch(() => null);
      if (mp3) {
        return new NextResponse(mp3, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'X-Voice-Provider': 'elevenlabs-agent',
            'Cache-Control': 'no-store',
          },
        });
      }
    }

    // Priority 5: Portfolio built-in browser agent voice fallback (works with zero API keys)
    return NextResponse.json({
      fallback: 'browser',
      text,
      provider: 'browser',
    });
  } catch {
    return NextResponse.json({
      fallback: 'browser',
      provider: 'browser',
    });
  }
}

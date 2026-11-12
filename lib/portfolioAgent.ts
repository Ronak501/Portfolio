import {
  CREDENTIALS,
  DatasetId,
  ExtractedDataset,
  PORTFOLIO_PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  VENTURES,
  extractPortfolioDataset,
} from './portfolioData';

export interface AgentResponsePayload {
  reply: string;
  spokenText: string;
  extractedData?: ExtractedDataset;
  preferredFormat?: 'table' | 'json' | 'csv' | 'markdown';
  suggestions: string[];
  engine: 'groq' | 'gemini' | 'openai' | 'grounded-engine';
}

function stripForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/https?:\/\/[^\s)]+/g, (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, ''))
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectPreferredFormat(query: string): 'table' | 'json' | 'csv' | 'markdown' {
  const q = query.toLowerCase();
  if (/\bcsv\b|\bspreadsheet\b|\bexcel\b/.test(q)) return 'csv';
  if (/\bjson\b|\bapi\b|\bschema\b|\braw\b/.test(q)) return 'json';
  if (/\bmarkdown\b|\b\.md\b|\bmd\b|\bbrief\b/.test(q)) return 'markdown';
  return 'table';
}

export function detectExtractionIntent(query: string): {
  wantsExtraction: boolean;
  datasetId: DatasetId | null;
  filterTerm?: string;
} {
  const q = query.toLowerCase();
  const explicitExtract = /\b(extract|export|download|dump|fetch|table|json|csv|markdown|spreadsheet|dataset|list all|give me all|summarize all|recruiter)\b/.test(q);

  let datasetId: DatasetId | null = null;
  if (/\b(full|everything|complete|all data|entire|recruiter|dossier|cv|resume)\b/.test(q)) {
    datasetId = 'full';
  } else if (/\b(grant|grants|funding|ssip|credit|credits|iacon|money|prize|award|rotary|sarvam)\b/.test(q)) {
    datasetId = 'grants';
  } else if (/\b(venture|startup|startups|ornitech|techsodh|myentrypass|shapentic|bolnaseekho|company)\b/.test(q)) {
    datasetId = 'ventures';
  } else if (/\b(project|projects|swachh|sentinel|transit|nasa|isro|analyzer|case study)\b/.test(q)) {
    datasetId = 'projects';
  } else if (/\b(cert|certificate|certifications|credential|credentials|badge|paper|research|hackathon|google|microsoft|tata|flipkart|adobe|mandi)\b/.test(q)) {
    datasetId = 'credentials';
  } else if (/\b(skill|skills|stack|tech stack|tools|languages|framework|frameworks|yolo|fastapi|next)\b/.test(q)) {
    datasetId = 'skills';
  } else if (/\b(contact|email|phone|reach|hire|social|github|linkedin|about|who|education|scet|college)\b/.test(q)) {
    datasetId = 'profile';
  }

  let filterTerm: string | undefined;
  const knownFilters = [
    'google',
    'ssip',
    'sarvam',
    'nasa',
    'isro',
    'ai',
    'yolo',
    'fastapi',
    'research',
    'cloud',
    'grant',
    'bolnaseekho',
    'ornitech',
    'techsodh',
    'swachh',
  ];
  for (const term of knownFilters) {
    if (q.includes(term) && !/\ball\b/.test(q)) {
      filterTerm = term;
      break;
    }
  }

  return {
    wantsExtraction: explicitExtract || datasetId !== null,
    datasetId,
    filterTerm,
  };
}

export function runGroundedPortfolioAgent(rawQuery: string): AgentResponsePayload {
  const query = rawQuery.trim();
  const q = query.toLowerCase();
  const format = detectPreferredFormat(q);
  const { datasetId, filterTerm, wantsExtraction } = detectExtractionIntent(q);

  // Check for specific named entities first so answers feel super personal in Ronak's voice
  if (/^(hi|hello|hey|namaste|yo|good morning|good evening)\b/.test(q) && q.length < 40) {
    const reply =
      "Hey! I'm Ronak's AI voice & data twin. I can talk you through my startups like Ornitech.in and BolnaSeekho.in, my ₹4.37L government and tech grants, or extract my projects, certifications, and skills directly into JSON, CSV, or Markdown. What would you like to explore?";
    return {
      reply,
      spokenText: stripForSpeech(reply),
      suggestions: [
        'Tell me about your grants and funding',
        'Extract all projects as JSON',
        'What ventures are you building?',
      ],
      engine: 'grounded-engine',
    };
  }

  if (q.includes('bolnaseekho') || q.includes('sarvam') || q.includes('voice')) {
    const extracted = extractPortfolioDataset('grants', 'sarvam');
    const reply =
      'BolnaSeekho.in is my AI-powered verbal communication and speech learning platform. It won 2nd Prize at the Rotary Club of Surat Innovation Challenge and received ₹1,50,000 in Sarvam AI speech and GenAI credits. Here is the extracted funding data — and my voice module can also connect directly to Sarvam AI or ElevenLabs via environment keys.';
    return {
      reply,
      spokenText: stripForSpeech(reply),
      extractedData: extracted,
      preferredFormat: format,
      suggestions: [
        'Extract all ventures as CSV',
        'Tell me about Ornitech.in',
        'Export my full recruiter dossier',
      ],
      engine: 'grounded-engine',
    };
  }

  if (q.includes('ornitech') || q.includes('techsodh') || q.includes('myentrypass') || q.includes('shapentic')) {
    const extracted = extractPortfolioDataset('ventures');
    const reply =
      "I'm the Founder of Ornitech.in, where we architect scalable Next.js, FastAPI, and AI systems. Alongside Ornitech, I'm building Techsodh.in (backed by a ₹1,50,000 grant), MyEntryPass.in for fraud-proof QR ticketing, Shapentic.com for product design, and BolnaSeekho.in for speech AI. I've extracted the full ventures dataset below so you can inspect or export it.";
    return {
      reply,
      spokenText: stripForSpeech(reply),
      extractedData: extracted,
      preferredFormat: format,
      suggestions: [
        'Download ventures as JSON',
        'Show my civic AI projects',
        'How can I contact Ronak?',
      ],
      engine: 'grounded-engine',
    };
  }

  if (q.includes('swachh') || q.includes('sentinel') || q.includes('transit') || q.includes('ssip')) {
    const extracted = extractPortfolioDataset('projects', filterTerm);
    const reply =
      "Under SSIP Gujarat and government innovation programs, I've led three funded civic AI systems: Swachh Sense (₹1,37,000 grant for municipal waste AI + IoT dispatch), Vision Sentinel (₹90,000 grant for real-time surveillance anomaly detection), and Transit Guard (₹60,000 grant achieving 96% YOLOv8 passenger counting precision). You can export their full case studies below.";
    return {
      reply,
      spokenText: stripForSpeech(reply),
      extractedData: extracted,
      preferredFormat: format,
      suggestions: [
        'Export projects as CSV',
        'Show all grants & cloud credits',
        'What tech stack do you use?',
      ],
      engine: 'grounded-engine',
    };
  }

  if (q.includes('nasa') || q.includes('isro')) {
    const extracted = extractPortfolioDataset('credentials', q.includes('nasa') ? 'nasa' : 'isro');
    const reply =
      "I've competed and been recognized in space-tech hackathons — winning and reaching the finals in the NASA Space Apps Challenge (2024 & 2025) for Earth and planetary telemetry, and becoming a National Finalist in the ISRO Bharatiya Antariksh Hackathon (2025) for geospatial payload analytics.";
    return {
      reply,
      spokenText: stripForSpeech(reply),
      extractedData: extracted,
      preferredFormat: format,
      suggestions: [
        'Extract all 29 credentials as CSV',
        'Tell me about your research papers',
        'Export full portfolio JSON',
      ],
      engine: 'grounded-engine',
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
    const extracted = extractPortfolioDataset('profile');
    const reply = `You can reach me directly at ${PORTFOLIO_PROFILE.email}. I'm currently in my final year of B.Tech Computer Engineering at SCET, Surat, and open to AI engineering collaborations, full-stack consulting through Ornitech.in, and high-impact product teams. All my verified profile links and resume are ready to copy or download below.`;
    return {
      reply,
      spokenText: stripForSpeech(reply),
      extractedData: extracted,
      preferredFormat: format,
      suggestions: [
        'Extract full recruiter dossier as Markdown',
        'List my tech stack',
        'Show my grants & awards',
      ],
      engine: 'grounded-engine',
    };
  }

  // Dataset-driven grounded responses
  if (wantsExtraction && datasetId) {
    const extracted = extractPortfolioDataset(datasetId, filterTerm);
    const spokenIntros: Record<DatasetId, string> = {
      profile: `Here is my complete profile and contact dataset, including my B.Tech background at SCET Surat, Ornitech.in leadership, and direct links.`,
      ventures: `I've extracted ${extracted.rows.length} ventures and civic AI initiatives I'm building, led by Ornitech.in, Techsodh.in, MyEntryPass.in, Shapentic.com, and BolnaSeekho.in.`,
      projects: `I've structured ${extracted.rows.length} shipped engineering case studies across computer vision, real-time WebSockets, NASA telemetry, and ISRO remote sensing.`,
      grants: `I've compiled ${extracted.rows.length} verified grants and credit awards — totaling ₹5.87 Lakh in grants and Sarvam AI credits plus $32,500 in cloud infrastructure credits across IACON, Google Cloud, and MongoDB.`,
      credentials: `Here are ${extracted.rows.length} verified credentials spanning government grants, NASA and ISRO hackathons, Google Cloud and Microsoft badges, and published MCP and RAG research papers.`,
      skills: `I've extracted ${extracted.rows.length} production technologies across Next.js, TypeScript, Python, FastAPI, YOLOv8, Gemini and Sarvam AI, plus Docker and cloud DevOps.`,
      full: `I've compiled my complete portfolio dossier covering ${VENTURES.length} ventures, ${PROJECTS.length} case studies, ${CREDENTIALS.length} verified credentials, and ${SKILL_GROUPS.reduce((a, g) => a + g.items.length, 0)} technical skills. You can switch between Table, JSON, CSV, or Markdown export right here.`,
    };
    const reply = `${spokenIntros[datasetId]} You can preview it below or copy and download it in JSON, CSV, or Markdown.`;
    return {
      reply,
      spokenText: stripForSpeech(reply),
      extractedData: extracted,
      preferredFormat: format,
      suggestions: [
        datasetId !== 'grants' ? 'Extract grants & cloud credits as CSV' : 'Extract ventures as JSON',
        datasetId !== 'projects' ? 'Show featured AI case studies' : 'Export full recruiter dossier',
        'How can I contact Ronak?',
      ],
      engine: 'grounded-engine',
    };
  }

  // General fallback with smart summary + full dataset option
  const fallbackDataset = extractPortfolioDataset('full');
  const reply =
    "I'm Ronak Talaviya — a final-year Computer Engineering student at SCET Surat, Founder of Ornitech.in, and AI Systems Architect. I've secured ₹4.37L in SSIP and tech grants, ₹1.5L in Sarvam AI credits, and $32.5K+ in cloud credits while shipping products like Techsodh.in, BolnaSeekho.in, Swachh Sense, and Vision Sentinel. Ask me any specific question or pick a dataset below to extract structured JSON, CSV, or Markdown!";
  return {
    reply,
    spokenText: stripForSpeech(reply),
    extractedData: fallbackDataset,
    preferredFormat: format,
    suggestions: [
      'Extract all grants & funding as CSV',
      'List all startup ventures in JSON',
      'Summarize tech stack & skills',
    ],
    engine: 'grounded-engine',
  };
}

export function buildSystemPromptContext(): string {
  return [
    `You are the AI Voice & Data Twin of ${PORTFOLIO_PROFILE.name}, speaking in the first person ("I", "my").`,
    `Be concise (2-4 crisp sentences so it sounds great spoken aloud), warm, technical, and strictly truthful to ONLY the verified facts below.`,
    `Do NOT invent metrics, dates, companies, or URLs not listed here.`,
    ``,
    `PROFILE:`,
    `${PORTFOLIO_PROFILE.headline} | ${PORTFOLIO_PROFILE.location} | ${PORTFOLIO_PROFILE.education.degree} at ${PORTFOLIO_PROFILE.education.institution} (${PORTFOLIO_PROFILE.education.year})`,
    `Email: ${PORTFOLIO_PROFILE.email} | GitHub: ${PORTFOLIO_PROFILE.links.github} | LinkedIn: ${PORTFOLIO_PROFILE.links.linkedin}`,
    `Summary: ${PORTFOLIO_PROFILE.summary}`,
    ``,
    `VENTURES (${VENTURES.length}):`,
    ...VENTURES.map((v) => `- ${v.title} (${v.role}, ${v.badge}): ${v.tagline}. ${v.fundingOrAward || ''}`),
    ``,
    `PROJECTS (${PROJECTS.length}):`,
    ...PROJECTS.map((p) => `- ${p.title} [${p.category}]: ${p.proof}. ${p.outcome}`),
    ``,
    `GRANTS & KEY CREDENTIALS (${CREDENTIALS.length} total):`,
    ...CREDENTIALS.map((c) => `- ${c.title} | ${c.issuer} (${c.issueDate})${c.grantAmount ? ` | ${c.grantAmount}` : ''}`),
    ``,
    `SKILLS:`,
    ...SKILL_GROUPS.map((g) => `- ${g.title}: ${g.items.map((i) => i.name + (i.highlight ? ` (${i.highlight})` : '')).join(', ')}`),
  ].join('\n');
}


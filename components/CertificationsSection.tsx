'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Trophy,
  CheckCircle2,
  Eye,
  X,
  Landmark,
  Cloud,
  Rocket,
  Bot,
  Database,
  BookOpen,
  Terminal,
  Check,
  Copy,
  ArrowUpRight,
  FileCheck,
} from 'lucide-react';
import { sound } from '@/lib/audio';

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  category: 'gov_global' | 'awards' | 'industry' | 'research' | 'credits';
  issueDate: string;
  image?: string;
  badgeText: string;
  description: string;
  skills: string[];
  verificationId?: string;
  grantAmount?: string;
  credentialType?: 'grant' | 'award' | 'badge' | 'paper' | 'certificate';
}

const CREDENTIALS: Credential[] = [
  {
    id: 'rotary-surat',
    title: '2nd Prize Winner — Innovation Challenge',
    issuer: 'Rotary Club of Surat',
    category: 'awards',
    issueDate: 'October 2026',
    image: '/certificates/rotary_surat.jpg',
    badgeText: '🏆 2nd Prize Winner',
    grantAmount: '₹1.5L AI Credits',
    credentialType: 'award',
    description:
      'Awarded 2nd Prize for the innovation and pitch of BolnaSeekho.in, an interactive verbal communication and speech learning platform. Won ₹1,50,000 (₹1.5 Lakh) model credits from Sarvam AI.',
    skills: ['Speech AI', 'Pitch Presentation', 'Language EdTech', 'Product Architecture'],
  },
  {
    id: 'ssip-swachhsense',
    title: '₹1,37,000 Govt Prototype Grant — Swachh Sense',
    issuer: 'SSIP Gujarat (Student Startup & Innovation Policy)',
    category: 'gov_global',
    issueDate: 'August 2025',
    image: '/certificates/ssip_swachhsense.png',
    badgeText: '🏛️ ₹1,37,000 Govt Funded',
    grantAmount: '₹1,37,000',
    credentialType: 'grant',
    description:
      'Awarded ₹1,37,000 government prototype grant under SSIP Gujarat for Swachh Sense: an AI-driven smart city cleanliness monitoring and IoT-integrated automated municipal waste dispatch system.',
    skills: ['SSIP ₹1,37,000 Grant', 'Computer Vision', 'IoT Edge', 'Smart Cities', 'Municipal AI'],
  },
  {
    id: 'ssip-visionsentinel',
    title: '₹90,000 Govt Prototype Grant — Vision Sentinel',
    issuer: 'SSIP Gujarat (Student Startup & Innovation Policy)',
    category: 'gov_global',
    issueDate: 'August 2025',
    image: '/certificates/ssip_visionsentinel.png',
    badgeText: '🏛️ ₹90,000 Govt Funded',
    grantAmount: '₹90,000',
    credentialType: 'grant',
    description:
      'Awarded ₹90,000 government prototype grant under SSIP Gujarat for Vision Sentinel: an intelligent surveillance and real-time computer vision security anomaly detection platform.',
    skills: ['SSIP ₹90,000 Grant', 'Computer Vision', 'Google Vision AI', 'Real-time Telemetry'],
  },
  {
    id: 'ssip-trabitguard',
    title: '₹60,000 Govt Prototype Grant — Transit Guard',
    issuer: 'SSIP Gujarat & Govt Innovation Council',
    category: 'gov_global',
    issueDate: '2025',
    badgeText: '🏛️ ₹60,000 Govt Funded',
    grantAmount: '₹60,000',
    credentialType: 'grant',
    description:
      'Awarded ₹60,000 prototype funding for Transit Guard: a YOLOv8-powered edge computer vision system for public transit passenger flow tracking and overcrowding analytics.',
    skills: ['₹60,000 Govt Grant', 'YOLOv8', 'Edge AI', 'Public Transit', 'Transport Analytics'],
  },
  {
    id: 'nasa-space-apps',
    title: 'Global Hackathon Winner & Finalist',
    issuer: 'NASA Space Apps Challenge',
    category: 'gov_global',
    issueDate: '2024 & 2025',
    badgeText: '🚀 NASA Global Hackathon',
    credentialType: 'award',
    description:
      'Competed in NASA Space Apps Challenge solving planetary and Earth observation challenges using open satellite datasets, AI models, and real-time telemetry processing.',
    skills: ['Satellite Telemetry', 'AI Modeling', 'Planetary Data', 'Rapid Prototyping'],
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon Finalist',
    issuer: 'ISRO (Indian Space Research Organisation)',
    category: 'gov_global',
    issueDate: 'September 2025',
    image: '/certificates/isro_hackathon.png',
    badgeText: '🛰️ ISRO Space Hackathon',
    credentialType: 'award',
    description:
      'Participated in ISRO national space hackathon designing automated geospatial intelligence algorithms and payload telemetry processors.',
    skills: ['Geospatial AI', 'Payload Telemetry', 'Computer Vision', 'Remote Sensing'],
  },
  {
    id: 'google-vertex-ai',
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud',
    category: 'industry',
    issueDate: 'December 2025',
    image: '/certificates/google_vertex_badge.png',
    badgeText: 'Google Cloud Skill Badge',
    credentialType: 'badge',
    description:
      'Demonstrated expertise in multimodal prompt engineering, few-shot tuning, parameter optimization, and grounding on Google Cloud Vertex AI.',
    skills: ['Vertex AI', 'Prompt Engineering', 'Gemini Models', 'Generative AI'],
  },
  {
    id: 'google-firebase',
    title: 'Develop Serverless Apps with Firebase',
    issuer: 'Google Cloud',
    category: 'industry',
    issueDate: 'December 2025',
    image: '/certificates/google_firebase_badge.png',
    badgeText: 'Google Cloud Skill Badge',
    credentialType: 'badge',
    description:
      'Architecting resilient serverless workflows using Cloud Functions, Firestore real-time synchronization, and automated Firebase Security Rules.',
    skills: ['Firebase', 'Cloud Functions', 'Firestore', 'Serverless Architecture'],
  },
  {
    id: 'microsoft-github-copilot',
    title: 'Developer Use Cases for AI with GitHub Copilot',
    issuer: 'Microsoft & GitHub',
    category: 'industry',
    issueDate: '2025',
    badgeText: 'Microsoft AI Specialization',
    credentialType: 'badge',
    description:
      'Certified in AI-assisted developer workflows: prompt synthesis, automated unit test generation, code scanning, and responsible AI guardrails.',
    skills: ['GitHub Copilot', 'Prompt Synthesis', 'AI Test Generation', 'Code Security'],
  },
  {
    id: 'genai-exchange',
    title: 'Gen-AI Exchange National Hackathon',
    issuer: 'Google Cloud & Hack2Skill',
    category: 'awards',
    issueDate: '2025',
    image: '/certificates/genai_exchange.png',
    badgeText: '🏆 Gen-AI Hackathon',
    credentialType: 'award',
    description:
      'Engineered and demonstrated production GenAI agent systems leveraging Foundation Models, vector embeddings, and autonomous retrieval loops.',
    skills: ['Generative AI', 'Agent Workflows', 'Multimodal LLMs', 'Hack2Skill'],
  },
  {
    id: 'agentic-ai-cert',
    title: 'Agentic AI Architecture & Implementation Specialist',
    issuer: 'Hack2Skill & Industry Mentors',
    category: 'industry',
    issueDate: '2025',
    image: '/certificates/agentic_ai_cert.png',
    badgeText: 'Agentic AI Certified',
    credentialType: 'certificate',
    description:
      'Specialized certification in autonomous multi-agent systems, function calling orchestration, and self-healing error recovery loops.',
    skills: ['Agentic AI', 'Multi-Agent Systems', 'Tool Calling', 'LLM Guardrails'],
  },
  {
    id: 'iit-mandi',
    title: 'National Hackathon & Tech Competition',
    issuer: 'IIT Mandi',
    category: 'awards',
    issueDate: 'May 2026',
    image: '/certificates/Mandi.jpg',
    badgeText: 'IIT Mandi Credential',
    credentialType: 'award',
    description:
      'Competed in national level engineering and coding challenges at IIT Mandi, building scalable full-stack algorithmic systems under strict deadlines.',
    skills: ['Algorithms', 'Full Stack', 'Competitive Engineering', 'System Design'],
  },
  {
    id: 'hack-baroda',
    title: 'Vadodara National Hackathon (HackBaroda)',
    issuer: 'Baroda Hackathon Tech Council',
    category: 'awards',
    issueDate: '2025',
    image: '/certificates/Hackbaroda.jpg',
    badgeText: '🏆 HackBaroda Finalist',
    credentialType: 'award',
    description:
      'Competed at HackBaroda national hackathon, developing civic tech and real-time algorithmic solutions under a high-intensity 36-hour sprint.',
    skills: ['Civic AI', 'Rapid Prototyping', 'Real-time Web', 'Team Leadership'],
  },
  {
    id: 'ppsu-hackathon',
    title: 'PPSU National Innovation Hackathon',
    issuer: 'P. P. Savani University (PPSU)',
    category: 'awards',
    issueDate: '2025',
    image: '/certificates/PPSU.jpg',
    badgeText: '🚀 Innovation Finalist',
    credentialType: 'award',
    description:
      'Developed end-to-end intelligent engineering prototypes and demonstrated technical architecture at PPSU national hackathon.',
    skills: ['System Design', 'Full Stack Development', 'AI Prototyping', 'PPSU Tech'],
  },
  {
    id: 'gsolution-cert',
    title: 'Enterprise Tech & Engineering Solutions Certification',
    issuer: 'G-Solutions',
    category: 'industry',
    issueDate: '2025',
    image: '/certificates/Gsolution.jpg',
    badgeText: 'Verified Industry Credential',
    credentialType: 'certificate',
    description:
      'Industry credential validating scalable application architectures, secure database integration, and production deployment standards.',
    skills: ['Enterprise Engineering', 'System Architecture', 'Backend APIs', 'Quality Assurance'],
  },
  {
    id: 'oep-research-agent',
    title: 'Open Ended Project (OEP) — Autonomous Research Agent',
    issuer: 'SCET Computer Engineering Academic Council',
    category: 'research',
    issueDate: '2025 - 2026',
    image: '/certificates/OEP.jpg',
    badgeText: 'Academic Research Honors',
    credentialType: 'paper',
    description:
      'Awarded top academic honours for engineering an autonomous multi-source scientific research agent featuring citation verification and RAG architecture.',
    skills: ['Research Agents', 'Academic Project', 'RAG & NLP', 'Vector Search'],
  },
  {
    id: 'tmc-task-management',
    title: 'Enterprise Task Management System — Professional Internship',
    issuer: 'TMC Consultancy & SCET Project',
    category: 'industry',
    issueDate: '2025',
    image: '/certificates/Task_page-0001.jpg',
    badgeText: 'Enterprise Deployment',
    credentialType: 'certificate',
    description:
      'Engineered and deployed a full-scale corporate task management and operational workflow system, automating internal milestones and team tracking.',
    skills: ['Task Management', 'Internal Tooling', 'Enterprise Web', 'Operational Automation'],
  },
  {
    id: 'whatsapp-automation-generator',
    title: 'Automated Certificate Generator & WhatsApp Bulk Automation',
    issuer: 'Commercial Client & Event Solutions',
    category: 'industry',
    issueDate: '2025',
    image: '/certificates/Generator.png',
    badgeText: 'Client Production System',
    credentialType: 'certificate',
    description:
      'Engineered high-throughput automated certificate generation pipeline integrated with bulk WhatsApp messaging API for event credentials dispatch.',
    skills: ['Bulk Automation', 'Certificate Generation', 'WhatsApp API', 'High Throughput'],
  },
  {
    id: 'iiit-devheat',
    title: 'Dev Heat National Hackathon Nomination',
    issuer: 'IIIT (Indian Institute of Information Technology)',
    category: 'awards',
    issueDate: '2025',
    image: '/certificates/iiit_dev_heat.jpg',
    badgeText: 'IIIT Finalist',
    credentialType: 'award',
    description:
      'Nominated finalist in Dev Heat hackathon organized by IIIT for developing high-impact civic software solutions.',
    skills: ['Civic Tech', 'Real-time Web', 'Microservices', 'FastAPI'],
  },
  {
    id: 'tata-certification',
    title: 'Data & Technology Systems Certification',
    issuer: 'Tata Group',
    category: 'industry',
    issueDate: 'May 2025',
    image: '/certificates/tata.jpg',
    badgeText: 'Enterprise Certification',
    credentialType: 'certificate',
    description:
      'Industry-recognized program evaluating architectural patterns, enterprise data flows, and secure business application development.',
    skills: ['Enterprise Systems', 'Data Pipelines', 'Architecture', 'Best Practices'],
  },
  {
    id: 'flipkart-grid',
    title: 'Engineering & Innovation Challenge',
    issuer: 'Flipkart',
    category: 'industry',
    issueDate: 'May 2025',
    image: '/certificates/flipkart.jpg',
    badgeText: 'E-Commerce Tech',
    credentialType: 'certificate',
    description:
      'Engineered high-throughput consumer web architecture and supply chain intelligence prototypes for Flipkart technical benchmarks.',
    skills: ['Scalable Systems', 'E-Commerce Stacks', 'High Throughput', 'Next.js'],
  },
  {
    id: 'adobe-creative',
    title: 'Digital Systems & Design Certification',
    issuer: 'Adobe',
    category: 'industry',
    issueDate: 'December 2025',
    image: '/certificates/adobe.jpg',
    badgeText: 'Creative & UI Tech',
    credentialType: 'certificate',
    description:
      'Specialized certification in digital design systems, vector asset workflows, and user-centric interactive product prototypes.',
    skills: ['Design Systems', 'UI/UX', 'Vector Workflows', 'Creative Tech'],
  },
  {
    id: 'mcp-server-paper',
    title: 'Model Context Protocol (MCP) Server Architecture',
    issuer: 'Independent Research & SCET',
    category: 'research',
    issueDate: '2026',
    image: '/certificates/research_cert.png',
    badgeText: 'Research Paper',
    credentialType: 'paper',
    description:
      'Authored in-depth technical paper detailing multi-tool agent orchestration, JSON-RPC streaming, and low-latency sandboxed context delivery.',
    skills: ['MCP Servers', 'Agent Tool Calling', 'Protocol Architecture', 'LLM Context'],
  },
  {
    id: 'research-agent-paper',
    title: 'Autonomous Multi-Source Literature Synthesizer',
    issuer: 'Independent Research & SCET',
    category: 'research',
    issueDate: '2026',
    badgeText: 'Research Paper',
    credentialType: 'paper',
    description:
      'Published architectural blueprint for multi-hop scientific literature retrieval agents with automated citation verification and hallucination guards.',
    skills: ['Autonomous Agents', 'Vector Embeddings', 'Semantic Synthesis', 'NLP'],
  },
  {
    id: 'IACON-cloud-credits',
    title: '$30,000 Cloud Infrastructure Grant — IACON',
    issuer: 'IACON Global Portfolio',
    category: 'credits',
    issueDate: '2025',
    badgeText: '☁️ $30,000 Portfolio Grant',
    grantAmount: '$30,000 USD',
    credentialType: 'grant',
    description:
      'Awarded $30,000 in IACON portfolio cloud infrastructure credits to support scalable cloud computing, distributed database hosting, and high-throughput application deployment.',
    skills: ['IACON Grant', '$30,000 Grant', 'Cloud Infrastructure', 'Hosting & Compute', 'Enterprise Infrastructure'],
  },
  {
    id: 'google-cloud-credits',
    title: '$2,000 Google Cloud Platform AI & Compute Grant',
    issuer: 'Google Cloud Platform',
    category: 'credits',
    issueDate: '2025',
    badgeText: '🌐 $2,000 Google Cloud Grant',
    grantAmount: '$2,000 USD',
    credentialType: 'grant',
    description:
      'Received $2,000 in Google Cloud credits to power machine learning model inference, high-performance computing, and scalable full-stack application development.',
    skills: ['Google Cloud', '$2,000 Grant', 'Vertex AI', 'Compute Engine', 'Cloud Run'],
  },
  {
    id: 'mongodb-credits',
    title: '$500 MongoDB Atlas Database Grant',
    issuer: 'MongoDB Atlas',
    category: 'credits',
    issueDate: '2025',
    badgeText: '🍃 $500 MongoDB Grant',
    grantAmount: '$500 USD',
    credentialType: 'grant',
    description:
      'Awarded $500 MongoDB Atlas credits for production-ready document database clusters, aggregation pipelines, and high-availability database architectures.',
    skills: ['MongoDB Atlas', '$500 Grant', 'NoSQL Architecture', 'Database Clusters'],
  },
  {
    id: 'sarvam-ai-grant',
    title: '₹1.5 Lakh Sarvam AI Speech & GenAI Model Credits — BolnaSeekho',
    issuer: 'Sarvam AI (Indic GenAI Foundation Models)',
    category: 'credits',
    issueDate: '2025',
    badgeText: '🤖 ₹1.5 Lakh AI Credits',
    grantAmount: '₹1,50,000',
    credentialType: 'grant',
    description:
      'Awarded ₹1,50,000 (₹1.5 Lakh) in Sarvam AI platform credits and speech model APIs to power BolnaSeekho.in with real-time voice intelligence, Indic language modeling, and conversational speech rehabilitation.',
    skills: ['Sarvam AI', '₹1.5 Lakh Credits', 'Speech-to-Text', 'Indic GenAI', 'BolnaSeekho.in'],
  },
  {
    id: 'techsodh-grant',
    title: '₹1,50,000 Technology Initiative Grant — TechSodh',
    issuer: 'Technology & Startup Initiative',
    category: 'credits',
    issueDate: '2025',
    badgeText: '💡 ₹1,50,000 Venture Grant',
    grantAmount: '₹1,50,000',
    credentialType: 'grant',
    description:
      'Awarded ₹1,50,000 development funding for TechSodh.in to support technology infrastructure, automated curation algorithms, and product growth.',
    skills: ['TechSodh.in', '₹1,50,000 Grant', 'Platform Architecture', 'Product Scaling'],
  },
];

function getCategoryIcon(item: Credential) {
  if (item.badgeText.includes('🏆') || item.badgeText.includes('Prize') || item.badgeText.includes('Finalist')) {
    return <Trophy className="size-4" />;
  }
  if (item.category === 'gov_global') {
    if (item.badgeText.includes('NASA') || item.badgeText.includes('ISRO')) {
      return <Rocket className="size-4" />;
    }
    return <Landmark className="size-4" />;
  }
  if (item.category === 'credits') {
    if (item.badgeText.includes('Sarvam')) return <Bot className="size-4" />;
    if (item.badgeText.includes('MongoDB')) return <Database className="size-4" />;
    return <Cloud className="size-4" />;
  }
  if (item.category === 'research') {
    return <BookOpen className="size-4" />;
  }
  if (item.badgeText.includes('Copilot')) {
    return <Terminal className="size-4" />;
  }
  return <Award className="size-4" />;
}

// Executive Digital Credential Plaque for items without a paper scan
function DigitalGrantPlaque({ item }: { item: Credential }) {
  const isGrant = Boolean(item.grantAmount);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-accent/25 bg-gradient-to-br from-zinc-900/90 via-[#0a0c14] to-zinc-950 p-4 flex flex-col justify-between shadow-inner">
      {/* Decorative Guilloche Border & Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-2 rounded-lg border border-white/5 pointer-events-none" />

      {/* Top Strip */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-accent font-bold tracking-wider uppercase">
          {getCategoryIcon(item)}
          <span>{item.category === 'credits' ? 'Institutional Grant' : 'Official Credential'}</span>
        </div>

        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          VERIFIED RECORD
        </span>
      </div>

      {/* Center Callout */}
      <div className="relative z-10 my-auto py-2 text-center">
        {isGrant ? (
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
              {item.grantAmount}
            </div>
            <div className="font-mono text-[10px] text-accent/90 uppercase tracking-widest font-semibold mt-0.5">
              Approved Allocation
            </div>
          </div>
        ) : (
          <div>
            <div className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-white">
              {item.badgeText}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
              {item.issuer}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metadata */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
        <span className="truncate max-w-[140px] uppercase">Talaviya Ronak</span>
        <span className="text-zinc-500">ID: {item.id.slice(0, 10).toUpperCase()}</span>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  const [filter, setFilter] = useState<'all' | 'gov_global' | 'awards' | 'industry' | 'research' | 'credits'>('all');
  const [activeModal, setActiveModal] = useState<Credential | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close modal on Escape
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const handleCopySummary = (item: Credential) => {
    sound.playClick();
    const text = `${item.title} | Issued by ${item.issuer} (${item.issueDate}) — Verified Credential of Ronak Talaviya`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = CREDENTIALS.filter((c) => (filter === 'all' ? true : c.category === filter));

  const filterTabs = [
    { id: 'all', label: 'All Credentials', count: CREDENTIALS.length },
    { id: 'credits', label: 'Cloud & Venture Grants', count: CREDENTIALS.filter((c) => c.category === 'credits').length },
    { id: 'gov_global', label: 'Govt & Space (ISRO/NASA/SSIP)', count: CREDENTIALS.filter((c) => c.category === 'gov_global').length },
    { id: 'awards', label: 'Hackathons & Awards', count: CREDENTIALS.filter((c) => c.category === 'awards').length },
    { id: 'industry', label: 'Google, Microsoft & Industry', count: CREDENTIALS.filter((c) => c.category === 'industry').length },
    { id: 'research', label: 'Authored Research', count: CREDENTIALS.filter((c) => c.category === 'research').length },
  ];

  return (
    <section id="certifications" className="py-20 border-b border-border bg-background/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Official Honors & Credentials
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Certifications & <span className="text-accent">Awards</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Verified credentials from Rotary Club of Surat 2nd Prize, ₹4.37L in Total Grants (₹2.87L SSIP Govt Prototype Grants + ₹1.5L Tech Initiative Grant), ₹1.5L Sarvam AI Credits, ISRO & NASA Hackathons, and industry skill badges from Google Cloud, Microsoft & Tata.
          </p>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFilter(tab.id as typeof filter);
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20 ring-2 ring-accent/30'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    filter === tab.id ? 'bg-accent-foreground/15 text-accent-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                sound.playChime();
                setActiveModal(item);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  sound.playChime();
                  setActiveModal(item);
                }
              }}
              className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card/90 backdrop-blur-xs p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/15 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {/* Top ambient glow */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Issuer & Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/25">
                      {getCategoryIcon(item)}
                    </div>
                    <div className="min-w-0">
                      <span className="font-heading text-xs font-bold text-foreground block truncate" title={item.issuer}>
                        {item.issuer}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground block">
                        {item.issueDate}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] font-bold text-accent bg-accent/15 px-2.5 py-1 rounded-full border border-accent/25 shrink-0 whitespace-nowrap">
                    {item.badgeText}
                  </span>
                </div>

                {/* Certificate / Plaque Preview Container (Fixed Uniform Height across ALL cards) */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-border/80 bg-[#0a0c12] my-2 group-hover:border-accent/60 group-hover:shadow-lg transition-all flex items-center justify-center">
                  {item.image ? (
                    <div className="relative w-full h-full p-2 flex items-center justify-center">
                      <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center shadow-md bg-black/40">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 font-mono text-[9px] font-semibold text-emerald-400 bg-black/75 px-2 py-0.5 rounded-full border border-emerald-500/30 backdrop-blur-xs">
                        <CheckCircle2 className="size-3" />
                        <span>Scan</span>
                      </div>
                    </div>
                  ) : (
                    <DigitalGrantPlaque item={item} />
                  )}

                  {/* Frosted Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs z-20">
                    <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-accent-foreground bg-accent px-4 py-2 rounded-full shadow-lg shadow-accent/30 border border-border/30">
                      <Eye className="size-3.5" />
                      <span>Inspect Credential</span>
                    </span>
                  </div>
                </div>

                {/* Title & Description with balanced height alignment */}
                <div className="mt-2 space-y-1.5 flex-1">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 min-h-[3rem] flex items-center">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[3.75rem]">
                    {item.description}
                  </p>
                </div>

                {/* Skills Tags & Footer Action */}
                <div className="relative z-10 mt-4 pt-3.5 border-t border-border/70 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {item.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-muted/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-border/50 truncate max-w-[120px]"
                        title={s}
                      >
                        {s}
                      </span>
                    ))}
                    {item.skills.length > 3 && (
                      <span className="rounded-md bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/80">
                        +{item.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>Inspect</span>
                    <ArrowUpRight className="size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Fidelity Credential Inspection Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="credential-modal-title"
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-w-4xl w-full max-h-[92vh] rounded-3xl border border-border bg-card shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-4 sm:p-6 border-b border-border/80 bg-muted/40">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent border border-accent/30">
                  {getCategoryIcon(activeModal)}
                </div>
                <div className="min-w-0">
                  <h4
                    id="credential-modal-title"
                    className="font-heading text-lg sm:text-2xl font-extrabold text-foreground leading-tight"
                  >
                    {activeModal.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-xs text-muted-foreground">
                    <span className="text-foreground/90 font-semibold">{activeModal.issuer}</span>
                    <span>·</span>
                    <span>{activeModal.issueDate}</span>
                    <span className="font-bold text-accent bg-accent/15 px-2 py-0.5 rounded-full border border-accent/20 text-[10px]">
                      {activeModal.badgeText}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeModal.image && (
                  <a
                    href={activeModal.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground/80 hover:text-foreground bg-muted hover:bg-muted/80 border border-border px-3 py-1.5 rounded-full transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Open High-Res</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveModal(null);
                  }}
                  className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/60 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Document / Credential Display Canvas */}
              {activeModal.image ? (
                <div className="relative w-full h-[45vh] sm:h-[52vh] max-h-[500px] rounded-2xl border border-zinc-800 bg-[#07080c] flex items-center justify-center p-3 sm:p-5 overflow-hidden shadow-2xl">
                  {/* Subtle dot matrix grid */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={activeModal.image}
                      alt={activeModal.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              ) : (
                /* Full-Size Institutional Sanction Diploma */
                <div className="relative w-full rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-zinc-900 via-[#0a0d14] to-zinc-950 p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-2 rounded-xl border border-white/5 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 text-center space-y-3 pb-6 border-b border-white/10">
                    <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-accent tracking-widest uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                      {getCategoryIcon(activeModal)}
                      <span>Authenticated Institutional Record</span>
                    </div>
                    <div className="text-zinc-400 font-mono text-xs uppercase tracking-wider">
                      This official record certifies recognition and honor conferred upon
                    </div>
                    <h3 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-wide">
                      RONAK TALAVIYA
                    </h3>
                  </div>

                  <div className="relative z-10 py-6 text-center space-y-3">
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                      In Recognition of Technical Excellence & Project Architecture
                    </div>
                    <div className="font-heading text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto">
                      {activeModal.title}
                    </div>
                    {activeModal.grantAmount && (
                      <div className="pt-2">
                        <span className="font-heading text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-accent">
                          {activeModal.grantAmount}
                        </span>
                        <div className="font-mono text-[11px] text-accent font-semibold tracking-wider uppercase mt-1">
                          Official Allocation & Financial Sanction
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
                    <div className="text-center sm:text-left">
                      <span className="text-zinc-300 font-semibold block">{activeModal.issuer}</span>
                      <span>Sanction Period: {activeModal.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="size-4" />
                      <span>AUTHENTICATED RECORD</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Narrative Breakdown */}
              <div className="rounded-2xl border border-border bg-muted/40 p-5 space-y-4">
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-accent font-bold mb-1">
                    Executive Scope & Impact Summary
                  </h5>
                  <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                    {activeModal.description}
                  </p>
                </div>

                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-accent font-bold mb-2">
                    Verified Competencies & Technologies
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModal.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-card border border-border px-3 py-1 font-mono text-xs text-foreground/85"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Toolbar */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-t border-border/80 bg-muted/40 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopySummary(activeModal)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  {copiedId === activeModal.id ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy Credential Info</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-emerald-500 font-bold">
                  <FileCheck className="size-4" />
                  <span>Verified Authenticity</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveModal(null);
                  }}
                  className="rounded-full bg-accent text-accent-foreground px-5 py-1.5 font-bold hover:bg-accent-hover transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

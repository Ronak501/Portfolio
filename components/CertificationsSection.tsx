'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Trophy,
  FileCheck,
  CheckCircle2,
  GraduationCap,
  Layers,
  Eye,
  X,
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
    description:
      'Awarded 2nd Prize for the innovation and pitch of BolnaSeekho.in, an interactive verbal communication and speech learning platform.',
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
    description:
      'Awarded ₹90,000 government prototype grant under SSIP Gujarat for Vision Sentinel: an intelligent surveillance and real-time computer vision security anomaly detection platform.',
    skills: ['SSIP ₹90,000 Grant', 'Computer Vision', 'Google Vision AI', 'Real-time Telemetry'],
  },
  {
    id: 'ssip-trabitguard',
    title: '₹60,000 Govt Prototype Grant — Trabit Guard',
    issuer: 'Govt Innovation & Prototype Grant',
    category: 'gov_global',
    issueDate: '2025',
    badgeText: '🏛️ ₹60,000 Govt Funded',
    description:
      'Awarded ₹60,000 prototype funding for Trabit Guard (Transit Guard): a YOLOv8-powered edge computer vision system for public transit passenger flow tracking and overcrowding analytics.',
    skills: ['₹60,000 Govt Grant', 'YOLOv8', 'Edge AI', 'Public Transit', 'Transport Analytics'],
  },
  {
    id: 'nasa-space-apps',
    title: 'Global Hackathon Winner & Finalist',
    issuer: 'NASA Space Apps Challenge',
    category: 'gov_global',
    issueDate: '2024 & 2025',
    badgeText: '🚀 NASA Global Hackathon',
    description:
      'Competed in NASA Space Apps Challenge solving planetary and Earth observation challenges using open satellite datasets and AI models.',
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
    description:
      'Published architectural blueprint for multi-hop scientific literature retrieval agents with automated citation verification and hallucination guards.',
    skills: ['Autonomous Agents', 'Vector Embeddings', 'Semantic Synthesis', 'NLP'],
  },
  {
    id: 'IACON-cloud-credits',
    title: '$30,000 Cloud Infrastructure Grant — IACON',
    issuer: 'Amazon Web Services (IACON)',
    category: 'credits',
    issueDate: '2025',
    badgeText: '☁️ $30,000 IACON Portfolio Grant',
    description:
      'Awarded $30,000 in IACON portfolio cloud infrastructure credits to support scalable cloud computing, distributed database hosting, and high-throughput application deployment.',
    skills: ['IACON Activate', '$30,000 Grant', 'Cloud Infrastructure', 'EC2 & S3', 'Enterprise Hosting'],
  },
  {
    id: 'google-cloud-credits',
    title: '$2,000 Google Cloud Platform AI & Compute Grant',
    issuer: 'Google Cloud Platform',
    category: 'credits',
    issueDate: '2025',
    badgeText: '🌐 $2,000 Google Cloud Grant',
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
    description:
      'Awarded ₹1,50,000 development funding for TechSodh.in to support technology infrastructure, automated curation algorithms, and product growth.',
    skills: ['TechSodh.in', '₹1,50,000 Grant', 'Platform Architecture', 'Product Scaling'],
  },
];

export default function CertificationsSection() {
  const [filter, setFilter] = useState<'all' | 'gov_global' | 'awards' | 'industry' | 'research' | 'credits'>('all');
  const [activeModal, setActiveModal] = useState<Credential | null>(null);

  const filtered = CREDENTIALS
    .filter((c) => (filter === 'all' ? true : c.category === filter))
    .sort((a, b) => {
      // Prioritize certificates with verified image/scan first
      const aHasImg = Boolean(a.image);
      const bHasImg = Boolean(b.image);
      if (aHasImg && !bHasImg) return -1;
      if (!aHasImg && bHasImg) return 1;
      return 0;
    });

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
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Official validations, hackathon triumphs (Rotary Surat, NASA, ISRO), government grants, and cloud skill badges from Google, Microsoft & Tata.
          </p>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All Credentials' },
              { id: 'credits', label: 'Cloud & Venture Grants ($32.5K+ / ₹5.8L+)' },
              { id: 'gov_global', label: 'Govt & Global (ISRO/NASA/SSIP)' },
              { id: 'awards', label: 'Hackathons & Awards' },
              { id: 'industry', label: 'Google, Microsoft & Industry' },
              { id: 'research', label: 'Authored Research' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFilter(tab.id as typeof filter);
                }}
                className={`rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all ${filter === tab.id
                    ? 'bg-accent text-white shadow-md shadow-accent/20 ring-2 ring-accent/30'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Header: Issuer & Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/25">
                      {item.badgeText.includes('🏆') || item.badgeText.includes('Award') ? (
                        <Trophy className="size-4" />
                      ) : (
                        <Award className="size-4" />
                      )}
                    </div>
                    <div>
                      <span className="font-heading text-xs font-bold text-foreground block">
                        {item.issuer}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {item.issueDate}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] font-bold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/20">
                    {item.badgeText}
                  </span>
                </div>

                {/* Certificate Preview Image (if available) */}
                {item.image && (
                  <div
                    onClick={() => {
                      sound.playChime();
                      setActiveModal(item);
                    }}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 my-3 cursor-pointer group/img"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="flex items-center gap-1 font-mono text-xs text-white bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                        <Eye className="size-3.5" />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Title & Description */}
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors mt-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Skills Tags & Action */}
              <div className="relative z-10 mt-5 pt-4 border-t border-border/70 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-muted/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {item.image && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playChime();
                      setActiveModal(item);
                    }}
                    className="font-mono text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                  >
                    <span>View</span>
                    <Eye className="size-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModal && activeModal.image && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-w-4xl w-full rounded-3xl border border-border bg-[#0e0c15] p-5 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-accent animate-ping" />
                <h4 className="font-heading text-base font-bold text-white">
                  {activeModal.title}
                </h4>
                <span className="font-mono text-xs text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/20">
                  {activeModal.issuer}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveModal(null);
                }}
                className="flex size-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Certificate Image Canvas */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-4 border border-zinc-800 bg-black flex items-center justify-center">
              <Image
                src={activeModal.image}
                alt={activeModal.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground pt-2 border-t border-border/70">
              <span>{activeModal.description}</span>
              <span className="text-emerald-400 font-bold">VERIFIED CREDENTIAL</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

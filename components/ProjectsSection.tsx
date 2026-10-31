'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  Github,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';
import ProjectModal, { ProjectData } from './ProjectModal';
import { sound } from '@/lib/audio';

const PROJECTS: ProjectData[] = [
  {
    id: 'myentrypass',
    title: 'MyEntryPass',
    category: 'realtime',
    tags: ['Next.js', 'FastAPI', 'Dynamic QR', 'Real-Time Gates', 'FinTech'],
    proof: 'Encrypted rotating QR check-in',
    description:
      'Next-generation digital event ticketing and live QR access management infrastructure. Provides anti-fraud encrypted rotating QR credentials, instantaneous gate scanning verification, and live organizer attendance telemetry.',
    outcome:
      'Designed encrypted rotating QR credentials and real-time attendance tracking for event entry.',
    role: 'Founder, Product Architect & Full-Stack Lead',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    demoUrl: 'https://myentrypass.in',
    caseStudy: {
      problem:
        'Traditional paper tickets and static barcodes suffer from counterfeit copying, gate bottleneck delays, and zero real-time attendee tracking.',
      architecture: [
        'High-throughput dynamic encrypted QR token generation preventing duplicate entry',
        'Real-time WebSocket scanning synchronization across distributed mobile gate scanners',
        'Organizer telemetry dashboard providing instant capacity warnings and check-in velocity',
      ],
      keyResults: [
        'Single-use rotating tokens support duplicate-pass prevention at entry.',
        'WebSocket synchronization shares scan status across gate devices.',
        'Organizer telemetry surfaces capacity and check-in activity.',
      ],
    },
  },
  {
    id: 'shapentic',
    title: 'Shapentic',
    category: 'fullstack',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design', 'Product Studio'],
    proof: 'Interactive digital product experiences',
    description:
      'Modern digital product studio crafting high-converting brand platforms, bespoke user interfaces, and interactive web applications engineered to scale from zero to one.',
    outcome:
      'Shipped custom interactive digital brand experiences with reusable interface components and motion design.',
    role: 'Co-Creator & Frontend Architect',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    demoUrl: 'https://shapentic.com',
    caseStudy: {
      problem:
        'Early-stage ventures and modern brands struggle with generic templates that fail to convert visitors or communicate technical credibility.',
      architecture: [
        'Component-driven design system with bespoke typography and tailored dark mode aesthetics',
        'Optimized client-side transitions and fluid micro-animations powered by Framer Motion',
        'Reusable component library supports future product experiences.',
      ],
      keyResults: [
        'Custom interfaces replace generic templates with product-specific branding.',
        'Interaction patterns and components can be reused across product sites.',
      ],
    },
  },
  {
    id: 'techsodh',
    title: 'Techsodh',
    category: 'ai',
    tags: ['₹1.5L Grant', 'Next.js', 'Automated Curation', 'Tech Discovery', 'AI Insights'],
    proof: '₹1,50,000 Technology Initiative Grant',
    description:
      'Curated developer discovery and tech ecosystem platform dedicated to in-depth research, software reviews, benchmark evaluations, and emerging developer tooling insights.',
    outcome:
      'Secured ₹1,50,000 development grant to accelerate technical research, automated tool categorization, and benchmark comparisons.',
    role: 'Creator & Tech Lead',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    demoUrl: 'https://techsodh.in',
    caseStudy: {
      problem:
        'Developers face acute discovery fatigue when evaluating hundreds of competing AI tools, frameworks, and APIs without objective benchmarks.',
      architecture: [
        'Automated pipeline scraping, indexing, and categorizing developer releases',
        'Interactive comparison matrix evaluating speed, licensing, and API costs',
        'Serverless incremental static regeneration (ISR) keeping benchmark indexes fresh with low server overhead',
      ],
      keyResults: [
        'Secured ₹1,50,000 Technology Initiative Development Grant',
        'Organizes developer tools and benchmark comparisons for discovery.',
      ],
    },
  },
  {
    id: 'bolnaseekho',
    title: 'BolnaSeekho',
    category: 'ai',
    tags: ['Rotary 2nd Prize', '₹1.5L Sarvam AI', 'Speech AI', 'Language Models', 'EdTech'],
    proof: '2nd Prize Rotary Surat · ₹1.5L Sarvam AI',
    description:
      'AI-powered verbal communication, pronunciation training, and speech stuttering rehabilitation ecosystem. Empowers users to build conversational fluency and public speaking confidence through interactive voice AI.',
    outcome:
      'Awarded 2nd Prize at Rotary Club of Surat Innovation Challenge and won ₹1,50,000 (₹1.5 Lakh) model credits from Sarvam AI.',
    role: 'Creator & Lead Architect',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    demoUrl: 'https://bolnaseekho.in',
    caseStudy: {
      problem:
        'Speech rehabilitation and conversational confidence training are prohibitively expensive and inaccessible, leaving millions without guided practice.',
      architecture: [
        'Low-latency speech-to-text and audio feature extraction analyzing pitch and pauses',
        'Indic voice foundation models fine-tuned with Sarvam AI for pronunciation precision',
        'Adaptive conversational feedback loops generating progressive fluency exercises',
      ],
      keyResults: [
        'Awarded 2nd Prize in Rotary Club of Surat Innovation Challenge',
        'Awarded ₹1,50,000 model and platform credits from Sarvam AI',
        'Adaptive practice flows provide feedback on pronunciation and speaking exercises.',
      ],
    },
  },
];

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack' | 'realtime'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [modalMode, setModalMode] = useState<'demo' | 'case' | null>(null);
  const [gitHubRepos, setGitHubRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);

  useEffect(() => {
    // Auto-fetch repos from GitHub API
    fetch('https://api.github.com/users/Ronak501/repos?sort=updated&per_page=6')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGitHubRepos(data);
        }
      })
      .catch(() => {
        // Fallback default repos
        setGitHubRepos([
          {
            name: 'profile-analyzer',
            description: 'Social Media Analyzer with FastAPI backend & React frontend',
            html_url: 'https://github.com/Ronak501/profile-analyzer',
            stargazers_count: 2,
            language: 'Python',
          },
          {
            name: 'task_management',
            description: 'Collaborative real-time task manager with WebSockets & Docker',
            html_url: 'https://github.com/Ronak501/task_management',
            stargazers_count: 1,
            language: 'TypeScript',
          },
          {
            name: 'Portfolio',
            description: 'Modern Next.js portfolio website with live themes & interactive studio',
            html_url: 'https://github.com/Ronak501/Portfolio',
            stargazers_count: 3,
            language: 'TypeScript',
          },
        ]);
      })
      .finally(() => {
        setReposLoading(false);
      });
  }, []);

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesFilter =
      filter === 'all' ||
      proj.category === filter ||
      (filter === 'fullstack' && proj.tags.includes('React') && proj.tags.includes('Node.js'));

    const matchesSearch =
      searchQuery === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const openModal = (proj: ProjectData, mode: 'demo' | 'case') => {
    sound.playClick();
    setSelectedProject(proj);
    setModalMode(mode);
  };

  return (
    <section id="projects" className="border-b border-border py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Portfolio
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Featured <span className="text-accent">Work</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Handcrafted production-grade projects, AI prototypes, and live GitHub repositories.
          </p>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              aria-label="Search featured projects"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by keyword, tech, or topic..."
              className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'ai', label: 'AI' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'realtime', label: 'Real-time' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFilter(tab.id);
                }}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                    : 'border border-border bg-card text-foreground/75 hover:bg-muted hover:text-foreground'
                }`}
                aria-pressed={filter === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
            >
              {/* Subtle top gradient glow */}
              <div
                className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${project.gradient} pointer-events-none`}
              />

              <div>
                {/* Badge and Proof Pill */}
                <div className="mb-4 flex flex-col items-start gap-2">
                  <span className="font-mono text-[11px] font-semibold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/25 uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">
                    {project.proof}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-heading text-2xl font-bold text-foreground transition-colors duration-200 group-hover:text-accent">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted/70 px-2.5 py-0.5 font-mono text-[11px] text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-2 border-t border-border/80 pt-4">
                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex min-h-10 items-center rounded-full border border-accent/30 bg-accent/15 px-4 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      Visit Live Site
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openModal(project, 'case')}
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-muted/40 px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Case Study
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div role="status" className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-5 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No projects match the current search and filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="inline-flex min-h-10 items-center rounded-full border border-accent/30 px-4 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* GitHub Repositories Live Feed */}
        <div className="mt-16 rounded-3xl border border-border bg-card/60 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Github className="size-5 text-accent" />
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                Latest GitHub Repositories
              </h3>
            </div>
            <a
              href="https://github.com/Ronak501"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="text-xs sm:text-sm font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>View all on GitHub</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reposLoading ? (
              <div className="col-span-full py-8 text-center text-sm text-muted-foreground font-mono">
                Fetching repositories from GitHub...
              </div>
            ) : (
              gitHubRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground group-hover:text-accent transition-colors truncate">
                      {repo.name}
                    </span>
                    <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-accent" />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                    {repo.description || 'Open-source project and codebase.'}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-accent" />
                      {repo.language || 'Code'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="size-3 text-amber-400" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        mode={modalMode}
        onClose={() => {
          setSelectedProject(null);
          setModalMode(null);
        }}
      />
    </section>
  );
}

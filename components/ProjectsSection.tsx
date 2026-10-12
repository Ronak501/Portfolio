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
    id: 'fact-checking',
    title: 'AI Fact Checking Platform',
    category: 'ai',
    tags: ['React', 'Node.js', 'Python', 'NLP', 'n8n'],
    proof: '+58% claim verification accuracy',
    description:
      'AI-powered platform for instant news verification using NLP, external source scraping, and credibility scoring. Analyzes claims and provides real-time fact-check results with source citations.',
    outcome:
      'Automated real-time verification reduced misinformation exposure and improved user trust significantly.',
    role: 'Full-stack development with AI pipeline orchestration and real-time UI.',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    githubUrl: 'https://github.com/Ronak501',
    caseStudy: {
      problem:
        'Manual fact-checking of rapidly spreading online claims is too slow to stop misinformation waves across media platforms.',
      architecture: [
        'Multi-agent pipeline extracting semantic entity claims using NLP models',
        'Real-time vector search across trusted news sources and public datasets',
        'Scoring engine producing confidence bounds and human-readable explanations',
      ],
      keyResults: [
        '+58% improvement in verification accuracy against test datasets',
        'Sub-second query response times for trending claims',
        'Automated citations with transparent source confidence percentages',
      ],
    },
  },
  {
    id: 'research-agent',
    title: 'AI Research Agent & Paper Generator',
    category: 'ai',
    tags: ['Python', 'LLM', 'n8n', 'Gemini API'],
    proof: '75% time saved on literature review',
    description:
      'Intelligent research assistant powered by LLMs that aggregates data from academic sources and synthesizes structured academic literature reviews automatically.',
    outcome:
      'Automated multi-source research and paper generation cut initial research time by 75%.',
    role: 'Designed agent architecture, LLM integration, and automated workflow pipelines.',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    githubUrl: 'https://github.com/Ronak501',
    caseStudy: {
      problem:
        'Synthesizing dozens of papers across arXiv and research repositories takes researchers days of manual reading and outlining.',
      architecture: [
        'Automated paper fetcher querying research APIs and extracting key abstracts',
        'Hierarchical summarization agent clustering recurring arguments and methodologies',
        'Markdown paper generator creating citations and bibliography entries',
      ],
      keyResults: [
        'Cut manual literature review time from 12 hours down to 2.5 hours',
        'Consistent LaTeX and Markdown bibliography generation',
        'Multi-model fallback handling for long context windows',
      ],
    },
  },
  {
    id: 'social-analyzer',
    title: 'Social Media Analyzer',
    category: 'ai',
    tags: ['React', 'FastAPI', 'MongoDB'],
    proof: '35% faster reporting',
    description:
      'Comprehensive analytics dashboard aggregating and visualizing cross-platform social media metrics with actionable AI-powered audience growth insights.',
    outcome:
      'Reduced manual campaign analysis time with centralized insights and predictive engagement scores.',
    role: 'Full-stack implementation with high-speed analytics API integration.',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    githubUrl: 'https://github.com/Ronak501/profile-analyzer',
    caseStudy: {
      problem:
        'Marketing teams waste hours manually assembling spreadsheets from disparate social channels without predictive indicators.',
      architecture: [
        'FastAPI backend aggregating social metrics with asynchronous workers',
        'MongoDB document store indexing high-volume timeseries metrics',
        'Interactive React charts with AI recommendations for optimal posting windows',
      ],
      keyResults: [
        'Centralized tracking across multiple brand channels into one dashboard',
        '35% reduction in time needed to produce weekly campaign reports',
        'Intuitive cohort engagement visualizations',
      ],
    },
  },
  {
    id: 'task-management',
    title: 'Task Management System',
    category: 'realtime',
    tags: ['React', 'Node.js', 'Docker', 'WebSockets'],
    proof: '2.3x faster team sync',
    description:
      'Collaborative sprint task manager featuring automated AI prioritization, instant bidirectional WebSocket updates, and Dockerized microservice architecture.',
    outcome:
      'Real-time sync lowered coordination delays for distributed engineering teams.',
    role: 'Owned collaboration architecture, AI priority logic, and containerized deployment.',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    githubUrl: 'https://github.com/Ronak501/task_management',
    caseStudy: {
      problem:
        'Distributed agile teams experience synchronization drift when updates lag across separate browser tabs and team members.',
      architecture: [
        'WebSocket hub broadcasting task mutations with optimistic UI updates',
        'AI priority engine re-weighting backlogs based on deadline risk and dependencies',
        'Docker Compose setup for one-command local dev and isolated testing',
      ],
      keyResults: [
        'Zero-latency card movements across concurrent team sessions',
        '2.3x faster team updates without requiring manual browser refreshes',
      ],
    },
  },
  {
    id: 'motel-management',
    title: 'Motel Management System',
    category: 'fullstack',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    proof: '30% faster check-in flow',
    description:
      'Full-stack hospitality system with visual room booking, customer tracking, role-based staff authentication, and real-time check-in/checkout status.',
    outcome:
      'Streamlined front-desk room operations and eliminated double-booking friction.',
    role: 'Led full-stack module design, state workflows, and data modeling.',
    gradient: 'from-violet-500/20 via-accent/10 to-transparent',
    githubUrl: 'https://github.com/Ronak501',
    caseStudy: {
      problem:
        'Independent hospitality operations struggle with paper logs and clunky legacy software causing check-in bottlenecks.',
      architecture: [
        'TypeScript end-to-end type safety between API routes and frontend state',
        'Room allocation state machine preventing overlapping reservation conflicts',
        'Role-based access control separating administrative reporting from staff desks',
      ],
      keyResults: [
        '30% reduction in average customer check-in turnaround time',
        'Real-time room occupancy color grids for front-desk operators',
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
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl relative overflow-hidden"
            >
              {/* Subtle top gradient glow */}
              <div
                className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${project.gradient} pointer-events-none`}
              />

              <div>
                {/* Badge and Proof Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] font-semibold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/25 uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 font-medium">
                    {project.proof}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-accent transition-colors">
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
              <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openModal(project, 'demo')}
                    className="rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
                  >
                    Live Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal(project, 'case')}
                    className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Case Study
                  </button>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="size-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

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

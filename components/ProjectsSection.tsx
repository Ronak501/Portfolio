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
    id: 'swachh-sense',
    title: 'Swachh Sense',
    category: 'ai',
    tags: ['SSIP ₹1.37L Grant', 'Computer Vision', 'IoT Sensors', 'FastAPI', 'Smart City'],
    proof: '🏛️ ₹1,37,000 SSIP Govt Prototype Grant',
    description:
      'AI-driven municipal cleanliness monitoring and IoT waste detection platform. Analyzes CCTV and edge camera feeds to detect urban waste overflow and automatically dispatches sanitation teams with GPS coordinates.',
    outcome:
      'Awarded ₹1,37,000 SSIP Gujarat prototype grant; automated civic waste detection and dispatch routing.',
    role: 'Lead AI & IoT Systems Architect',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    caseStudy: {
      problem:
        'Manual municipal waste inspections rely on delayed citizen complaints, leading to uncollected urban waste hotspots and inefficient sanitation truck routing.',
      architecture: [
        'Edge computer vision pipeline detecting waste accumulation severity and bin fill levels from camera streams',
        'IoT ultrasonic and weight telemetry fused with FastAPI ingestion microservices',
        'Automated municipal alert engine dispatching geotagged tickets to nearest sanitation crews',
      ],
      keyResults: [
        'Approved for ₹1,37,000 SSIP Gujarat Government Prototype Grant',
        'Real-time waste classification and severity scoring across multi-camera streams',
        'Automated ticket routing reduces manual inspection overhead for civic authorities',
      ],
    },
  },
  {
    id: 'vision-sentinel',
    title: 'Vision Sentinel',
    category: 'ai',
    tags: ['SSIP ₹90K Grant', 'Google Vision AI', 'Real-Time Alerts', 'Python', 'Security'],
    proof: '🏛️ ₹90,000 SSIP Govt Prototype Grant',
    description:
      'Intelligent video surveillance and anomaly detection platform utilizing computer vision to identify unauthorized perimeter breaches, crowd anomalies, and safety hazards in real time.',
    outcome:
      'Awarded ₹90,000 SSIP Gujarat prototype grant for automated real-time threat and anomaly surveillance.',
    role: 'Computer Vision & Backend Lead',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    caseStudy: {
      problem:
        'Security personnel monitoring dozens of simultaneous CCTV feeds experience severe attention fatigue, missing critical perimeter breaches or safety incidents.',
      architecture: [
        'Low-latency frame sampling and object/anomaly classification using Google Vision and custom CV detectors',
        'Event-driven alert dispatcher pushing instant incident snapshots and bounding-box metadata to operators',
        'Configurable zone rules and audit trail logging for industrial and campus security compliance',
      ],
      keyResults: [
        'Approved for ₹90,000 SSIP Gujarat Government Prototype Grant',
        'Sub-second anomaly flagging with automated visual evidence capture',
        'Reduces operator monitoring fatigue across multi-stream surveillance setups',
      ],
    },
  },
  {
    id: 'transit-guard',
    title: 'Transit Guard',
    category: 'realtime',
    tags: ['₹60K Govt Grant', 'YOLOv8', 'Edge AI', 'WebSockets', 'Public Transit'],
    proof: '🏛️ ₹60,000 Govt Grant · 96% Counting Precision',
    description:
      'YOLOv8 edge computer vision system for public transport passenger flow tracking, boarding/alighting counts, overcrowding detection, and live fleet capacity telemetry.',
    outcome:
      'Awarded ₹60,000 prototype grant; achieved 96% passenger counting precision in edge transit evaluations.',
    role: 'Edge AI & Vision Pipeline Architect',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    caseStudy: {
      problem:
        'Public transit authorities lack accurate, real-time occupancy data per bus or coach, causing severe overcrowding on peak routes and underutilized fleet scheduling.',
      architecture: [
        'YOLOv8 object detection paired with centroid/ByteTrack multi-object tracking across doorway regions-of-interest',
        'Directional line-crossing vector logic distinguishing boarding vs. alighting passengers under occlusion',
        'Real-time WebSocket telemetry streaming live occupancy percentages to central transit dashboards',
      ],
      keyResults: [
        'Awarded ₹60,000 Government Prototype Grant',
        '96% counting precision validated across crowded doorway entry/exit scenarios',
        'Live overcrowding alerts support dynamic fleet dispatch decisions',
      ],
    },
  },
  {
    id: 'nasa-space-apps',
    title: 'Planetary & Earth Telemetry Explorer',
    category: 'ai',
    tags: ['NASA Space Apps', 'Satellite Data', 'Geospatial AI', 'Next.js', 'Python'],
    proof: '🚀 NASA Space Apps Global Hackathon Winner & Finalist',
    description:
      'Interactive Earth observation and planetary data intelligence platform built for the NASA Space Apps Challenge, fusing open satellite datasets with AI anomaly modeling and visual telemetry.',
    outcome:
      'Recognized at NASA Space Apps Challenge (2024 & 2025) for rapid geospatial prototyping and scientific visualization.',
    role: 'Team Lead & Full-Stack AI Engineer',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    caseStudy: {
      problem:
        'Raw multi-spectral satellite and planetary telemetry datasets are massive and difficult for researchers, students, and policymakers to query and interpret interactively.',
      architecture: [
        'Automated data ingestion normalizing NASA open APIs and geospatial raster/vector layers',
        'AI-assisted pattern recognition highlighting environmental anomalies and temporal changes',
        'Interactive web visualization dashboard with timeline scrubbing and coordinate telemetry inspection',
      ],
      keyResults: [
        'NASA Space Apps Challenge Winner & Finalist across 2024 and 2025 cohorts',
        'Transforms complex satellite datasets into an intuitive, low-latency browser interface',
      ],
    },
  },
  {
    id: 'isro-antariksh',
    title: 'ISRO Geospatial Payload Analytics',
    category: 'realtime',
    tags: ['ISRO Finalist', 'Remote Sensing', 'Computer Vision', 'FastAPI', 'Telemetry'],
    proof: '🛰️ ISRO Bharatiya Antariksh Hackathon Finalist',
    description:
      'Geospatial intelligence and automated remote-sensing image analysis pipeline engineered for the ISRO Bharatiya Antariksh Hackathon, processing high-resolution satellite imagery and payload telemetry.',
    outcome:
      'Selected as National Finalist in the ISRO Bharatiya Antariksh Hackathon (September 2025).',
    role: 'Geospatial AI & Backend Architect',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    caseStudy: {
      problem:
        'High-resolution remote sensing imagery requires automated feature extraction and rapid coordinate indexing to be actionable during time-sensitive space and terrain missions.',
      architecture: [
        'Tile-based satellite image preprocessing and multi-scale computer vision segmentation',
        'FastAPI asynchronous processing queue for high-throughput payload telemetry decoding',
        'Structured geospatial metadata output compatible with standard GIS workflows',
      ],
      keyResults: [
        'National Finalist in ISRO Bharatiya Antariksh Hackathon 2025',
        'High-throughput tile segmentation pipeline designed for rapid terrain analysis',
      ],
    },
  },
  {
    id: 'profile-and-task-suite',
    title: 'Profile Analyzer & Real-Time Task Suite',
    category: 'fullstack',
    tags: ['React', 'Next.js', 'FastAPI', 'WebSockets', 'Docker', 'TypeScript'],
    proof: '⚡ Open-Source Full-Stack & Real-Time Systems',
    description:
      'Production-ready open-source full-stack systems: an AI-assisted Social Media Profile Analyzer built with FastAPI + React, and a collaborative real-time Task Management platform powered by WebSockets and Docker.',
    outcome:
      'Shipped containerized full-stack architectures demonstrating clean REST/WebSocket APIs and responsive UI state sync.',
    role: 'Full-Stack Creator & Maintainer',
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    demoUrl: 'https://github.com/Ronak501/profile-analyzer',
    caseStudy: {
      problem:
        'Teams and creators need fast, self-hostable full-stack templates that combine Python AI/analytics backends with real-time TypeScript/React frontends.',
      architecture: [
        'FastAPI REST & asynchronous analytics engine paired with a responsive React/TypeScript frontend',
        'Bi-directional WebSocket state synchronization for instant multi-user task board updates',
        'Multi-container Docker Compose orchestration for reproducible one-command deployment',
      ],
      keyResults: [
        'Publicly available open-source repositories on GitHub (@Ronak501)',
        'Demonstrates end-to-end TypeScript + Python full-stack engineering with Docker',
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
    const matchesFilter = filter === 'all' || proj.category === filter;

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
            Engineering Case Studies
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Featured <span className="text-accent">Systems</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Grant-funded civic AI prototypes, national hackathon architectures, and open-source GitHub repositories.
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

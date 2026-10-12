'use client';

import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  proof: string;
  description: string;
  outcome: string;
  role: string;
  gradient: string;
  githubUrl: string;
  demoUrl?: string;
  caseStudy: {
    problem: string;
    architecture: string[];
    keyResults: string[];
  };
}

export default function ProjectModal({
  project,
  mode,
  onClose,
}: {
  project: ProjectData | null;
  mode: 'demo' | 'case' | null;
  onClose: () => void;
}) {
  if (!project || !mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full border border-border bg-muted/50 text-foreground hover:bg-muted"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
            {mode === 'demo' ? 'Live Interactive Preview' : 'Case Study Breakdown'}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="font-mono text-xs text-muted-foreground">{project.proof}</span>
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
          {project.title}
        </h3>

        <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Case Study Details */}
        {mode === 'case' && (
          <div className="space-y-5 border-t border-border/80 pt-5">
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide mb-1 text-accent">
                The Challenge & Context
              </h4>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide mb-2 text-accent">
                Architecture & Engineering Solutions
              </h4>
              <ul className="space-y-1.5">
                {project.caseStudy.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide mb-2 text-accent">
                Measurable Impact & Results
              </h4>
              <ul className="space-y-1.5">
                {project.caseStudy.keyResults.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="size-1.5 rounded-full bg-accent shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Demo Mode Details */}
        {mode === 'demo' && (
          <div className="space-y-5 border-t border-border/80 pt-5">
            <div className="rounded-2xl border border-border bg-black/40 p-5 text-center space-y-3">
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs text-emerald-400 font-semibold">
                  ● Service Endpoint Active
                </span>
              </div>
              <h4 className="font-heading text-lg font-bold text-foreground">
                Simulated Sandbox & API Demo
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                This project is running as part of Ronak&apos;s active portfolio ecosystem. You can inspect the source repository on GitHub or review the live deployment endpoints.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
              <b>Role:</b> {project.role}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-accent-hover transition-colors shadow-md shadow-accent/20"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Github className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

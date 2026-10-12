'use client';

import {
  Code2,
  Server,
  BrainCircuit,
  Database,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';
import TechStackDiscs from '@/components/TechStackDiscs';

const SKILL_GROUPS = [
  {
    title: 'Frontend Development',
    icon: Code2,
    badge: 'UI & Interactivity',
    skills: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Proficient' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    badge: 'High Performance',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'FastAPI', level: 'Proficient' },
      { name: 'Python', level: 'Advanced' },
      { name: 'Express.js', level: 'Proficient' },
      { name: 'RESTful Architecture', level: 'Advanced' },
      { name: 'WebSockets (Real-time)', level: 'Proficient' },
    ],
  },
  {
    title: 'AI & Computer Vision',
    icon: BrainCircuit,
    badge: 'Intelligent Systems',
    skills: [
      { name: 'YOLOv8 Object Detection', level: 'Proficient' },
      { name: 'NLP & Semantic Search', level: 'Proficient' },
      { name: 'LLM Multi-Agent Workflows', level: 'Proficient' },
      { name: 'Google Vision API', level: 'Proficient' },
      { name: 'n8n Workflow Automation', level: 'Proficient' },
      { name: 'Gemini / OpenAI APIs', level: 'Advanced' },
    ],
  },
  {
    title: 'Databases & DevOps',
    icon: Database,
    badge: 'Storage & Scale',
    skills: [
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'Firebase & Firestore', level: 'Proficient' },
      { name: 'Docker Containers', level: 'Proficient' },
      { name: 'Git & GitHub Workflows', level: 'Advanced' },
      { name: 'Linux / Bash CLI', level: 'Proficient' },
      { name: 'Vercel / Cloud Deployments', level: 'Advanced' },
    ],
  },
];

export default function SkillsBento() {
  return (
    <section id="skills" className="border-b border-border py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Skills & Stack
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            My <span className="text-accent">Toolbox</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Technologies, frameworks, and AI ecosystems I rely on to turn ideas into software.
          </p>
        </div>

        {/* Circular Logo Tech Stack Display */}
        <TechStackDiscs />

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="group rounded-3xl border border-border bg-card p-6 sm:p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/20">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                        {group.title}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                    {group.badge}
                  </span>
                </div>

                {/* Skills chips */}
                <div className="grid grid-cols-2 gap-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded-xl border border-border/80 bg-background/60 px-3.5 py-2.5 transition-colors group-hover:border-border hover:bg-muted/40"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-accent font-medium">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

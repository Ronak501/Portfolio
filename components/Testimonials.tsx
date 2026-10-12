'use client';

import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Ronak takes ownership from idea to deployment. His blend of engineering discipline and design sense makes every prototype feel production-ready.',
    author: 'Hackathon Program Mentor',
    role: 'NASA Space Apps Evaluation',
  },
  {
    quote:
      'In team projects, he turns unclear requirements into clear modules and keeps everyone aligned. Communication and execution speed are both exceptional.',
    author: 'Senior Peer & Teammate',
    role: 'SCET College Project Collaboration',
  },
  {
    quote:
      'He rapidly iterates with user feedback and validates outcomes with data. The AI feature decisions were practical, measurable, and remarkably resilient.',
    author: 'Product Sprint Reviewer',
    role: 'Full-Stack Hackathon Panel',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-border py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Endorsements
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            What People <span className="text-accent">Say</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Feedback from hackathon mentors, engineering teammates, and project reviewers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl relative overflow-hidden"
            >
              <Quote className="size-8 text-accent/30 mb-4" />
              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-border/80 pt-4">
                <p className="font-heading text-sm font-bold text-foreground">
                  {t.author}
                </p>
                <p className="font-mono text-xs text-accent mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { Quote, Award, ArrowUpRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Awarded 2nd Prize for BolnaSeekho.in—recognized for combining low-latency Indic voice models with practical speech and fluency rehabilitation.',
    author: 'Innovation Challenge Jury Recognition',
    role: 'Rotary Club of Surat · Won ₹1.5L Sarvam AI Credits',
    credentialHref: '/certifications',
  },
  {
    quote:
      'Approved across three independent prototype grant evaluations (Swachh Sense ₹1.37L, Vision Sentinel ₹90K, Transit Guard ₹60K) for civic & edge computer vision impact.',
    author: 'SSIP Gujarat Grant Evaluation Panel',
    role: 'Student Startup & Innovation Policy (Govt. of Gujarat)',
    credentialHref: '/certifications',
  },
  {
    quote:
      'Selected as NASA Space Apps Challenge Winner/Finalist (2024 & 2025) and ISRO Bharatiya Antariksh Hackathon Finalist for geospatial & satellite telemetry engineering.',
    author: 'National & Global Space Hackathon Panels',
    role: 'NASA Space Apps & ISRO Antariksh Finalist',
    credentialHref: '/certifications',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-border py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Verified Recognition
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Jury & Program <span className="text-accent">Highlights</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Backed by government prototype grants, innovation juries, and national hackathon evaluations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="size-7 text-accent/40" />
                  <Award className="size-4 text-accent" />
                </div>
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-border/80 pt-4 flex items-end justify-between gap-2">
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">
                    {t.author}
                  </p>
                  <p className="font-mono text-xs text-accent mt-0.5">
                    {t.role}
                  </p>
                </div>
                <Link
                  href={t.credentialHref}
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-muted-foreground hover:text-accent shrink-0"
                >
                  <span>Verify</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

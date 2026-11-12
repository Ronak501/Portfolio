import Link from 'next/link';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import Hero from '@/components/Hero';

const SELECTED_WORK = [
  {
    number: '01',
    title: 'MyEntryPass',
    type: 'Event ticketing · Full stack',
    description:
      'A digital ticketing platform with rotating QR passes and live check-in tools for event teams.',
    href: '/work#projects',
    site: 'https://myentrypass.in',
  },
  {
    number: '02',
    title: 'Swachh Sense',
    type: 'Civic technology · Computer vision',
    description:
      'A cleanliness monitoring concept that combines camera feeds and sensor data to help route municipal response.',
    href: '/work#projects',
    site: null,
  },
  {
    number: '03',
    title: 'BolnaSeekho',
    type: 'Speech AI · Learning',
    description:
      'A voice practice platform focused on spoken English, pronunciation, and conversational confidence.',
    href: '/work#ventures',
    site: 'https://bolnaseekho.in',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="selected-work" className="border-b border-border py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-accent">A few things I’ve built</p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Selected work
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                I like building practical software that connects useful interfaces with data, automation, and AI.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent sm:self-auto"
            >
              More projects <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {SELECTED_WORK.map((project) => (
              <article key={project.number} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-6 sm:py-9">
                <span className="font-mono text-sm text-muted-foreground">{project.number}</span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-accent">{project.type}</p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-foreground">{project.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                    <Link href={project.href} className="inline-flex items-center gap-1.5 text-foreground hover:text-accent">
                      Read about it <ArrowRight className="size-4" />
                    </Link>
                    {project.site && (
                      <a href={project.site} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">
                        Visit website
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/30 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent">A little about me</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Student, founder, and builder in Surat.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I’m studying Computer Engineering at SCET and building products through Ornitech. My work spans web platforms, computer vision, and voice interfaces. I enjoy taking an idea from an early sketch through implementation and into use.
            </p>
          </div>
          <Link href="/about" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground hover:text-accent">
            More about me <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">Have something interesting to build?</h2>
            <p className="mt-2 text-muted-foreground">I’m open to thoughtful collaborations and engineering opportunities.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover">
              Get in touch <ArrowRight className="size-4" />
            </Link>
            <a href="https://github.com/Ronak501" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 hover:text-accent">
              <Github className="size-4" />
            </a>
            <a href="https://www.linkedin.com/in/ronak-talaviya-b65483281/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 hover:text-accent">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

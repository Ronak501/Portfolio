'use client';

const STATS = [
  {
    value: '5+',
    title: 'Shipped Projects',
    subtitle: 'Production & hackathon apps',
  },
  {
    value: '3+',
    title: 'Hackathons Won',
    subtitle: 'NASA Space Apps & sprints',
  },
  {
    value: '120+',
    title: 'Users Tested',
    subtitle: 'Feedback across live deployments',
  },
  {
    value: '75%',
    title: 'AI Workflow Speedup',
    subtitle: 'Via automated LLM & agent tasks',
  },
];

export default function StatsStrip() {
  return (
    <section className="border-b border-border bg-card/40 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg sm:text-left"
            >
              <p className="font-heading text-4xl sm:text-5xl font-extrabold text-accent">
                {stat.value}
              </p>
              <p className="mt-2 font-heading text-base font-bold text-foreground">
                {stat.title}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

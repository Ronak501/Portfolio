'use client';

const STATS = [
  {
    value: '$32.5K+',
    title: 'Cloud & AI Credits',
    subtitle: 'IACON ($30K) · Google Cloud ($2K) · MongoDB ($500)',
  },
  {
    value: '₹5.87L+',
    title: 'Grants & Funding',
    subtitle: 'SSIP Govt (₹2.87L) · Sarvam AI (₹1.5L) · TechSodh (₹1.5L)',
  },
  {
    value: '2nd',
    title: 'Rotary Surat Winner',
    subtitle: 'Innovation award for BolnaSeekho.in',
  },
  {
    value: '20+',
    title: 'Verified Credentials',
    subtitle: 'Google Cloud, Microsoft, ISRO, NASA, Tata & Flipkart',
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

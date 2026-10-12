import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ronak Talaviya',
  description: 'Privacy policy and data handling practices for visitors of Ronak Talaviya portfolio.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline mb-8"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="border-b border-border pb-8 mb-8">
          <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="size-4" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            How your information is protected when visiting this website or submitting project inquiries.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <EyeOff className="size-5 text-accent" />
              1. Zero Selling of Personal Data
            </h2>
            <p>
              Your personal information is never sold, rented, monetized, or shared with third-party advertising brokers under any circumstance.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <Shield className="size-5 text-accent" />
              2. Information Collected via Contact Forms
            </h2>
            <p>
              When you voluntarily reach out via the contact form (name, email address, topic, and message text), that data is used strictly to respond to your communication and evaluate prospective project collaborations.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground">
              3. Local Storage Preferences
            </h2>
            <p>
              This website uses client-side browser storage (<code className="text-accent font-mono text-xs">localStorage</code> and <code className="text-accent font-mono text-xs">sessionStorage</code>) exclusively to store your preferred visual theme (Sunset, Rainy, Matrix, Cyber) and track whether the intro animation sequence has already been viewed. No invasive tracking cookies are used.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-6 flex justify-between items-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ronak Talaviya</span>
          <Link href="/terms" className="text-accent hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}

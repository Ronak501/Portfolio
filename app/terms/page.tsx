import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, FileCheck, CheckCircle2, Lock, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Ronak Talaviya',
  description: 'Professional engagement terms, code ownership, revision policies, and client service agreements for Ronak Talaviya.',
};

export default function TermsPage() {
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
            <Scale className="size-4" />
            <span>Professional Agreement</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Standard terms of service, intellectual property transfer, and engagement guidelines for development collaborations with Ronak Talaviya.
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Last updated: October 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <FileCheck className="size-5 text-accent" />
              1. Scope of Work & Deliverables
            </h2>
            <p>
              All freelance and contract software projects are executed based on mutually agreed-upon project specifications, milestone breakdowns, and wireframes. Any changes or feature expansions outside the initial specification document will be reviewed and scoped under a separate milestone addendum.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <Shield className="size-5 text-accent" />
              2. Intellectual Property & Code Ownership
            </h2>
            <p>
              Upon receipt of final milestone settlement, <strong>100% of full intellectual property rights, source code, repositories, and build artifacts</strong> are immediately transferred to the client. Ronak retains no claim over client proprietary algorithms, trade secrets, or branding assets.
            </p>
            <p>
              Unless explicitly restricted via a custom Non-Disclosure Agreement (NDA), Ronak reserves the right to display non-sensitive project visuals, architecture highlights, and public case studies in his professional portfolio.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <Lock className="size-5 text-accent" />
              3. Confidentiality & Non-Disclosure (NDA)
            </h2>
            <p>
              Client data, private API credentials, trade secrets, unreleased codebases, and business metrics are treated with strict confidentiality. Sensitive credentials and server access tokens must be shared exclusively via secure key-vaults or temporary environment variables.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="size-5 text-accent" />
              4. Revisions & 30-Day Post-Launch Warranty
            </h2>
            <p>
              To ensure production peace of mind, every delivered project includes a complimentary <strong>30-day post-launch warranty</strong> covering bug fixes, edge-case remediation, and deployment stabilization according to the original specification.
            </p>
            <p>
              Major architectural rewrites or new third-party integrations requested after milestone sign-off are billed under subsequent sprints.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-bold text-foreground">
              5. Contact & Mutual Alignment
            </h2>
            <p>
              For enterprise inquiries, custom contractual agreements, or inquiries regarding specific jurisdiction terms, please reach out directly:
            </p>
            <p className="font-mono text-sm text-foreground">
              Email:{' '}
              <a href="mailto:ronaktalaviya51@gmail.com" className="text-accent underline">
                ronaktalaviya51@gmail.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="mt-12 border-t border-border pt-6 flex justify-between items-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ronak Talaviya</span>
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

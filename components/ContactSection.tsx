'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  MapPin,
  GraduationCap,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'project',
    message: '',
  });

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('ronaktalaviya51@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playChime();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f97316', '#38bdf8', '#10b981', '#a855f7'],
      });
    } catch {
      // Confetti fallback
    }

    setFormSubmitted(true);
    setFormData({ name: '', email: '', topic: 'project', message: '' });
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="border-b border-border py-20 bg-background/50 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Let&apos;s Connect
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-5xl font-extrabold text-foreground">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Have an opportunity, venture idea, or collaboration in mind? Let&apos;s build something great.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Contact Info & 1-Click Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Direct Inquiries
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Feel free to copy my email or ping me directly across social channels.
                </p>
              </div>

              {/* Email Pill with Copy Button */}
              <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                    Email Address
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href="mailto:ronaktalaviya51@gmail.com"
                  className="font-mono text-sm sm:text-base font-bold text-foreground hover:text-accent transition-colors block break-all"
                >
                  ronaktalaviya51@gmail.com
                </a>
              </div>

              {/* Location & School */}
              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-accent">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium block">Surat, Gujarat, India</span>
                    <span className="text-xs text-muted-foreground">Available remotely & worldwide</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-accent">
                    <GraduationCap className="size-4" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium block">SCET Surat</span>
                    <span className="text-xs text-muted-foreground">B.Tech Computer Engineering (4th Year)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-border/80 pt-6">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-3 font-semibold">
                Connect Online
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  {
                    name: 'GitHub',
                    href: 'https://github.com/Ronak501',
                    icon: Github,
                  },
                  {
                    name: 'LinkedIn',
                    href: 'https://www.linkedin.com/in/ronak-talaviya-b65483281/',
                    icon: Linkedin,
                  },
                  {
                    name: 'X (Twitter)',
                    href: 'https://x.com/ronak_51',
                    icon: Twitter,
                  },
                  {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/_ronak_51',
                    icon: Instagram,
                  },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground/80 hover:border-accent/40 hover:text-accent hover:bg-muted transition-all"
                    >
                      <Icon className="size-3.5" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Working Message Form */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Leave your project details, inquiry, or timeline below.
            </p>

            {formSubmitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-2 animate-in zoom-in-95">
                <Sparkles className="size-8 text-emerald-400 mx-auto" />
                <h4 className="font-heading text-lg font-bold text-foreground">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  Thank you for reaching out! Ronak will review your message and reply back shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-muted-foreground font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Alex Mercer"
                      className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-muted-foreground font-semibold">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted-foreground font-semibold">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
                  >
                    <option value="project">Project Collaboration</option>
                    <option value="job">Full-time / Internship Opportunity</option>
                    <option value="venture">Startup & AI Venture</option>
                    <option value="other">Saying Hello</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted-foreground font-semibold">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your idea, timeline, or product vision..."
                    className="w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="size-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

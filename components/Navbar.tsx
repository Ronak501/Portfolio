'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun,
  CloudRain,
  Terminal,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { sound } from '@/lib/audio';

type Theme = 'sunset' | 'rainy' | 'matrix' | 'cyber';

const THEMES: { id: Theme; label: string; icon: typeof Sun }[] = [
  { id: 'sunset', label: 'Sunset', icon: Sun },
  { id: 'rainy', label: 'Rainy', icon: CloudRain },
  { id: 'matrix', label: 'Matrix', icon: Terminal },
  { id: 'cyber', label: 'Cyber', icon: Sparkles },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<Theme>('sunset');
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Read saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    sound.playClick();
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    setThemeOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'AI Engine', href: '/ai' },
    { label: 'Ventures', href: '/ventures' },
    { label: 'Skills', href: '/skills' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const currentThemeData = THEMES.find((t) => t.id === theme) || THEMES[0];
  const CurrentThemeIcon = currentThemeData.icon;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-colors duration-300">
      {/* Scroll progress bar */}
      <div
        className="absolute inset-x-0 -bottom-px h-[2px] bg-accent transition-all duration-75 ease-out shadow-[0_0_8px_var(--accent-ink)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="relative size-9 overflow-hidden rounded-full border border-border ring-2 ring-accent/30 group-hover:ring-accent transition-all duration-300">
            <Image
              src="/Ronak.jpeg"
              alt="Ronak Talaviya"
              width={36}
              height={36}
              className="object-cover size-full group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
              Ronak<span className="text-accent">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => sound.playClick()}
                className={`group relative text-xs lg:text-sm font-semibold transition-colors py-1 ${
                  isActive
                    ? 'text-accent font-bold'
                    : 'text-foreground/75 hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'origin-left scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions: Theme Switcher & Let's Talk CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setThemeOpen(!themeOpen);
              }}
              aria-expanded={themeOpen}
              aria-label={`Theme: ${currentThemeData.label}. Change theme`}
              className="flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs sm:text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted hover:border-accent/40"
            >
              <CurrentThemeIcon className="size-4 text-accent" />
              <span className="hidden sm:inline">{currentThemeData.label}</span>
              <ChevronDown
                className={`size-3 text-muted-foreground transition-transform duration-200 ${
                  themeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {themeOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-border bg-card p-1.5 shadow-xl backdrop-blur-lg animate-in fade-in zoom-in-95 z-50">
                {THEMES.map((t) => {
                  const Icon = t.icon;
                  const isActive = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accent/15 text-accent font-semibold'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Let's Talk CTA Button */}
          <Link
            href="/contact"
            onClick={() => sound.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 rounded-full bg-accent px-4 text-xs sm:text-sm font-semibold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:scale-105 active:scale-95"
          >
            <span>Let&apos;s Talk</span>
            <ChevronRight className="size-4" />
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle mobile menu"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card px-4 py-4 md:hidden animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-accent/15 text-accent'
                      : 'text-foreground/85 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-sm font-semibold text-white shadow"
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

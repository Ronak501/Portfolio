'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  CloudRain,
  Terminal,
  Sparkles,
  Sun,
  ChevronDown,
  ChevronRight,
  Check,
  Menu,
  X,
} from 'lucide-react';
import { sound } from '@/lib/audio';
import { ThemeId } from '@/lib/themes';
import { useTheme } from '@/components/ThemeProvider';

const THEME_ICONS: Record<ThemeId, typeof Flame> = {
  sunset: Flame,
  rainy: CloudRain,
  matrix: Terminal,
  cyber: Sparkles,
  editorial: Sun,
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, currentTheme, themes } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!themeOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setThemeOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [themeOpen]);

  useEffect(() => {
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

  const handleThemeChange = (newTheme: ThemeId) => {
    sound.playClick();
    setTheme(newTheme);
    setThemeOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Work & Ventures', href: '/work' },
    { label: 'Skills', href: '/skills' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const CurrentThemeIcon = THEME_ICONS[currentTheme.id] || Flame;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-colors duration-300">
      {/* Scroll progress bar */}
      <div
        className="absolute inset-x-0 -bottom-px h-[2px] bg-accent transition-all duration-75 ease-out shadow-[0_0_8px_rgb(var(--accent-ink))]"
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
                aria-current={isActive ? 'page' : undefined}
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
          <div ref={themeDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setThemeOpen(!themeOpen);
              }}
              aria-expanded={themeOpen}
              aria-label={`Theme: ${currentTheme.label}. Change theme`}
              className="flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs sm:text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted hover:border-accent/40"
            >
              <CurrentThemeIcon className="size-4 text-accent" />
              <span className="hidden sm:inline">{currentTheme.label}</span>
              <ChevronDown
                className={`size-3 text-muted-foreground transition-transform duration-200 ${
                  themeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {themeOpen && (
              <div
                role="menu"
                aria-label="Color theme selector"
                className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 z-50"
              >
                <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-border/70 mb-1">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Appearance
                  </span>
                  <span className="font-mono text-[10px] text-accent uppercase">
                    {currentTheme.mode}
                  </span>
                </div>
                {themes.map((t) => {
                  const Icon = THEME_ICONS[t.id] || Flame;
                  const isActive = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onClick={() => handleThemeChange(t.id)}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left transition-colors ${
                        isActive
                          ? 'bg-accent/15 text-foreground font-semibold'
                          : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border/80"
                          style={{ backgroundColor: t.swatch.canvas }}
                          aria-hidden="true"
                        >
                          <Icon className="size-3.5" style={{ color: t.swatch.accent }} />
                        </span>
                        <div className="min-w-0">
                          <span className="block text-xs sm:text-sm leading-tight">{t.label}</span>
                          <span className="block font-mono text-[10px] text-muted-foreground truncate">
                            {t.tagline}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className="size-2.5 rounded-full ring-1 ring-border"
                          style={{ backgroundColor: t.swatch.accent }}
                          aria-hidden="true"
                        />
                        {isActive && <Check className="size-3.5 text-accent" />}
                      </div>
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
            className="motion-scale hidden sm:inline-flex items-center gap-1.5 h-9 rounded-full bg-accent px-4 text-xs sm:text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:scale-105 active:scale-95"
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
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-b border-border bg-card px-4 py-4 md:hidden animate-in slide-in-from-top-2">
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
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-sm font-semibold text-accent-foreground shadow"
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

'use client';

import { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react';
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  ThemeId,
  ThemeMeta,
  getThemeMeta,
  isValidTheme,
} from '@/lib/themes';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (next: ThemeId) => void;
  currentTheme: ThemeMeta;
  themes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_EVENT = 'portfolio-theme-change';

function applyThemeToDom(themeId: ThemeId) {
  if (typeof document === 'undefined') return;
  const meta = getThemeMeta(themeId);
  const root = document.documentElement;
  root.setAttribute('data-theme', meta.id);
  root.classList.toggle('dark', meta.mode === 'dark');
  root.style.colorScheme = meta.mode;

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', meta.themeColor);
  }
}

function getSnapshot(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isValidTheme(saved)) return saved;
  } catch {
    // Ignore storage access errors
  }
  return DEFAULT_THEME;
}

function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handleStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) callback();
  };
  window.addEventListener('storage', handleStorage);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage access errors
    }
    applyThemeToDom(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const currentTheme = getThemeMeta(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: DEFAULT_THEME,
      setTheme: () => {},
      currentTheme: getThemeMeta(DEFAULT_THEME),
      themes: THEMES,
    };
  }
  return ctx;
}


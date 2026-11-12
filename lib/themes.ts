export type ThemeId = 'sunset' | 'rainy' | 'matrix' | 'cyber' | 'editorial';

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  tagline: string;
  mode: 'dark' | 'light';
  themeColor: string;
  swatch: {
    canvas: string;
    surface: string;
    accent: string;
  };
}

export const DEFAULT_THEME: ThemeId = 'sunset';
export const THEME_STORAGE_KEY = 'portfolio-theme';

export const THEMES: ThemeMeta[] = [
  {
    id: 'sunset',
    label: 'Sunset',
    tagline: 'Ember Obsidian',
    mode: 'dark',
    themeColor: '#0d0b0a',
    swatch: {
      canvas: '#0d0b0a',
      surface: '#161210',
      accent: '#f97316',
    },
  },
  {
    id: 'rainy',
    label: 'Rainy',
    tagline: 'Arctic Slate',
    mode: 'dark',
    themeColor: '#090d16',
    swatch: {
      canvas: '#090d16',
      surface: '#101726',
      accent: '#38bdf8',
    },
  },
  {
    id: 'matrix',
    label: 'Matrix',
    tagline: 'Verdant Carbon',
    mode: 'dark',
    themeColor: '#070b09',
    swatch: {
      canvas: '#070b09',
      surface: '#0e1612',
      accent: '#10b981',
    },
  },
  {
    id: 'cyber',
    label: 'Cyber',
    tagline: 'Amethyst Noir',
    mode: 'dark',
    themeColor: '#0b0914',
    swatch: {
      canvas: '#0b0914',
      surface: '#141024',
      accent: '#a855f7',
    },
  },
  {
    id: 'editorial',
    label: 'Editorial',
    tagline: 'Warm Ivory',
    mode: 'light',
    themeColor: '#faf9f6',
    swatch: {
      canvas: '#faf9f6',
      surface: '#ffffff',
      accent: '#ea580c',
    },
  },
];

export function isValidTheme(value: string | null | undefined): value is ThemeId {
  return Boolean(value && THEMES.some((t) => t.id === value));
}

export function getThemeMeta(id: ThemeId): ThemeMeta {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}


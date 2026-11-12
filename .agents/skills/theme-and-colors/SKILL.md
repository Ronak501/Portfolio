---
name: theme-and-colors
description: >-
  Audits an existing web app's theme architecture and color palettes, upgrades the
  theme switching pipeline (zero-FOUC bootstrap, React store/context, Tailwind alpha-capable
  CSS tokens, semantic contrast pairs), and modernizes the color palettes across dark
  and light modes. Use when the user asks to improve or redesign the theme system,
  fix theme flicker/hardcoded colors, add light/dark themes, or modernize UI colors.
---

# Theme and Colors Modernization

Audit, refactor, and modernize both the **theme switching process** and the **color token system** in a frontend codebase (Next.js / React / Tailwind CSS).

## Instructions

### Step 1: Audit the Existing Theme Process and Color Usage

1. Locate where themes are defined and consumed:
   - Global CSS variables (`app/globals.css` or equivalent)
   - Tailwind configuration (`tailwind.config.*`)
   - Root layout (`app/layout.tsx`) and theme switchers (`Navbar`, settings menus)
2. Identify architectural gaps:
   - **Hex CSS variables with Tailwind v3 opacity modifiers**: If `tailwind.config.*` maps `'var(--token)'` to hex values, `/opacity` utilities (`bg-accent/15`, `bg-card/90`) fail to apply alpha transparency.
   - **FOUC (Flash of Wrong Theme)**: Reading `localStorage` only inside `useEffect` causes an initial flash of the default theme on page load.
   - **Missing semantic contrast tokens**: Using hardcoded `text-white` on `bg-accent` fails WCAG AA contrast on bright accents (sky blue, mint, amber).
   - **Hardcoded colors**: Search `app/` and `components/` for hardcoded hexes (`bg-[#...]`), `bg-black`, `bg-zinc-*`, or `rgba(...)` in inline styles (e.g., custom cursors, modals) that ignore active themes or break in light mode.
   - **Monochrome neon text**: Over-tinted secondary text (`--muted-foreground`) strains readability; replace with neutral or subtly tinted slate/stone meeting `>= 4.5:1` contrast.

### Step 2: Build a Central, Zero-FOUC Theme Process

1. **Central Registry (`lib/themes.ts`)**:
   - Define `ThemeId`, `ThemeMeta` (`id`, `label`, `tagline`, `mode: 'dark' | 'light'`, `themeColor`, and `swatch` preview colors), `DEFAULT_THEME`, and validation helpers.
2. **External-Store Provider (`components/ThemeProvider.tsx`)**:
   - Use React's `useSyncExternalStore` backed by `localStorage` and custom sync events to avoid hydration mismatches and `react-hooks/set-state-in-effect` lint errors.
   - Synchronize `data-theme`, `.dark` class, `document.documentElement.style.colorScheme`, and `<meta name="theme-color">` whenever the theme changes.
3. **Pre-Hydration Bootstrap (`app/layout.tsx`)**:
   - Add `suppressHydrationWarning` on `<html>` and inject a small synchronous `<script>` in `<head>` to apply the saved `data-theme`, `.dark` class, and `colorScheme` before first paint.

### Step 3: Modernize the Color System

1. **Enable Tailwind Alpha Modifiers**:
   - Store theme colors as space-separated RGB channels in `globals.css` (e.g., `--background: 13 11 10;`) and reference them in `tailwind.config.js` as `'rgb(var(--background) / <alpha-value>)'`.
   - For subtle borders, pre-blend the border channel (e.g., `#332924` -> `51 41 36`) so bare `border-border` stays crisp while `border-border/70` still scales cleanly.
2. **Curate Modern, Balanced Palettes**:
   - **Neutralized surfaces**: Use deep obsidian/slate/carbon canvases (`#070b09`–`#0d0b0a`) with distinct `+4%`–`+6%` elevated `--card` surfaces and `--muted` chips.
   - **Light/Editorial mode**: Include a composed light palette (e.g., warm paper ivory `#faf9f6` canvas + crisp white cards `#ffffff` + deep charcoal ink `#141311`) rather than mechanically inverting dark mode.
   - **Semantic contrast**: Define `--accent-foreground` per theme (`>= 4.5:1` contrast against `--accent-ink`) and update browser chrome (`::selection`, `:focus-visible`, custom scrollbars).

### Step 4: Migrate Components and Switcher UI

1. Replace `Navbar` local theme state with `useTheme()` and render visual color-swatch previews and dark/light indicators in the theme selector.
2. Replace `bg-accent ... text-white` pairs across buttons, tabs, and badges with `text-accent-foreground`.
3. Update inline theme colors (e.g., cursor rings, scroll bars, modal shells) to reference CSS variables (`rgb(var(--accent-ink) / 0.4)`, `bg-card`, `bg-muted/40`, `text-foreground`).

### Step 5: Verify

1. Run `npx tsc --noEmit` to confirm zero TypeScript errors.
2. Run `npm run build` to confirm all routes compile and prerender cleanly.
3. Verify the theme switcher persists across reloads with zero flash, and verify contrast across every dark and light theme.


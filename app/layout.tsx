import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SoundPlayer from '@/components/SoundPlayer';
import CustomCursor from '@/components/CustomCursor';
import CommandPostLoader from '@/components/CommandPostLoader';
import GlobalAiWidget from '@/components/GlobalAiWidget';
import { ThemeProvider } from '@/components/ThemeProvider';

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('portfolio-theme');var valid=['sunset','rainy','matrix','cyber','editorial'];if(valid.indexOf(t)===-1)t='sunset';var r=document.documentElement;r.setAttribute('data-theme',t);if(t==='editorial'){r.classList.remove('dark');r.style.colorScheme='light';}else{r.classList.add('dark');r.style.colorScheme='dark';}}catch(e){}})();`;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ronak501.github.io').replace(/\/$/, '');

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ronak Talaviya | Founder & Full Stack AI Developer',
  description:
    'Portfolio of Ronak Talaviya — Founder @ Ornitech.in, building Techsodh.in, MyEntryPass.in, Shapentic.com, and BolnaSeekho.in. Full Stack & AI Developer.',
  keywords: [
    'Ronak Talaviya',
    'Ornitech',
    'Techsodh',
    'MyEntryPass',
    'Shapentic',
    'BolnaSeekho',
    'Full Stack Developer',
    'AI Engineer',
    'Next.js',
    'FastAPI',
    'Portfolio',
  ],
  authors: [{ name: 'Ronak Talaviya', url: 'https://github.com/Ronak501' }],
  creator: 'Ronak Talaviya',
  openGraph: {
    title: 'Ronak Talaviya | Founder & Full Stack AI Developer',
    description:
      'Founder @ Ornitech.in · Building Techsodh, MyEntryPass, Shapentic, and BolnaSeekho. Autonomous AI architectures & scalable full-stack products.',
    url: `${siteUrl}/`,
    siteName: 'Ronak Talaviya Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronak Talaviya | Founder & Full Stack AI Developer',
    description:
      'Founder @ Ornitech.in · Building Techsodh, MyEntryPass, Shapentic, BolnaSeekho. AI & Web Systems.',
    creator: '@ronak_51',
  },
  icons: {
    icon: '/Ronak.jpeg',
    shortcut: '/Ronak.jpeg',
    apple: '/Ronak.jpeg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0b0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="sunset" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-accent/25 selection:text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          {/* Global Command Post Route Dispatcher */}
          <CommandPostLoader />

          {/* Global Trailing Cursor */}
          <CustomCursor />

          {/* Global Ambient Audio Equalizer */}
          <SoundPlayer />

          {/* Global Ask Ronak AI Voice & Data Extraction Drawer */}
          <GlobalAiWidget />

          {/* Global Navigation Bar */}
          <Navbar />

          {/* Dynamic Page Content */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Global Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

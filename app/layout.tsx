import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SoundPlayer from '@/components/SoundPlayer';
import CustomCursor from '@/components/CustomCursor';
import CommandPostLoader from '@/components/CommandPostLoader';

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
  metadataBase: new URL('https://ronak501.github.io'),
  title: 'Ronak Talaviya | Founder & Full Stack AI Developer',
  description:
    'Portfolio of Ronak Talaviya — Founder @ Ornitech.in, building Techsodh.in, MyEntryPass.in, and Shapentic.com. Full Stack & AI Developer.',
  keywords: [
    'Ronak Talaviya',
    'Ornitech',
    'Techsodh',
    'MyEntryPass',
    'Shapentic',
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
      'Founder @ Ornitech.in. Exploring autonomous AI architectures, smart city systems, and scalable full-stack products.',
    url: 'https://ronak501.github.io/',
    siteName: 'Ronak Talaviya Portfolio',
    images: [
      {
        url: '/Ronak.jpeg',
        width: 1200,
        height: 630,
        alt: 'Ronak Talaviya - Founder & Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronak Talaviya | Founder & Full Stack AI Developer',
    description:
      'Founder @ Ornitech.in · Building Techsodh, MyEntryPass, Shapentic. AI & Web Systems.',
    images: ['/Ronak.jpeg'],
    creator: '@ronak_51',
  },
  icons: {
    icon: '/Ronak.jpeg',
    shortcut: '/Ronak.jpeg',
    apple: '/Ronak.jpeg',
  },
};

export const viewport: Viewport = {
  themeColor: '#140e0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="sunset" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-accent selection:text-white min-h-screen flex flex-col`}
      >
        {/* Global Command Post Route Dispatcher */}
        <CommandPostLoader />

        {/* Global Trailing Cursor */}
        <CustomCursor />

        {/* Global Ambient Audio Equalizer */}
        <SoundPlayer />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import { sound } from '@/lib/audio';

export default function TechStackDiscs() {
  const categories = [
    {
      id: 'code',
      title: 'CODE',
      items: [
        {
          name: 'Roblox Studio',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path d="M26 12l88 24-26 80-88-24L26 12z" fill="#E2231A" />
              <rect x="52" y="52" width="24" height="24" rx="3" transform="rotate(15 64 64)" fill="#fff" />
            </svg>
          ),
        },
        {
          name: 'Luau',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="54" fill="#000080" />
              <circle cx="86" cy="40" r="16" fill="#fff" />
              <circle cx="38" cy="78" r="8" fill="#fff" />
              <circle cx="98" cy="28" r="6" fill="#000080" />
              <text x="44" y="74" fill="#fff" fontSize="22" fontFamily="sans-serif" fontWeight="bold">Lua</text>
            </svg>
          ),
        },
        {
          name: 'Next.js',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8" fill="none">
              <circle cx="64" cy="64" r="64" fill="#000" />
              <path
                d="M101.5 106.8L47.7 38H36v52h9.4V51.7l48.4 61.3c2.7-1.9 5.3-4 7.7-6.2z"
                fill="url(#next_grad)"
              />
              <path d="M82.5 38h9.4v33.4l-9.4-12V38z" fill="#fff" />
              <defs>
                <linearGradient id="next_grad" x1="71" y1="67" x2="103" y2="107" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          ),
        },
        {
          name: 'TypeScript',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="128" height="128" rx="20" fill="#3178C6" />
              <path
                d="M38 48h52v12h-20v40H58V60H38V48zm50 28c3 4 8 7 14 7 5 0 9-3 9-6 0-11-23-4-23-22 0-9 7-15 19-15 8 0 14 3 18 8l-7 8c-3-3-6-5-11-5-5 0-8 2-8 5 0 10 23 4 23 21 0 10-8 16-20 16-9 0-17-4-22-10l7-9z"
                fill="#fff"
              />
            </svg>
          ),
        },
        {
          name: 'JavaScript',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="128" height="128" rx="20" fill="#F7DF1E" />
              <path
                d="M36 94l14-8c3 6 7 10 13 10 6 0 10-3 10-9V42h16v45c0 14-9 22-24 22-14 0-23-8-29-15zm48 3l14-8c4 7 10 11 17 11 7 0 11-4 11-8 0-6-6-8-15-12-14-6-21-12-21-22 0-11 9-19 22-19 11 0 18 4 24 13l-13 8c-3-5-6-7-11-7-5 0-8 3-8 6 0 4 5 7 13 10 16 7 24 12 24 24 0 12-10 21-25 21-15 0-25-7-32-17z"
                fill="#000"
              />
            </svg>
          ),
        },
        {
          name: 'Tailwind CSS',
          icon: (
            <svg viewBox="0 0 64 64" className="size-7 sm:size-8" fill="#38BDF8">
              <path d="M16 28c3.3-6.7 8.3-10 15-10 10 0 11.7 7.5 16.7 9.2 3.3 1.1 6.7.3 10-2.5-3.3 6.7-8.3 10-15 10-10 0-11.7-7.5-16.7-9.2C22.7 24.4 19.3 25.2 16 28zm-16 16c3.3-6.7 8.3-10 15-10 10 0 11.7 7.5 16.7 9.2 3.3 1.1 6.7.3 10-2.5-3.3 6.7-8.3 10-15 10-10 0-11.7-7.5-16.7-9.2C6.7 40.4 3.3 41.2 0 44z" />
            </svg>
          ),
        },
        {
          name: 'Python',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path
                d="M63.5 8.2c-29.3 0-27.5 12.7-27.5 12.7l.1 13.2h28v4H22.7S8.2 36.5 8.2 65.8s12.7 28.3 12.7 28.3h7.6v-10.7s-.4-12.7 12.5-12.7h21.4s12.1.2 12.1-11.9V20.2s1.8-12-23.5-12zm-12.2 7.7a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"
                fill="#3776AB"
              />
              <path
                d="M64.5 119.8c29.3 0 27.5-12.7 27.5-12.7l-.1-13.2h-28v-4h41.4s14.5 1.6 14.5-27.7-12.7-28.3-12.7-28.3h-7.6v10.7s.4 12.7-12.5 12.7H48.1s-12.1-.2-12.1 11.9v28.6s-1.8 12 23.5 12zm12.2-7.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0-8.4z"
                fill="#FFD43B"
              />
            </svg>
          ),
        },
        {
          name: 'React.js',
          icon: (
            <svg viewBox="0 0 115 102" className="size-7 sm:size-8" fill="none">
              <ellipse cx="57.5" cy="51" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" />
              <ellipse
                cx="57.5"
                cy="51"
                rx="55"
                ry="20"
                stroke="#61DAFB"
                strokeWidth="6"
                transform="rotate(60 57.5 51)"
              />
              <ellipse
                cx="57.5"
                cy="51"
                rx="55"
                ry="20"
                stroke="#61DAFB"
                strokeWidth="6"
                transform="rotate(120 57.5 51)"
              />
              <circle cx="57.5" cy="51" r="9" fill="#61DAFB" />
            </svg>
          ),
        },
        {
          name: 'HTML5 & CSS3',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path d="M18 12l9 100 37 10 37-10 9-100H18z" fill="#E44D26" />
              <path d="M64 22v88l28-8 7-79H64z" fill="#F16529" />
              <path d="M38 42h52l-2 18H52l1 14h36l-3 30-22 6-22-6-1-16h14l1 7 8 2 8-2 2-11H36l2-38z" fill="#fff" />
            </svg>
          ),
        },
        {
          name: 'FastAPI',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8" fill="none">
              <circle cx="64" cy="64" r="64" fill="#009688" />
              <path d="M68 20L34 72h26l-6 36 34-52H62l6-36z" fill="#fff" />
            </svg>
          ),
        },
        {
          name: 'Node.js',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path d="M64 8l52 30v60L64 128 12 98V38L64 8z" fill="#339933" />
              <path
                d="M64 42v44M44 54l20 12 20-12"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          ),
        },
        {
          name: 'Express.js',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#18181B" />
              <text x="64" y="80" fill="#fff" fontSize="48" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                ex
              </text>
            </svg>
          ),
        },
        {
          name: 'Git',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="90" height="90" x="19" y="19" rx="16" transform="rotate(45 64 64)" fill="#F05032" />
              <circle cx="48" cy="64" r="7" fill="#fff" />
              <circle cx="78" cy="46" r="7" fill="#fff" />
              <circle cx="78" cy="82" r="7" fill="#fff" />
              <path d="M48 64h16c8 0 14-6 14-14V46M64 64v18" stroke="#fff" strokeWidth="6" fill="none" />
            </svg>
          ),
        },
        {
          name: 'GitHub',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#181717" />
              <path
                d="M64 24c-22.1 0-40 17.9-40 40 0 17.7 11.5 32.7 27.4 38 2 .4 2.7-.9 2.7-2v-7c-11.1 2.4-13.5-5.4-13.5-5.4-1.8-4.6-4.4-5.8-4.4-5.8-3.6-2.5.3-2.4.3-2.4 4 .3 6.1 4.1 6.1 4.1 3.6 6.1 9.4 4.3 11.7 3.3.4-2.6 1.4-4.3 2.5-5.3-8.9-1-18.2-4.4-18.2-19.8 0-4.4 1.6-7.9 4.1-10.7-.4-1-.18-5.1.4-10.6 0 0 3.4-1.1 11 4.1 3.2-.9 6.7-1.3 10.1-1.3 3.4 0 6.9.4 10.1 1.3 7.6-5.2 11-4.1 11-4.1 2.2 5.5 1 9.6.4 10.6 2.6 2.8 4.1 6.3 4.1 10.7 0 15.4-9.4 18.7-18.3 19.7 1.4 1.2 2.7 3.7 2.7 7.4v11c0 1.1.7 2.4 2.8 2C92.5 96.7 104 81.7 104 64c0-22.1-17.9-40-40-40z"
                fill="#fff"
              />
            </svg>
          ),
        },
        {
          name: 'Unreal Engine',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="60" fill="#0E1128" stroke="#31364A" strokeWidth="4" />
              <circle cx="64" cy="64" r="48" fill="#0E1128" />
              <text x="64" y="80" fill="#fff" fontSize="56" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                U
              </text>
            </svg>
          ),
        },
      ],
    },
    {
      id: 'design',
      title: 'DESIGN & 3D',
      items: [
        {
          name: 'Figma',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path d="M43 12h21v21H43a10.5 10.5 0 0 1 0-21z" fill="#F24E1E" />
              <path d="M64 12h21a10.5 10.5 0 0 1 0 21H64V12z" fill="#FF7262" />
              <path d="M64 33h21a10.5 10.5 0 0 1 0 21H64V33z" fill="#1ABCFE" />
              <circle cx="53.5" cy="43.5" r="10.5" fill="#A259FF" />
              <path d="M43 54h21v21H43a10.5 10.5 0 0 1 0-21z" fill="#0ACF83" />
            </svg>
          ),
        },
        {
          name: 'Photoshop',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="128" height="128" rx="24" fill="#001E36" />
              <text x="64" y="82" fill="#31A8FF" fontSize="52" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Ps
              </text>
            </svg>
          ),
        },
        {
          name: 'Affinity',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#1B1C20" />
              <text x="64" y="82" fill="#884DFF" fontSize="50" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Af
              </text>
            </svg>
          ),
        },
        {
          name: 'Photopea',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="128" height="128" rx="24" fill="#18A499" />
              <circle cx="64" cy="64" r="34" fill="#fff" />
              <circle cx="64" cy="64" r="22" fill="#18A499" />
              <path d="M64 42v44" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          name: 'Blender',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path
                d="M64 18c-22 0-38 16-38 38 0 15 8 27 20 33L28 106l16 4 14-16c2 .3 4 .5 6 .5 22 0 40-18 40-40 0-20-16-36-40-36z"
                fill="#EA7600"
              />
              <circle cx="64" cy="56" r="14" fill="#fff" />
              <circle cx="64" cy="56" r="8" fill="#265787" />
              <path d="M84 40l28-14-14 26" fill="#EA7600" />
            </svg>
          ),
        },
        {
          name: 'Substance Painter',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="128" height="128" rx="24" fill="#1B1C20" />
              <text x="64" y="82" fill="#E23048" fontSize="52" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Pt
              </text>
            </svg>
          ),
        },
      ],
    },
    {
      id: 'ai',
      title: 'AI & COMPUTER VISION',
      items: [
        {
          name: 'YOLOv8',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#111827" />
              <circle cx="64" cy="64" r="44" stroke="#F97316" strokeWidth="6" strokeDasharray="8 6" fill="none" />
              <circle cx="64" cy="64" r="14" fill="#F97316" />
              <path d="M64 16v16M64 96v16M16 64h16M96 64h16" stroke="#F97316" strokeWidth="6" />
            </svg>
          ),
        },
        {
          name: 'OpenAI / Gemini',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#10A37F" />
              <path
                d="M64 32v64M32 64h64M42 42l44 44M42 86l44-44"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
        {
          name: 'Sarvam AI',
          badge: '₹1.5 Lakh',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#0F172A" />
              <circle cx="64" cy="64" r="50" fill="url(#sarvam_grad)" />
              <path
                d="M44 48c0-6 5-10 12-10h16c7 0 12 4 12 10 0 5-3 8-8 10l12 24h-12l-10-20h-8v20H44V48zm12 16h8c3 0 6-2 6-5s-3-5-6-5h-8v10z"
                fill="#ffffff"
              />
              <defs>
                <linearGradient id="sarvam_grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F97316" />
                  <stop offset="1" stopColor="#EA580C" />
                </linearGradient>
              </defs>
            </svg>
          ),
        },
        {
          name: 'Google Vision',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#4285F4" />
              <circle cx="64" cy="64" r="26" fill="#fff" />
              <circle cx="64" cy="64" r="14" fill="#34A853" />
            </svg>
          ),
        },
        {
          name: 'n8n Automation',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#EA4B71" />
              <path
                d="M40 64h48M64 40v48"
                stroke="#fff"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="40" cy="64" r="8" fill="#fff" />
              <circle cx="88" cy="64" r="8" fill="#fff" />
            </svg>
          ),
        },
        {
          name: 'NLP & Agents',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#8B5CF6" />
              <circle cx="48" cy="48" r="8" fill="#fff" />
              <circle cx="80" cy="48" r="8" fill="#fff" />
              <path d="M44 80c6 8 14 12 20 12s14-4 20-12" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
            </svg>
          ),
        },
      ],
    },
    {
      id: 'databases_cloud',
      title: 'DATABASES & CLOUD DEVOPS',
      items: [
        {
          name: 'IACON',
          badge: '$30,000',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#0B132B" stroke="#3A86FF" strokeWidth="3" />
              <path
                d="M64 26L96 44V80L64 98L32 80V44Z"
                fill="#1C2541"
                stroke="#3A86FF"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M64 42v40M46 52l36 20M46 72l36-20"
                stroke="#60A5FA"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="64" cy="62" r="7" fill="#38BDF8" />
              <circle cx="64" cy="26" r="4" fill="#3A86FF" />
              <circle cx="96" cy="44" r="4" fill="#3A86FF" />
              <circle cx="96" cy="80" r="4" fill="#3A86FF" />
              <circle cx="64" cy="98" r="4" fill="#3A86FF" />
              <circle cx="32" cy="80" r="4" fill="#3A86FF" />
              <circle cx="32" cy="44" r="4" fill="#3A86FF" />
            </svg>
          ),
        },
        {
          name: 'Google Cloud',
          badge: '$2,000',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#ffffff" stroke="#E5E7EB" strokeWidth="2" />
              <path d="M72 40a20 20 0 0 0-19 13.5A16 16 0 0 0 36 68a16 16 0 0 0 16 16h40a18 18 0 0 0 18-18 18 18 0 0 0-15-17.7A20 20 0 0 0 72 40z" fill="#4285F4" />
              <path d="M52 84h40a18 18 0 0 0 18-18c0-.7 0-1.4-.1-2L76 76 52 84z" fill="#34A853" />
              <path d="M52 84a16 16 0 0 1-16-16c0-7.3 5-13.4 11.7-15.3l12.3 15.3L52 84z" fill="#EA4335" />
              <path d="M47.7 52.7A20 20 0 0 1 72 40a20 20 0 0 1 19 13.5L68 68 47.7 52.7z" fill="#FBBC05" />
            </svg>
          ),
        },
        {
          name: 'MongoDB',
          badge: '$500',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path
                d="M64 8c-3 12-22 36-22 62 0 25 15 44 22 50 7-6 22-25 22-50 0-26-19-50-22-62z"
                fill="#47A248"
              />
              <path d="M64 8v112" stroke="#fff" strokeWidth="4" />
            </svg>
          ),
        },
        {
          name: 'Firebase & Firestore',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path d="M26 94L42 22l18 34-34 38z" fill="#FFA000" />
              <path d="M82 46l-22 48 42-48-20-22-20 22z" fill="#F57C00" />
              <path d="M60 56l18-38 12 26-30 12z" fill="#FFCA28" />
              <path d="M26 94l38 24 38-24-42-48-34 48z" fill="#FF8F00" />
            </svg>
          ),
        },
        {
          name: 'Docker',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <path
                d="M118 64c-2-12-14-18-20-16-2-10-10-18-20-18-4 0-8 1-12 3V26H46v16H30v16H14v16c-8 3-10 12-10 18 0 18 16 28 36 28 28 0 54-12 68-36 6 0 10-3 10-10v-9z"
                fill="#2496ED"
              />
              <rect x="40" y="44" width="8" height="8" fill="#fff" />
              <rect x="52" y="44" width="8" height="8" fill="#fff" />
              <rect x="64" y="44" width="8" height="8" fill="#fff" />
              <rect x="52" y="32" width="8" height="8" fill="#fff" />
            </svg>
          ),
        },
        {
          name: 'Linux / Bash',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <rect width="128" height="128" rx="20" fill="#2D3748" />
              <path d="M32 44l24 20-24 20M64 84h32" stroke="#48BB78" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          ),
        },
        {
          name: 'Vercel',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#000" />
              <polygon points="64,28 104,98 24,98" fill="#fff" />
            </svg>
          ),
        },
        {
          name: 'WebSockets',
          icon: (
            <svg viewBox="0 0 128 128" className="size-7 sm:size-8">
              <circle cx="64" cy="64" r="64" fill="#0284C7" />
              <path d="M38 52l-14 12 14 12M90 52l14 12-14 12M52 82l24-36" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/60 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
      {/* Title with matching warm accent underline */}
      <div className="mb-10 inline-block">
        <h3 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          My Tech Stack
        </h3>
        <div className="mt-2.5 h-1 w-full rounded-full bg-accent" />
      </div>

      {/* Category Rows */}
      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-5">
            {/* Category Label */}
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-muted-foreground uppercase">
              {cat.title}
            </span>

            {/* Circular Logo Icons Grid */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  onClick={() => sound.playClick()}
                  className="group flex flex-col items-center gap-2.5 cursor-pointer select-none"
                >
                  {/* Round Elevated Disc */}
                  <div className="relative flex size-14 sm:size-16 items-center justify-center rounded-full bg-white dark:bg-[#1a1824] shadow-md dark:shadow-black/50 border border-zinc-200/80 dark:border-white/10 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-accent group-hover:ring-4 group-hover:ring-accent/20">
                    {'badge' in item && item.badge && (
                      <span className="absolute -top-2 -right-3 z-20 rounded-full bg-emerald-500 text-[10px] font-mono font-bold text-white px-1.5 py-0.5 shadow-md border border-emerald-300">
                        {item.badge}
                      </span>
                    )}
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                  </div>

                  {/* Label underneath */}
                  <span className="font-sans text-xs font-medium text-foreground/80 group-hover:text-accent transition-colors text-center whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

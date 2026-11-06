import { ImageResponse } from 'next/og';

export const alt = 'Ronak Talaviya — Founder & Full Stack AI Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#140e0b',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.25) 0%, transparent 55%)',
          padding: '64px 72px',
          color: '#f7eee4',
          fontFamily: 'sans-serif',
          border: '2px solid rgba(249, 115, 22, 0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(249, 115, 22, 0.14)',
            border: '1px solid rgba(249, 115, 22, 0.35)',
            borderRadius: '9999px',
            padding: '10px 22px',
            fontSize: '20px',
            fontWeight: 700,
            color: '#f97316',
            alignSelf: 'flex-start',
          }}
        >
          <span>● Founder @ Ornitech.in · Full Stack & AI Systems Architect</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '76px',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              display: 'flex',
              gap: '18px',
            }}
          >
            <span>Ronak</span>
            <span style={{ color: '#f97316' }}>Talaviya</span>
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#bdae9e',
              maxWidth: '960px',
              lineHeight: 1.4,
            }}
          >
            Building Techsodh.in, MyEntryPass.in, Shapentic.com & BolnaSeekho.in · Next.js, FastAPI, YOLOv8 & Autonomous AI Agents
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(247, 238, 228, 0.14)',
            paddingTop: '28px',
            fontSize: '20px',
            color: '#f7eee4',
          }}
        >
          <div style={{ display: 'flex', gap: '28px', fontWeight: 700 }}>
            <span style={{ color: '#f97316' }}>₹5.87L+ Grants & AI Credits</span>
            <span>·</span>
            <span>$32.5K+ Cloud Credits</span>
            <span>·</span>
            <span>20+ Verified Credentials</span>
          </div>
          <div style={{ color: '#bdae9e', fontWeight: 600 }}>ornitech.in</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

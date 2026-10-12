import type { Metadata } from 'next';
import GodAiSection from '@/components/GodAiSection';
import InteractiveDevStudio from '@/components/InteractiveDevStudio';

export const metadata: Metadata = {
  title: 'AI Systems & Architecture | Ronak Talaviya',
  description:
    'Autonomous AI agents, token economics benchmarks, self-healing tool calling reflexes, and LLM architecture by Ronak Talaviya.',
};

export default function AiPage() {
  return (
    <div className="py-8">
      <GodAiSection />
      <InteractiveDevStudio />
    </div>
  );
}

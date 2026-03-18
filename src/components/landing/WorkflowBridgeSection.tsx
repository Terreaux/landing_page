import { HeroWorkflow } from '@/components/HeroWorkflow';

export function WorkflowBridgeSection() {
  return (
    <section className="relative py-8 md:py-12">
      <div
        className="workflow-bridge relative z-10 reveal grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(22rem,0.9fr)] lg:items-center lg:gap-12"
        data-reveal
      >
        <div className="max-w-[34rem]">
          <p className="eyebrow mb-3">Systems Orchestration</p>
          <h2 className="max-w-[18ch] font-display text-[clamp(1.45rem,3vw,2.45rem)] leading-[1.04]">
            Inputs, decisions, and production outcomes aligned as one operating system.
          </h2>
          <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-[1.75] text-[#cbd7c4]">
            Terreaux connects fragmented data, tools, and teams into deployment-ready AI systems with clear operational
            flow.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <HeroWorkflow />
        </div>
      </div>
    </section>
  );
}

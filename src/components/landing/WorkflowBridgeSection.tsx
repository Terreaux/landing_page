import { HeroWorkflow } from '@/components/HeroWorkflow';

export function WorkflowBridgeSection() {
  return (
    <section className="relative py-8 md:py-12">
      <div
        className="blueprint-card relative z-10 reveal grid gap-8 bg-[linear-gradient(180deg,rgba(10,15,12,0.95),rgba(5,8,6,0.98))] p-6 md:p-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(22rem,0.9fr)] lg:items-center lg:gap-12"
        data-reveal
      >
        <span className="blueprint-card-frame" aria-hidden="true">
          <span className="blueprint-card-line blueprint-card-line-top" />
          <span className="blueprint-card-line blueprint-card-line-right" />
          <span className="blueprint-card-line blueprint-card-line-bottom" />
          <span className="blueprint-card-line blueprint-card-line-left" />
          <span className="blueprint-card-cross blueprint-card-cross-tl" />
          <span className="blueprint-card-cross blueprint-card-cross-tr" />
          <span className="blueprint-card-cross blueprint-card-cross-br" />
          <span className="blueprint-card-cross blueprint-card-cross-bl" />
        </span>
        <div className="max-w-[34rem]">
          <p className="eyebrow mb-3">SYSTEM INTEGRATION</p>
          <h2 className="max-w-[18ch] font-display text-[clamp(1.45rem,3vw,2.45rem)] leading-[1.04]">
          Integrated systems, not isolated components.
          </h2>
          <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-[1.75] text-[#cbd7c4]">
          Terreaux turns fragmented workflows into deployment-ready AI systems with clear interfaces, reliable execution, and operational accountability.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <HeroWorkflow />
        </div>
      </div>
    </section>
  );
}

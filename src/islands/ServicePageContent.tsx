import { ConstructionVisionSection } from '@/islands/landing/ConstructionVisionSection';
import { HeroChainOfThought } from '@/islands/landing/HeroChainOfThought';
import { Button } from '@/islands/ui/button';
import type { ServicePageData } from '@/data/services';
import type { ReactNode } from 'react';

interface ServicePageContentProps {
  rootPath?: string;
  service: ServicePageData;
}

const SECTIONS = [
  { id: 'use-cases', label: 'Use cases' },
  { id: 'delivery-model', label: 'Delivery model' },
  { id: 'system-components', label: 'System components' },
  { id: 'operating-requirements', label: 'Operating requirements' },
  { id: 'outcomes', label: 'Outcomes' }
] as const;

const B = 'rgba(209,228,176,0.12)';
const B_STRONG = 'rgba(209,228,176,0.2)';

function Eyebrow({
  children,
  accent = false
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className={`mb-5 font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
        accent ? 'text-[#98f2be]' : 'text-[#b6bfab]'
      }`}
    >
      {children}
    </p>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.96rem] font-semibold leading-[1.72] text-[#f7f9f2]">{children}</p>
  );
}

function SectionBlock({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 py-11"
      style={{ borderBottom: `1px solid ${B}` }}
    >
      <Eyebrow>{title}</Eyebrow>
      <div className="space-y-5 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">{children}</div>
    </section>
  );
}

function InfoCard({
  kicker,
  title,
  desc
}: {
  kicker?: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[1.7rem] border border-[#d1e4b026] bg-[linear-gradient(165deg,rgba(15,20,15,0.96),rgba(7,10,8,0.99))] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(152,242,190,0.15),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(209,228,176,0.08),transparent_42%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-[#98f2be] via-[#d1e4b0] to-transparent opacity-70" />
      <div className="relative flex h-full flex-col p-6 md:p-7">
        {kicker ? (
          <p className="mb-5 inline-flex w-fit rounded-full border border-[#98f2be33] bg-[#98f2be14] px-3 py-1 font-monoSans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#98f2be]">
            {kicker}
          </p>
        ) : null}
        <h3 className="text-[1.35rem] font-display leading-[1.15] text-[#f7f9f2]">{title}</h3>
        <p className="mt-4 text-[0.9rem] leading-[1.7] text-[#cad3bc]">{desc}</p>
      </div>
    </div>
  );
}

function DeliveryStepCard({
  step,
  title,
  desc
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[1.85rem] border border-[#d1e4b026] bg-[linear-gradient(160deg,rgba(12,17,13,0.97),rgba(6,9,7,0.99))] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(195,232,177,0.18),transparent_38%),linear-gradient(180deg,rgba(152,242,190,0.06),transparent_40%)] opacity-90" />
      <div className="relative flex h-full flex-col gap-8 p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div className="space-y-4">
            <p className="font-monoSans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#b6bfab]">
              Delivery phase
            </p>
            <h3 className="max-w-[18ch] font-display text-[1.35rem] leading-[1.15] text-[#f7f9f2]">
              {title}
            </h3>
          </div>
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[#98f2be55] bg-[#98f2be14] font-monoSans text-[0.78rem] font-semibold tracking-[0.16em] text-[#98f2be]">
            {step}
          </span>
        </div>
        <div className="mt-auto space-y-4">
          <div className="h-px w-full bg-gradient-to-r from-[#d1e4b0] via-[#d1e4b040] to-transparent" />
          <p className="text-[0.9rem] leading-[1.7] text-[#cad3bc]">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function ServicePageContent({
  rootPath = '/',
  service
}: ServicePageContentProps) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const homeHref = base === '/' ? '/' : `${base}/`;
  const contactHref = `${homeHref}contact/`;
  const scheduleHref = `${homeHref}schedule/`;
  const showAgenticRuntime = service.slug === 'agentic-systems';
  const showComputerVisionRuntime = service.slug === 'computer-vision';
  const showHeroRuntime = showAgenticRuntime || showComputerVisionRuntime;
  const heroContainerClass = showComputerVisionRuntime
    ? 'mx-auto grid w-[min(1280px,94vw)] gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(25rem,1.02fr)] lg:items-start'
    : showAgenticRuntime
      ? 'mx-auto grid w-[min(1320px,95vw)] gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.7fr)_minmax(25rem,1.06fr)] lg:items-center'
      : 'mx-auto w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] py-16 md:py-24';

  return (
    <div className="text-[#f7f9f2]">
      <div style={{ borderBottom: `1px solid ${B_STRONG}` }}>
        <div className={heroContainerClass}>
          <div className="min-w-0">
            <p className="mb-4 font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#b6bfab]">
              {service.title}
            </p>
            <h1 className="max-w-[20ch] font-display text-[clamp(1.9rem,3.8vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#f7f9f2]">
              {service.heroTitle}
            </h1>
            <p className="mt-5 max-w-[54ch] text-[1rem] leading-[1.75] text-[#e2ead7]">
              {service.copy}
            </p>
            <div className="mt-7 max-w-[58ch] space-y-4 text-[0.91rem] leading-[1.82] text-[#d0d9c3]">
              {service.heroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {showAgenticRuntime ? (
            <div className="w-full justify-self-end">
              <HeroChainOfThought />
            </div>
          ) : null}

          {showComputerVisionRuntime ? (
            <div className="w-full justify-self-end">
              <ConstructionVisionSection
                className="py-0 md:py-0"
                enableReveal={false}
                showBlob={false}
                showHeading={false}
                layout="stacked"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div
        style={{
          borderBottom: `1px solid ${B_STRONG}`,
          background: 'rgba(0,0,0,0.28)'
        }}
      >
        <div className="mx-auto w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] py-10">
          <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {service.highlights.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <p className="font-monoSans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#98f2be]">
                  {item.label}
                </p>
                <p className="text-[0.84rem] leading-[1.65] text-[#b6bfab]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] py-6">
        <div className="flex gap-14">
          <aside className="hidden xl:block xl:w-[160px] xl:flex-shrink-0">
            <div className="sticky top-28 pt-12">
              <p className="mb-4 font-monoSans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#6b7362]">
                On this page
              </p>
              <nav className="space-y-3">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block font-monoSans text-[0.72rem] leading-[1.4] text-[#6b7362] transition-colors duration-150 hover:text-[#b6bfab]"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="max-w-[70ch]">
              <SectionBlock id="use-cases" title="Example use cases">
                <Lead>{service.useCasesLead}</Lead>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {service.useCases.map((item) => (
                    <InfoCard
                      key={item.title}
                      kicker={item.kicker}
                      title={item.title}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock id="delivery-model" title="Delivery model">
                <Lead>{service.deliveryModelLead}</Lead>
                <div className="grid gap-5 md:grid-cols-3">
                  {service.deliverySteps.map((step) => (
                    <DeliveryStepCard
                      key={step.step}
                      step={step.step}
                      title={step.title}
                      desc={step.desc}
                    />
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock id="system-components" title="System components">
                <Lead>{service.systemComponentsLead}</Lead>
                <div className="grid gap-5 md:grid-cols-2">
                  {service.systemComponents.map((item) => (
                    <InfoCard key={item.title} title={item.title} desc={item.desc} />
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock id="operating-requirements" title="Operating requirements">
                <Lead>{service.operatingRequirementsLead}</Lead>
                {service.operatingRequirementsParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="grid gap-3 pl-5 text-[0.9rem] leading-[1.75] text-[#d0d9c3] marker:text-[#98f2be]">
                  {service.operatingRequirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </SectionBlock>

              <section id="outcomes" className="scroll-mt-28 py-11">
                <Eyebrow>Outcomes</Eyebrow>
                <div className="space-y-5 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">
                  <Lead>{service.outcomesLead}</Lead>
                  <div className="grid gap-5 md:grid-cols-3">
                    {service.outcomes.map((item) => (
                      <InfoCard key={item.title} title={item.title} desc={item.desc} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${B_STRONG}`, background: 'rgba(0,0,0,0.3)' }}>
        <div className="mx-auto w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] py-14">
          <div className="max-w-[62ch] xl:ml-[174px]">
            <Eyebrow accent>Next step</Eyebrow>
            <h2 className="mb-5 font-display text-[1.4rem] font-bold leading-[1.2] text-[#f7f9f2]">
              {service.ctaTitle}
            </h2>
            <p className="mb-8 text-[0.91rem] leading-[1.8] text-[#d0d9c3]">
              {service.ctaCopy}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href={contactHref}>Start a Project</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={scheduleHref}>Schedule a Call</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${B}` }}>
        <div className="mx-auto w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] py-6">
          <p className="max-w-[62ch] text-[0.78rem] leading-[1.65] text-[#6b7362] xl:ml-[174px]">
            Engagements can include scoping, architecture, implementation, evaluation,
            operationalization, and handoff depending on where the program is today.
          </p>
          <div className="mt-5 xl:ml-[174px]">
            <a
              href={homeHref}
              className="inline-flex items-center justify-center rounded-full border border-[#c3e8b1] px-5 py-3 font-display text-sm tracking-[0.08em] text-[#f7f9f2] no-underline transition-colors hover:bg-[#c3e8b1] hover:text-[#0b100a]"
            >
              Back Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

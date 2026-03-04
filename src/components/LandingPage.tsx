import { type CSSProperties, useEffect } from 'react';

import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const serviceCards = [
  {
    title: 'Applied AI Systems',
    copy: 'Design and implementation of AI products mapped to business constraints and operational realities.'
  },
  {
    title: 'Agenic Systems',
    copy: 'Design and deployment of autonomous AI workflows that coordinate tools, data, and decisions in production.'
  },
  {
    title: 'MLOps',
    copy: 'Reliable pipelines for model training, deployment, monitoring, governance, and continuous iteration.'
  },
  {
    title: 'LLMOps',
    copy: 'Production LLM systems with evaluation loops, safety controls, prompt/version management, and observability.'
  }
];

const timelineItems = [
  {
    step: '01',
    title: 'Frame the opportunity',
    copy: 'We align outcomes, constraints, and success metrics before implementation starts.'
  },
  {
    step: '02',
    title: 'Build in production shape',
    copy: 'Data, modeling, infrastructure, and product interfaces are implemented as one coherent system.'
  },
  {
    step: '03',
    title: 'Stabilize and transfer',
    copy: 'We establish runbooks, metrics, and ownership workflows so your team can scale confidently.'
  }
];

const manifoldLayers = [
  { x: '-8%', y: '7%', width: '120%', height: '20rem', speed: 0.03, rotate: '-4deg', opacity: 0.26 },
  { x: '-3%', y: '19%', width: '114%', height: '16rem', speed: -0.04, rotate: '3deg', opacity: 0.2 },
  { x: '-10%', y: '34%', width: '126%', height: '18rem', speed: 0.05, rotate: '-2deg', opacity: 0.23 },
  { x: '-2%', y: '48%', width: '112%', height: '15rem', speed: -0.03, rotate: '2deg', opacity: 0.19 },
  { x: '-8%', y: '62%', width: '118%', height: '18rem', speed: 0.04, rotate: '-3deg', opacity: 0.22 },
  { x: '-4%', y: '77%', width: '116%', height: '17rem', speed: -0.05, rotate: '3deg', opacity: 0.2 }
];

const blueprintMeshes = [
  { x: '62%', y: '6%', width: '24rem', height: '15rem', speed: -0.03, rotate: '-9deg', opacity: 0.3, delay: '-2.2s', variant: 'arch' },
  { x: '10%', y: '30%', width: '23rem', height: '14rem', speed: 0.04, rotate: '8deg', opacity: 0.26, delay: '-4.4s', variant: 'slab' },
  { x: '58%', y: '57%', width: '26rem', height: '16rem', speed: -0.05, rotate: '-7deg', opacity: 0.28, delay: '-1.6s', variant: 'vault' },
  { x: '6%', y: '74%', width: '25rem', height: '15rem', speed: 0.03, rotate: '9deg', opacity: 0.24, delay: '-3.7s', variant: 'frame' }
];

const meshLines = Array.from({ length: 10 }, (_, index) => ({
  key: `lower-${index}`,
  d: 'M-120 620C150 410 340 740 568 596C772 468 980 704 1218 586C1452 466 1650 618 1960 554',
  offset: `${index * 18 - 48}px`,
  stroke: index % 5 === 0 ? '0.95' : '0.78',
  opacity: `${0.12 + (index % 3) * 0.03}`,
  phase: `${10 + (index % 6) * 3}px`,
  duration: `${24 + (index % 5) * 3}s`,
  delay: `${index * -0.7}s`
})).concat(
  Array.from({ length: 6 }, (_, index) => ({
    key: `upper-${index}`,
    d: 'M-100 418C148 232 350 526 574 422C790 322 996 520 1212 418C1434 320 1628 484 1944 428',
    offset: `${index * 16 - 34}px`,
    stroke: index % 4 === 0 ? '0.85' : '0.72',
    opacity: `${0.1 + (index % 2) * 0.03}`,
    phase: `${8 + (index % 5) * 2.5}px`,
    duration: `${20 + (index % 4) * 2.6}s`,
    delay: `${index * -0.9}s`
  }))
);

const blueprintPathsByVariant: Record<string, Array<{ className: string; d: string }>> = {
  arch: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M52 272L344 228L466 292L178 328Z' },
    { className: 'blueprint-stroke', d: 'M52 272L178 328M344 228L466 292M52 272L176 206L466 166L344 228Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M88 267L214 323M124 262L250 318M160 257L286 313M196 252L322 308M232 247L358 303M268 242L394 298M304 237L430 293' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M78 279L370 236M104 290L396 247M130 301L422 258M156 312L448 269' },
    { className: 'blueprint-stroke', d: 'M258 236A90 90 0 0 1 392 150A90 90 0 0 1 458 258' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M272 230A72 72 0 0 1 378 166A72 72 0 0 1 442 252' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M288 224A54 54 0 0 1 362 182A54 54 0 0 1 426 246' }
  ],
  slab: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M70 264L330 218L452 282L196 322Z' },
    { className: 'blueprint-stroke', d: 'M70 264L196 322M330 218L452 282M70 264L198 192L452 154L330 218Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M102 259L226 317M134 254L258 312M166 249L290 307M198 244L322 302M230 239L354 297M262 234L386 292' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M92 275L352 229M118 286L378 240M144 297L404 251M170 308L430 262' },
    { className: 'blueprint-stroke', d: 'M132 196L132 112L388 74L388 158M170 191L170 107L426 69L426 153' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M132 112L388 74M170 107L426 69' }
  ],
  vault: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M58 274L340 232L468 292L182 330Z' },
    { className: 'blueprint-stroke', d: 'M58 274L182 330M340 232L468 292M58 274L182 202L468 160L340 232Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M92 269L216 325M126 264L250 320M160 259L284 315M194 254L318 310M228 249L352 305M262 244L386 300M296 239L420 295' },
    { className: 'blueprint-stroke', d: 'M210 232A110 82 0 0 1 412 186A110 82 0 0 1 454 276' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M230 228A88 66 0 0 1 394 192A88 66 0 0 1 436 270' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M250 224A66 50 0 0 1 376 198A66 50 0 0 1 418 264' },
    { className: 'blueprint-stroke', d: 'M308 236L308 96M332 233L332 92M356 230L356 88' }
  ],
  frame: [
    { className: 'blueprint-stroke blueprint-grid', d: 'M72 278L332 228L450 290L190 334Z' },
    { className: 'blueprint-stroke', d: 'M72 278L190 334M332 228L450 290M72 278L194 206L450 166L332 228Z' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M102 272L220 328M132 266L250 322M162 260L280 316M192 254L310 310M222 248L340 304M252 242L370 298' },
    { className: 'blueprint-stroke', d: 'M138 202L138 120L396 80L396 164M186 194L186 112L444 72L444 156' },
    { className: 'blueprint-stroke blueprint-thin', d: 'M138 120L396 80M186 112L444 72M138 202L396 164M186 194L444 156' },
    { className: 'blueprint-stroke', d: 'M286 232L286 96L312 92L312 228M312 228L370 220M286 232L344 224' }
  ]
};

export function LandingPage() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px'
      }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 90, 540)}ms`;
      observer.observe(item);
    });

    let rafId = 0;
    let guideSyncRafId = 0;
    let guideSyncUntil = 0;
    let guidesVisible = false;

    const syncBlueprintGuides = () => {
      const guideLayer = document.querySelector<HTMLElement>('.page-blueprint-guides');
      const leftCross = document.querySelector<HTMLElement>('.blueprint-cross-left');
      const rightCross = document.querySelector<HTMLElement>('.blueprint-cross-right');
      if (!guideLayer || !leftCross || !rightCross) return;

      const layerRect = guideLayer.getBoundingClientRect();
      const leftRect = leftCross.getBoundingClientRect();
      const rightRect = rightCross.getBoundingClientRect();

      document.documentElement.style.setProperty('--blueprint-guide-left-x', `${leftRect.left + leftRect.width / 2 - layerRect.left}px`);
      document.documentElement.style.setProperty('--blueprint-guide-right-x', `${rightRect.left + rightRect.width / 2 - layerRect.left}px`);
      if (!guidesVisible) {
        document.documentElement.style.setProperty('--blueprint-guides-opacity', '1');
        guidesVisible = true;
      }
    };

    const syncGuidesAfterLayout = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(syncBlueprintGuides);
      });
    };

    const runGuideSyncWindow = (durationMs = 1400) => {
      guideSyncUntil = Math.max(guideSyncUntil, performance.now() + durationMs);
      if (guideSyncRafId !== 0) return;

      const tick = (now: number) => {
        syncBlueprintGuides();
        if (now < guideSyncUntil) {
          guideSyncRafId = window.requestAnimationFrame(tick);
          return;
        }
        guideSyncRafId = 0;
      };

      guideSyncRafId = window.requestAnimationFrame(tick);
    };

    const updateParallax = () => {
      document.documentElement.style.setProperty('--parallax-scroll', `${window.scrollY}px`);
      syncBlueprintGuides();
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    syncGuidesAfterLayout();
    runGuideSyncWindow();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('load', syncGuidesAfterLayout);
    document.fonts?.ready.then(() => {
      syncGuidesAfterLayout();
      runGuideSyncWindow(900);
    });

    const headerEl = document.querySelector<HTMLElement>('header[data-reveal]');
    const handleHeaderTransitionStart = () => runGuideSyncWindow(1200);
    const handleHeaderTransitionEnd = () => syncGuidesAfterLayout();
    headerEl?.addEventListener('transitionstart', handleHeaderTransitionStart);
    headerEl?.addEventListener('transitionend', handleHeaderTransitionEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('load', syncGuidesAfterLayout);
      headerEl?.removeEventListener('transitionstart', handleHeaderTransitionStart);
      headerEl?.removeEventListener('transitionend', handleHeaderTransitionEnd);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      if (guideSyncRafId !== 0) {
        window.cancelAnimationFrame(guideSyncRafId);
      }
      document.documentElement.style.removeProperty('--blueprint-guide-left-x');
      document.documentElement.style.removeProperty('--blueprint-guide-right-x');
      document.documentElement.style.removeProperty('--blueprint-guides-opacity');
    };
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true" />

      <header className="reveal sticky top-0 z-20 flex items-center justify-between gap-5 border-b border-[#d1e4b01c] bg-black/60 px-[5vw] py-5 backdrop-blur-md" data-reveal>
        <span className="blueprint-cross blueprint-cross-left" aria-hidden="true" />
        <span className="blueprint-cross blueprint-cross-right" aria-hidden="true" />
        <div className="font-display text-base font-extrabold tracking-[0.09em]">TERREAUX</div>
        <nav className="hidden font-monoSans text-[0.79rem] uppercase tracking-[0.14em] text-[#b6bfab] md:flex md:gap-7 lg:gap-10 xl:gap-12">
          <a href="#services" className="transition-colors hover:text-[#f7f9f2]">
            Services
          </a>
          <a href="#approach" className="transition-colors hover:text-[#f7f9f2]">
            Approach
          </a>
          <a href="#contact" className="transition-colors hover:text-[#f7f9f2]">
            Contact
          </a>
        </nav>
        <Button asChild variant="outline" size="sm">
          <a href="#contact">Start a Project</a>
        </Button>
      </header>

      <main className="relative mx-auto w-[min(1200px,92vw)] pb-24 md:pb-32 font-monoSans text-[#f7f9f2]">
        <div className="page-blueprint-guides" aria-hidden="true">
          <span className="blueprint-guide blueprint-guide-left" />
          <span className="blueprint-guide blueprint-guide-right" />
        </div>
        <div className="parallax-field" aria-hidden="true">
          {manifoldLayers.map((layer, index) => (
            <span
              key={`manifold-${index}`}
              className="parallax-manifold"
              style={
                {
                  '--x': layer.x,
                  '--y': layer.y,
                  '--width': layer.width,
                  '--height': layer.height,
                  '--speed': `${layer.speed}`,
                  '--rotate': layer.rotate,
                  '--opacity': `${layer.opacity}`
                } as CSSProperties
              }
            />
          ))}
          {blueprintMeshes.map((mesh, index) => (
            <span
              key={`blueprint-mesh-${index}`}
              className="blueprint-mesh"
              style={
                {
                  '--x': mesh.x,
                  '--y': mesh.y,
                  '--width': mesh.width,
                  '--height': mesh.height,
                  '--speed': `${mesh.speed}`,
                  '--rotate': mesh.rotate,
                  '--opacity': `${mesh.opacity}`,
                  '--delay': mesh.delay
                } as CSSProperties
              }
            >
              <svg viewBox="0 0 520 340" preserveAspectRatio="none" aria-hidden="true">
                {(blueprintPathsByVariant[mesh.variant] ?? blueprintPathsByVariant.arch).map((shape, shapeIndex) => (
                  <path key={`shape-${shapeIndex}`} className={shape.className} d={shape.d} />
                ))}
              </svg>
            </span>
          ))}
        </div>

        <div className="relative z-10">
          <section className="relative left-1/2 min-h-[88vh] w-screen -translate-x-1/2 py-20">
            <div className="soil-field" aria-hidden="true">
              <svg className="contour-mesh" viewBox="0 0 1800 980" preserveAspectRatio="xMidYMid slice">
                {meshLines.map((line) => (
                  <path
                    key={line.key}
                    className="mesh-path"
                    d={line.d}
                    style={
                      {
                        '--offset': line.offset,
                        '--stroke': line.stroke,
                        '--opacity': line.opacity,
                        '--phase': line.phase,
                        '--duration': line.duration,
                        '--delay': line.delay
                      } as CSSProperties
                    }
                  />
                ))}
              </svg>
            </div>
            <span className="section-blob" style={{ '--x': '26%', '--y': '26%', '--size': '30rem', '--hue': '154', '--alpha': '0.26', '--drift-x': '122px', '--drift-y': '-58px', '--duration': '11.2s', '--delay': '-2.4s' } as CSSProperties} aria-hidden="true" />
            <span className="section-blob" style={{ '--x': '84%', '--y': '70%', '--size': '34rem', '--hue': '168', '--alpha': '0.24', '--drift-x': '-110px', '--drift-y': '62px', '--duration': '12.1s', '--delay': '-5.1s' } as CSSProperties} aria-hidden="true" />
            <div className="relative z-10 mx-auto flex min-h-[calc(88vh-10rem)] w-[min(1200px,92vw)] flex-col justify-between gap-10">
              <div className="w-full max-w-[860px] pt-[8vh] md:pt-[12vh]">
                <p className="eyebrow hero-eyebrow reveal" data-reveal>
                  Consulting + Contracting Studio
                </p>
                <h1 className="reveal font-display text-[clamp(1.8rem,4.8vw,4.6rem)] font-extrabold leading-[1.05] tracking-[0.09em]" data-reveal>
                  Applied Intelligence, <span className="gradient-text">Built for Real-World</span> Delivery.
                </h1>
              </div>

              <div className="ml-auto w-full max-w-[64ch] pb-[max(1.25rem,env(safe-area-inset-bottom))] text-right md:pb-8">
                <p className="reveal ml-auto text-[clamp(1rem,1.5vw,1.24rem)] text-[#d4dec7]" data-reveal>
                  Terreaux builds applied AI platforms, agenic systems, and production-grade MLOps/LLMOps architectures for teams that need outcomes, not prototypes.
                </p>
                <div className="reveal mt-8 flex flex-wrap justify-end gap-3" data-reveal>
                  <Button asChild>
                    <a href="#contact">Book Discovery Call</a>
                  </Button>
                  <Button asChild variant="ghost">
                    <a href="#services">See Capabilities</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

        <section id="services" className="relative scroll-mt-28 py-24 md:py-32">
          <span className="section-blob" style={{ '--x': '80%', '--y': '22%', '--size': '32rem', '--hue': '150', '--alpha': '0.24', '--drift-x': '-132px', '--drift-y': '-48px', '--duration': '11.7s', '--delay': '-4.2s' } as CSSProperties} aria-hidden="true" />
          <div className="relative z-10 reveal mb-12 md:mb-14" data-reveal>
            <p className="eyebrow">Core Expertise</p>
            <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
              End-to-end delivery from strategy to stable production.
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {serviceCards.map((card) => (
              <Card key={card.title} className="reveal" data-reveal>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>{card.copy}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="approach" className="relative scroll-mt-28 py-24 md:py-32">
          <span className="section-blob" style={{ '--x': '14%', '--y': '26%', '--size': '30rem', '--hue': '160', '--alpha': '0.25', '--drift-x': '116px', '--drift-y': '-64px', '--duration': '11s', '--delay': '-3.3s' } as CSSProperties} aria-hidden="true" />
          <span className="section-blob" style={{ '--x': '82%', '--y': '82%', '--size': '34rem', '--hue': '146', '--alpha': '0.22', '--drift-x': '-104px', '--drift-y': '58px', '--duration': '12.4s', '--delay': '-6.2s' } as CSSProperties} aria-hidden="true" />
          <div className="relative z-10 reveal mb-12 md:mb-14" data-reveal>
            <p className="eyebrow">How We Work</p>
            <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
              Lean teams, fast cycles, and clear accountability.
            </h2>
          </div>

          <div className="relative z-10 grid gap-5 md:gap-6">
            {timelineItems.map((item) => (
              <div key={item.step} className="reveal rounded-[18px] border border-[#adc9915a] bg-[#0b0e0ad9] px-5 py-4" data-reveal>
                <span className="font-display text-sm tracking-[0.15em] text-[#c3e8b1]">{item.step}</span>
                <h3 className="mt-1 font-display text-[clamp(1.2rem,2vw,1.6rem)]">{item.title}</h3>
                <p className="mt-2 text-[#c6d0b9]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="relative scroll-mt-28 pt-24 pb-28 md:pt-32 md:pb-36">
          <span className="section-blob" style={{ '--x': '22%', '--y': '20%', '--size': '30rem', '--hue': '172', '--alpha': '0.22', '--drift-x': '90px', '--drift-y': '-54px', '--duration': '10.2s', '--delay': '-2.1s' } as CSSProperties} aria-hidden="true" />
          <div
            className="relative z-10 reveal grid gap-8 rounded-3xl border border-[#bcd69f59] bg-[linear-gradient(175deg,rgba(16,21,14,0.95),rgba(8,10,7,0.99))] p-[clamp(1.2rem,3vw,2.2rem)] md:grid-cols-[1.05fr_1fr] md:gap-10"
            data-reveal
          >
            <div>
              <p className="eyebrow">Let&apos;s Build</p>
              <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] leading-[1.05]">
                Need an AI partner that can execute in production?
              </h2>
              <p className="mt-3 max-w-[56ch] text-[#d0d9c3]">
                Share your objective, timeline, and constraints. We&apos;ll reply with a practical roadmap.
              </p>
              <div className="mt-6">
                <a className="text-sm text-[#c4ceba] underline-offset-4 hover:underline" href="/contact">
                  Dedicated campaign page: /contact
                </a>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
          <div className="last-section-tail" aria-hidden="true">
            <span className="last-section-cross last-section-cross-left" />
            <span className="last-section-cross last-section-cross-right" />
          </div>
        </section>
        </div>
      </main>
    </>
  );
}

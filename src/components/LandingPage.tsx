import { useEffect } from 'react';

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
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 90, 540)}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true" />

      <header className="reveal sticky top-0 z-20 flex items-center justify-between gap-5 border-b border-[#d1e4b01c] bg-black/60 px-[5vw] py-5 backdrop-blur-md" data-reveal>
        <div className="font-display text-base font-extrabold tracking-[0.09em]">TERREAUX</div>
        <nav className="hidden gap-5 text-sm text-[#b6bfab] md:flex">
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

      <main className="mx-auto w-[min(1200px,92vw)] pb-16 font-body text-[#f7f9f2]">
        <section className="relative left-1/2 grid min-h-[88vh] w-screen -translate-x-1/2 items-center py-20">
          <div className="soil-field" aria-hidden="true">
            <span className="mesh-glow" />
            <span className="contour-mesh" />
          </div>

          <div className="relative z-10 mx-auto w-[min(1200px,92vw)]">
            <div className="w-full max-w-[860px]">
            <p className="eyebrow reveal" data-reveal>
              Consulting + Contracting Studio
            </p>
            <h1 className="reveal font-display text-[clamp(2.6rem,7vw,7.1rem)] leading-[1.05] tracking-[-0.022em]" data-reveal>
              Applied Intelligence, <span className="gradient-text">Engineered for Real-World</span> Delivery.
            </h1>
            <p className="reveal mt-6 max-w-[64ch] text-[clamp(1rem,1.5vw,1.24rem)] text-[#d4dec7]" data-reveal>
              Terreaux builds applied AI platforms, agenic systems, and production-grade MLOps/LLMOps architectures for teams that need outcomes, not prototypes.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" data-reveal>
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

        <section id="services" className="py-16">
          <div className="reveal mb-8" data-reveal>
            <p className="eyebrow">Core Expertise</p>
            <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
              End-to-end delivery from strategy to stable production.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

        <section id="approach" className="py-16">
          <div className="reveal mb-8" data-reveal>
            <p className="eyebrow">How We Work</p>
            <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
              Lean teams, fast cycles, and clear accountability.
            </h2>
          </div>

          <div className="grid gap-4">
            {timelineItems.map((item) => (
              <div key={item.step} className="reveal rounded-[18px] border border-[#adc9915a] bg-[#0b0e0ad9] px-5 py-4" data-reveal>
                <span className="font-display text-sm tracking-[0.15em] text-[#c3e8b1]">{item.step}</span>
                <h3 className="mt-1 font-display text-[clamp(1.2rem,2vw,1.6rem)]">{item.title}</h3>
                <p className="mt-2 text-[#c6d0b9]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="reveal rounded-3xl border border-[#bcd69f59] bg-[linear-gradient(175deg,rgba(16,21,14,0.95),rgba(8,10,7,0.99))] p-[clamp(1.2rem,3vw,2.2rem)]" data-reveal>
            <p className="eyebrow">Let&apos;s Build</p>
            <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] leading-[1.05]">
              Need an AI partner that can execute in production?
            </h2>
            <p className="mt-3 max-w-[62ch] text-[#d0d9c3]">
              Share your objective, timeline, and constraints. We&apos;ll respond with a practical roadmap.
            </p>
            <div className="mt-6">
              <Button asChild>
                <a href="mailto:hello@terreaux.ai">hello@terreaux.ai</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

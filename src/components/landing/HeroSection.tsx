import { type CSSProperties } from 'react';

import { Button } from '@/components/ui/button';
import { meshLines } from '@/data/landing';

export function HeroSection() {
  return (
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
      <span
        className="section-blob"
        style={
          {
            '--x': '24%',
            '--y': '27%',
            '--size': '25rem',
            '--hue': '154',
            '--alpha': '0.22',
            '--drift-x': '68px',
            '--drift-y': '-28px',
            '--duration': '18s',
            '--delay': '-2.4s'
          } as CSSProperties
        }
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex min-h-[calc(88vh-10rem)] w-[min(1200px,92vw)] py-[max(2rem,6vh)]">
        <div className="max-w-[44rem] self-start pt-[8vh] md:pt-[12vh] lg:pt-[8vh]">
          <p className="eyebrow hero-eyebrow reveal" data-reveal>
            Consulting + Contracting Studio
          </p>
          <h1
            className="reveal hero-headline font-display text-[clamp(2rem,4.35vw,4.65rem)] font-extrabold leading-[0.98] tracking-[0.05em]"
            data-reveal
          >
            Applied Intelligence,
            <br />
            Built for <span className="gradient-text">Real-World Delivery.</span>
          </h1>
          <p className="reveal mt-6 max-w-[34rem] text-[0.98rem] leading-[1.82] text-[#d4dec8]" data-reveal>
            Terreaux designs AI systems that move real work across operations: agentic workflows, computer vision
            programs, and the production infrastructure that keeps them reliable once teams depend on them.
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
  );
}

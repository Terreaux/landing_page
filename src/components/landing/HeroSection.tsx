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
      <div className="relative z-10 mx-auto grid min-h-[calc(88vh-10rem)] w-[min(1200px,92vw)] gap-12 py-[max(2rem,6vh)] lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.82fr)] lg:items-center lg:gap-14">
        <div className="max-w-[42rem] self-start pt-[8vh] md:pt-[12vh] lg:pt-[8vh]">
          <p className="eyebrow hero-eyebrow reveal" data-reveal>
            Consulting + Contracting Studio
          </p>
          <h1
            className="reveal hero-headline font-display text-[clamp(1.75rem,3.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[0.06em]"
            data-reveal
          >
            APPLIED INTELLIGENCE, <br />
            BUILT FOR<span className="gradient-text"> REAL-WORLD DELIVERY.</span>
          </h1>
        </div>

        <div className="hero-proof-column w-full pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:pb-8">
          <p
            className="reveal max-w-[34rem] text-balance text-[clamp(1rem,1.35vw,1.14rem)] leading-[1.7] text-[#d4dec7]"
            data-reveal
          >
            Terreaux builds applied AI systems, agentic systems, computer vision solutions, and production-grade AI
            platform ops for teams that need outcomes, not prototypes.
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

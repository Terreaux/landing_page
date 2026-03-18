import { type CSSProperties } from 'react';

import { Card } from '@/components/ui/card';
import { timelineItems } from '@/data/landing';

export function ApproachSection() {
  return (
    <section id="approach" className="relative scroll-mt-28 py-24 md:py-32">
      <span
        className="section-blob"
        style={
          {
            '--x': '14%',
            '--y': '26%',
            '--size': '30rem',
            '--hue': '160',
            '--alpha': '0.25',
            '--drift-x': '116px',
            '--drift-y': '-64px',
            '--duration': '11s',
            '--delay': '-3.3s'
          } as CSSProperties
        }
        aria-hidden="true"
      />
      <span
        className="section-blob"
        style={
          {
            '--x': '82%',
            '--y': '82%',
            '--size': '34rem',
            '--hue': '146',
            '--alpha': '0.22',
            '--drift-x': '-104px',
            '--drift-y': '58px',
            '--duration': '12.4s',
            '--delay': '-6.2s'
          } as CSSProperties
        }
        aria-hidden="true"
      />
      <div className="relative z-10 reveal mb-16 md:mb-20" data-reveal>
        <p className="eyebrow">How We Work</p>
        <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
          Lean teams, fast cycles, and clear accountability.
        </h2>
      </div>

      <div className="relative z-10 grid gap-7 md:gap-9">
        {timelineItems.map((item) => (
          <Card key={item.step} className="reveal px-6 py-6 md:px-7 md:py-7" data-reveal>
            <span className="font-display text-sm tracking-[0.15em] text-[#c3e8b1]">{item.step}</span>
            <h3 className="mt-2 font-display text-[clamp(1.2rem,2vw,1.6rem)]">{item.title}</h3>
            <p className="mt-3 text-[#c6d0b9]">{item.copy}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

import { type CSSProperties } from 'react';

import { ContactForm } from '@/components/ContactForm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRootPath } from '@/lib/utils';

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-28 pt-24 pb-28 md:pt-32 md:pb-36">
      <span
        className="section-blob"
        style={
          {
            '--x': '22%',
            '--y': '20%',
            '--size': '30rem',
            '--hue': '172',
            '--alpha': '0.22',
            '--drift-x': '90px',
            '--drift-y': '-54px',
            '--duration': '10.2s',
            '--delay': '-2.1s'
          } as CSSProperties
        }
        aria-hidden="true"
      />
      <Card
        className="relative z-10 reveal grid gap-8 p-[clamp(1.2rem,3vw,2.2rem)] md:grid-cols-[1.05fr_1fr] md:gap-10"
        data-reveal
      >
        <div className="flex flex-col gap-4">
          <p className="eyebrow">Let&apos;s Build</p>
          <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] leading-[1.05]">
          Tell us what you need to ship.
          </h2>
          <p className="mt-3 max-w-[56ch] text-[#d0d9c3]">
          Share your objective, constraints, and timeline. We’ll follow up with a practical plan for scope, approach, and delivery. 
          </p>
          <Button asChild variant="outline" size="sm" className="w-fit">
            <a href={`${getRootPath()}schedule/`}>Schedule a time</a>
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <ContactForm />
        </div>
      </Card>
      <div className="last-section-tail" aria-hidden="true">
        <span className="last-section-cross last-section-cross-left" />
        <span className="last-section-cross last-section-cross-right" />
      </div>
    </section>
  );
}

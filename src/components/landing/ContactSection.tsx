import { type CSSProperties } from 'react';

import { ContactForm } from '@/components/ContactForm';
import { Card } from '@/components/ui/card';

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
        <div>
          <p className="eyebrow">Let&apos;s Build</p>
          <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] leading-[1.05]">
            Need an AI partner that can execute in production?
          </h2>
          <p className="mt-3 max-w-[56ch] text-[#d0d9c3]">
            Share your objective, timeline, and constraints. We&apos;ll reply with a practical roadmap.
          </p>
        </div>
        <div>
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
